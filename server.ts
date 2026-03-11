import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { BLOG_POSTS } from "./data/blogPosts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for logo upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.resolve(__dirname, "public/images/logo");
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

  app.use(express.json());

  // Logo upload endpoint
  app.post("/api/fix-logo", upload.single("logo"), (req, res) => {
    console.log("Logo uploaded successfully");
    res.json({ success: true, message: "Logo updated successfully!" });
  });

  // Vite middleware for development
  let vite: any;
  const isProd = process.env.NODE_ENV === "production" || fs.existsSync(path.resolve(__dirname, "dist/index.html")) || fs.existsSync(path.resolve(__dirname, "dist/index.ssr.html"));
  
  if (process.env.NODE_ENV !== "production") {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
