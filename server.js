// server.js
import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Your Discord Webhook URL
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1413792755775311933/D0VIkgbQp_hHFtFjp668W68dDNwPb0bGM138aiiKoNoptVw5YUEejS7cSXTu63mphTMV";

// Route to send message
app.post("/send", async (req, res) => {
  try {
    const { content } = req.body;
    await axios.post(DISCORD_WEBHOOK, { content });
    res.json({ success: true, message: "Message sent to Discord" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Root test route
app.get("/", (req, res) => {
  res.send("🚀 Webhook API is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
