import express from "express";
import { createServer as createViteServer } from "vite";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Ensure upload directory exists
  const uploadDir = path.join(__dirname, "public", "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Middleware
  app.use(cors());
  app.use(express.json());
  
  // Request logging
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // Configure Multer
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

  const upload = multer({ 
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
      const allowedTypes = /jpeg|jpg|png|gif|webp/;
      const ext = path.extname(file.originalname).toLowerCase();
      const isAllowed = allowedTypes.test(ext) || allowedTypes.test(file.mimetype);
      if (isAllowed) {
        return cb(null, true);
      }
      cb(new Error("Only images are allowed (jpeg, jpg, png, gif, webp)"));
    }
  });

  // Serve uploads directory statically
  app.use("/uploads", express.static(uploadDir));

  // API Router
  const apiRouter = express.Router();

  // Explicitly log all API requests
  apiRouter.use((req, res, next) => {
    console.log(`[API REQUEST] ${req.method} ${req.url}`);
    next();
  });

  apiRouter.get("/ping", (req, res) => {
    res.json({ pong: true, timestamp: new Date().toISOString() });
  });

  apiRouter.get("/health", (req, res) => {
    res.json({ 
      status: "ok", 
      time: new Date().toISOString(), 
      env: process.env.NODE_ENV,
      cwd: process.cwd(),
      distExists: fs.existsSync(path.join(__dirname, "dist"))
    });
  });

  apiRouter.post("/upload", (req, res) => {
    console.log("Processing upload request...");
    upload.single("image")(req, res, (err) => {
      if (err) {
        console.error("Multer/Upload Error:", err);
        return res.status(400).json({ 
          error: err.message || "Upload failed",
          details: err instanceof multer.MulterError ? "Multer specific error" : "General error"
        });
      }
      
      if (!req.file) {
        console.error("No file received in request");
        return res.status(400).json({ error: "No file uploaded" });
      }
      
      console.log("Upload successful:", req.file.filename);
      res.json({ 
        success: true,
        url: `/uploads/${req.file.filename}`,
        filename: req.file.filename
      });
    });
  });

  app.use("/api", apiRouter);

  // Fallback for missing API routes to prevent HTML response
  app.use("/api/*", (req, res) => {
    res.status(404).json({ error: `API endpoint not found: ${req.method} ${req.originalUrl}` });
  });

  // Vite / Static Serving
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in DEVELOPMENT mode with Vite middleware");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting in PRODUCTION mode");
    const distPath = path.join(__dirname, "dist");
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    } else {
      console.warn("Dist directory not found! Falling back to root serving.");
      app.use(express.static(__dirname));
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "index.html"));
      });
    }
  }

  // Global Error Handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Global Server Error:", err);
    if (req.path.startsWith('/api/')) {
      return res.status(500).json({ 
        error: "Internal Server Error", 
        message: err.message 
      });
    }
    res.status(500).send("Internal Server Error");
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`>>> Server running on http://0.0.0.0:${PORT}`);
    console.log(`>>> Uploads directory: ${uploadDir}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});

