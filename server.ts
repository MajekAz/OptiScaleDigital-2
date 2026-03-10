import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { BLOG_POSTS } from "./data/blogPosts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Vite middleware for development
  let vite: any;
  if (process.env.NODE_ENV !== "production") {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom", // Use custom to handle HTML serving ourselves
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
  }

  app.get("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template: string;
      if (process.env.NODE_ENV !== "production") {
        template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
      } else {
        template = fs.readFileSync(path.resolve(__dirname, "dist/index.html"), "utf-8");
      }

      // Default values
      let title = "OptiScale Digital | UK Web Design & AI Automation Agency";
      let description = "Scale your UK business with high-performance web design and custom AI automation. We build the infrastructure for your success.";
      let image = "/images/logo/company-logo.png";
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      let canonicalUrl = `${baseUrl}${url}`;

      // Handle Blog Post pages
      if (url.startsWith("/post/")) {
        const postId = url.split("/post/")[1];
        const post = BLOG_POSTS.find((p) => String(p.id) === postId);
        if (post) {
          title = `${post.title} | OptiScale Insights`;
          description = post.excerpt;
          image = post.image || image;
        }
      }

      // Ensure absolute image URL
      if (image.startsWith("/")) {
        image = `${baseUrl}${image}`;
      }

      // Replace placeholders
      const html = template
        .replace(/__TITLE__/g, title)
        .replace(/__DESCRIPTION__/g, description)
        .replace(/__IMAGE__/g, image)
        .replace(/__URL__/g, canonicalUrl);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        vite.ssrFixStacktrace(e);
      }
      next(e);
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
