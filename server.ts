import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import cors from "cors";
import { BLOG_POSTS } from "./data/blogPosts";

console.log("SERVER STARTING...");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for logo upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.resolve(process.cwd(), "public/images/logo");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, "company-logo.png");
  },
});
const upload = multer({ storage });

async function startServer() {
  const app = express();
  const PORT = 3000;

  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

  app.use(cors());
  app.use(express.json());

  // Logging middleware
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    res.setHeader("X-App-Version", "1.2");
    next();
  });

  // Test endpoint
  app.get("/api/test", (req, res) => {
    res.json({ message: "API is working" });
  });

  // Logo upload endpoint
  app.post("/api/v1/fix-logo-unique", (req, res, next) => {
    console.log("POST /api/v1/fix-logo-unique request received");
    next();
  }, upload.single("logo"), (req, res) => {
    console.log("POST /api/v1/fix-logo-unique processing");
    if (!req.file) {
      console.log("No file uploaded in request");
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    console.log("Logo uploaded successfully to:", req.file.path);
    res.json({ success: true, message: "Logo updated successfully!" });
  });

  app.get("/api/v1/fix-logo-unique", (req, res) => {
    res.json({ message: "This endpoint only accepts POST requests" });
  });

  // API 404 handler
  app.use("/api/*", (req, res) => {
    console.log(`API 404: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ success: false, message: `API route not found: ${req.originalUrl}` });
  });

  // Error handler
  app.use((err: any, req: any, res: any, next: any) => {
    console.error("Server Error:", err);
    res.status(500).json({ success: false, message: err.message || "Internal Server Error" });
  });

  // Vite middleware for development
  let vite: any;
  // Force dev mode for now to bypass dist issues
  const isDev = true; 
  
  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(process.cwd(), "dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
