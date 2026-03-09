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

  // 1. Basic Middleware (No body-parsers yet to avoid interfering with Multer)
  app.use(cors());
  
  // Request logging at the very top
  app.use((req, res, next) => {
    console.log(`[SERVER] ${req.method} ${req.url}`);
    next();
  });

  // 2. API Routes (Mounted BEFORE everything else)
  const apiRouter = express.Router();

  apiRouter.get("/ping", (req, res) => {
    res.json({ pong: true, timestamp: new Date().toISOString() });
  });

  apiRouter.get("/health", (req, res) => {
    res.json({ 
      status: "ok", 
      time: new Date().toISOString(), 
      env: process.env.NODE_ENV,
      cwd: process.cwd(),
      nodeVersion: process.version
    });
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
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const allowedTypes = /jpeg|jpg|png|gif|webp/;
      const ext = path.extname(file.originalname).toLowerCase();
      const isAllowed = allowedTypes.test(ext) || allowedTypes.test(file.mimetype);
      if (isAllowed) return cb(null, true);
      cb(new Error("Only images are allowed"));
    }
  });

  // Handle both /upload and /upload/
  apiRouter.post(["/upload", "/upload/"], (req, res) => {
    console.log(`API: Handling upload request to ${req.url}...`);
    upload.single("image")(req, res, (err) => {
      if (err) {
        console.error("API: Upload Error:", err);
        return res.status(400).json({ error: err.message });
      }
      if (!req.file) {
        console.error("API: No file in request");
        return res.status(400).json({ error: "No file uploaded" });
      }
      
      console.log("API: Upload successful:", req.file.filename);
      res.json({ 
        success: true,
        url: `/uploads/${req.file.filename}`,
        filename: req.file.filename
      });
    });
  });

  // Mount API router
  app.use("/api-v1", apiRouter);

  // Catch-all for api-v1 to prevent falling through to Vite/Static
  app.use("/api-v1/*", (req, res) => {
    console.warn(`API: Unhandled request to ${req.originalUrl}`);
    res.status(404).json({ 
      error: "API route not found", 
      path: req.originalUrl,
      method: req.method 
    });
  });

  // 3. Body Parsers (After API routes that handle streams)
  app.use(express.json());

  // 4. Static Assets
  app.use("/uploads", express.static(uploadDir));

  // 5. Vite / SPA Fallback
  let vite: any;
  const serveHtml = async (req: express.Request, res: express.Response) => {
    try {
      let htmlPath: string;
      let html: string;
      let origin = process.env.APP_URL || `${req.protocol}://${req.get('host')}`;
      // Remove trailing slash if present
      origin = origin.replace(/\/$/, "");

      if (process.env.NODE_ENV !== "production") {
        htmlPath = path.join(__dirname, "index.html");
        html = fs.readFileSync(htmlPath, "utf-8");
        if (vite) {
          html = await vite.transformIndexHtml(req.url, html);
        }
      } else {
        htmlPath = path.join(__dirname, "dist", "index.html");
        if (fs.existsSync(htmlPath)) {
          html = fs.readFileSync(htmlPath, "utf-8");
        } else {
          // Fallback to root index.html if dist doesn't exist yet
          htmlPath = path.join(__dirname, "index.html");
          html = fs.readFileSync(htmlPath, "utf-8");
        }
      }

      // Replace the hardcoded production URL with the current origin
      const modifiedHtml = html.replace(/https:\/\/optiscaledigital\.co\.uk\//g, origin + "/");
      
      res.status(200).set({ "Content-Type": "text/html" }).end(modifiedHtml);
    } catch (e: any) {
      console.error("Error serving HTML:", e);
      res.status(500).end(e.message);
    }
  };

  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in DEVELOPMENT mode");
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
    
    app.get("*", async (req, res, next) => {
      if (req.path.startsWith('/api') || req.path.includes('.')) {
        return next();
      }
      await serveHtml(req, res);
    });
  } else {
    console.log("Starting in PRODUCTION mode");
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath, { index: false })); // Disable automatic index.html serving
    
    app.get("*", async (req, res) => {
      // Ensure we don't serve HTML for missing API calls
      if (req.path.startsWith('/api')) {
        return res.status(404).json({ 
          error: "API route not found",
          path: req.path
        });
      }
      await serveHtml(req, res);
    });
  }

  // 6. Global Error Handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("CRITICAL ERROR:", err);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`>>> Server running on http://0.0.0.0:${PORT}`);
    console.log(`>>> Uploads directory: ${uploadDir}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});

