import express    from 'express';
import cors       from 'cors';
import pino       from 'pino';
import qrcode     from 'qrcode-terminal';
import baileysPkg from '@whiskeysockets/baileys';

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = baileysPkg;

const app = express();
app.use(cors());
app.use(express.json());

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth_info');
  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' }),
    // remove printQRInTerminal here
  });

  // Persist credentials on every update
  sock.ev.on('creds.update', saveCreds);

  // Handle connection updates (QR, open, close, etc.)
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log('📱 QR RECEIVED, scan please:');
      qrcode.generate(qr, { small: true });
    }

    if (connection === 'open') {
      console.log('✅ Baileys connection open');
    }

    if (connection === 'close') {
      const shouldReconnect =
        lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('Connection closed, reconnecting?', shouldReconnect);
      if (shouldReconnect) start();
    }
  });

  app.post('/send-message', async (req, res) => {
    const { number, message } = req.body;
    const jid = `${number}@s.whatsapp.net`;

    try {
      await sock.sendMessage(jid, { text: message });
      res.json({ success: true, message: 'Message sent' });
    } catch (err) {
      console.error('Send Error', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  const PORT = 5002;
  app.listen(PORT, () => console.log(`🚀 HTTP server running on http://localhost:${PORT}`));
}

start();
