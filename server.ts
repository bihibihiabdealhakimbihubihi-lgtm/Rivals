/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add JSON parsing middleware
  app.use(express.json());

  // API routes FIRST
  app.post("/api/subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ ok: false, description: "Email parameter is required." });
      }

      // Read Telegram Bot Token from environment context securely
      const botToken = process.env.VITE_TELEGRAM_BOT_TOKEN || "7295116743:AAE5VByY_h8-T66F6_3E_G22jF9X9c4tDoY";
      const chatId = "6087702535";
      const messageText = `📩 New Subscriber\nEmail: ${email}`;

      console.log(`[Backup server proxy] Forwarding subscribe registration for ${email} safely...`);
      
      const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: "HTML",
        }),
      });

      const resData = await telegramRes.json() as any;

      if (telegramRes.ok && resData.ok) {
        console.log(`[Backup server proxy] Successfully posted to Telegram API!`);
        return res.json({ ok: true });
      } else {
        console.error(`[Backup server proxy] Telegram API rejected envelope:`, resData);
        return res.status(502).json({ 
          ok: false, 
          description: resData.description || "The Telegram server declined dispatch." 
        });
      }
    } catch (error: any) {
      console.error(`[Backup server proxy] Operational Exception:`, error);
      return res.status(500).json({ 
        ok: false, 
        description: error?.message || "CORS network relay channel failed." 
      });
    }
  });

  // Serve Vite app in Dev or Static files in Prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Web App service actively bound on host 0.0.0.0:${PORT}`);
  });
}

startServer();
