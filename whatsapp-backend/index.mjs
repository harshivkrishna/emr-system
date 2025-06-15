import express from "express";
import cors from "cors";
import pino from "pino";
import qrcode from "qrcode-terminal";
import baileysPkg from "@whiskeysockets/baileys";

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
} = baileysPkg;

const app = express();

// ✅ CORS config - allow frontend
const allowedOrigins = ["https://medcare-emr.vercel.app"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth_info");
  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: "silent" }),
  });

  // 🔄 Save updated credentials
  sock.ev.on("creds.update", saveCreds);

  // 🔄 Listen for connection updates
  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log("📱 Scan this QR to authenticate:");
      qrcode.generate(qr, { small: true });
    }

    if (connection === "open") {
      console.log("✅ WhatsApp connection established");
    }

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !==
        DisconnectReason.loggedOut;
      console.log("❌ Connection closed. Reconnect?", shouldReconnect);
      if (shouldReconnect) start();
    }
  });

  // ✅ Send message route
  app.post("/send-message", async (req, res) => {
    const { number, message } = req.body;

    if (!number || !message) {
      return res
        .status(400)
        .json({ success: false, error: "number and message are required" });
    }

    const jid = `${number}@s.whatsapp.net`;

    try {
      await sock.sendMessage(jid, { text: message });
      res.json({ success: true, message: "Message sent" });
    } catch (err) {
      console.error("❌ Error sending message:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  const PORT = process.env.PORT || 5002;
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
}

start();
