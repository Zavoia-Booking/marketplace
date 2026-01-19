import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "node:fs";
import path from "node:path";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const filePath = path.join(process.cwd(), "public", "maintenance.html");
  const html = fs.readFileSync(filePath, "utf8");

  res.status(503);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  // Helps crawlers understand it's temporary
  res.setHeader("Retry-After", "3600"); // 1 hour
  // Extra safety
  res.setHeader("X-Robots-Tag", "noindex, nofollow");


  res.send(html);
}
