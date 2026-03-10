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
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static assets but NOT index.html
    app.use(express.static(path.resolve(__dirname, "dist"), { index: false }));
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
      // Use a high-quality Unsplash image as default for better social previews
      let image = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop";
      
      // Robust base URL detection for Cloud Run / Proxies
      const protocol = req.headers["x-forwarded-proto"] || req.protocol;
      const host = req.headers["x-forwarded-host"] || req.get("host");
      let baseUrl = `${protocol}://${host}`;
      
      // Force https for production domains
      if (host && !host.includes("localhost") && !host.includes("127.0.0.1")) {
        baseUrl = baseUrl.replace("http://", "https://");
      }
      
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
      } else if (url === "/" || url === "") {
        // For home page, we can use the logo if specifically requested, 
        // but a hero image is usually better for social media.
        // If the user specifically wants the logo, we can set it here.
        // image = "/images/logo/company-logo.png"; 
      }

      // Ensure absolute image URL
      if (image.startsWith("/")) {
        image = `${baseUrl}${image}`;
      }

      const imageType = image.endsWith(".png") ? "image/png" : "image/jpeg";

      // Replace placeholders
      const html = template
        .replace(/__TITLE__/g, title)
        .replace(/__DESCRIPTION__/g, description)
        .replace(/__IMAGE__/g, image)
        .replace(/__IMAGE_TYPE__/g, imageType)
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
