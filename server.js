const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// فایل‌های استاتیک
app.use(express.static(__dirname));

// صفحه اصلی
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
