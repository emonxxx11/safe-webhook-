import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ⚠️ Put your real webhook URL here
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1413792755775311933/D0VIkgbQp_hHFtFjp668W68dDNwPb0bGM138aiiKoNoptVw5YUEejS7cSXTu63mphTMV";

// ✅ Root route (for Railway check)
app.get("/", (req, res) => {
  res.send("🚀 Webhook API is running on Railway!");
});

// ✅ POST /send route → send message to Discord
app.post("/send", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ success: false, error: "Missing content field" });
    }

    await axios.post(DISCORD_WEBHOOK, { content });

    res.json({ success: true, message: "Message sent to Discord ✅" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
