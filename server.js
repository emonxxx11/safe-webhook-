const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// Your Discord webhook (keep this private, don’t post in public)
const WEBHOOK_URL = "https://discord.com/api/webhooks/1413792755775311933/D0VIkgbQp_hHFtFjp668W68dDNwPb0bGM138aiiKoNoptVw5YUEejS7cSXTu63mphTMV";

app.post("/send", async (req, res) => {
  try {
    const { content } = req.body;
    await axios.post(WEBHOOK_URL, { content });
    res.json({ success: true, sent: content });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Railway gives PORT automatically
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
