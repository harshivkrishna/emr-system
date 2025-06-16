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
app.use(cors());
app.use(express.json());

let sock; // current WA socket
let saveCreds; // Baileys saveCreds callback
let readyResolve; // resolver for when socket is “open”
const readyPromise = new Promise((r) => (readyResolve = r));

// ===== 1) WhatsApp socket setup/reconnect =====
async function connectSocket() {
  const { state, saveCreds: sc } = await useMultiFileAuthState("./auth_info");
  saveCreds = sc;

  // (re)create socket
  sock = makeWASocket({
    auth: state,
    logger: pino({ level: "silent" }),
  });

  // persist creds
  sock.ev.on("creds.update", saveCreds);

  // handle QR, open, close
  sock.ev.on("connection.update", ({ connection, lastDisconnect, qr }) => {
    if (qr) {
      console.log("📱 QR RECEIVED, scan please:");
      qrcode.generate(qr, { small: true });
    }
    if (connection === "open") {
      console.log("✅ Baileys connection open!");
      readyResolve(); // allow send-message to proceed
    }
    if (connection === "close") {
      const code = lastDisconnect.error?.output?.statusCode;
      const shouldReconnect = code !== DisconnectReason.loggedOut;
      console.log("🔌 connection closed, reconnect?", shouldReconnect);

      if (shouldReconnect) {
        sock.ev.removeAllListeners();
        // reset the readiness promise for the next open
        readyPromise.then = null;
        readyPromise.then = (r) => {
          readyResolve = r;
        };
        connectSocket().catch(console.error);
      } else {
        console.log("🔒 logged out permanently");
      }
    }
  });
}

// ===== 2) HTTP endpoint =====
app.post("/send-message", async (req, res) => {
  // wait up to 30s for socket to open
  try {
    await Promise.race([
      readyPromise,
      new Promise((_, rej) =>
        setTimeout(() => rej(new Error("timeout")), 30000)
      ),
    ]);
  } catch {
    return res.status(503).json({
      success: false,
      error:
        "WhatsApp not ready: scan the QR in console and wait for “connection open”",
    });
  }

  const { number, message } = req.body;
  const jid = `${number}@s.whatsapp.net`;

  try {
    await sock.sendMessage(jid, { text: message });
    res.json({ success: true, message: "Message sent" });
  } catch (err) {
    console.error("Send Error", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ===== 3) Start HTTP + initial socket =====
const PORT = 5002;
app.listen(PORT, () =>
  console.log(`🚀 HTTP server running on http://localhost:${PORT}`)
);

connectSocket().catch((err) => {
  console.error("🎲 Failed to connect WhatsApp socket:", err);
  process.exit(1);
});
