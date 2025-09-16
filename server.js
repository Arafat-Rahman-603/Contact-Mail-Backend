const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const PORT = 5001;
const app = express();
app.use(cors());
app.use(express.json());

// Test route to check server
app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

// POST endpoint to send email
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "arafat.rahman.6003@gmail.com",
      pass: "lwnxcwkompabvqrj",
    },
  });

  const mailOptions = {
    from: "arafat.rahman.6003@gmail.com",
    to: "arafat.rahman.6003@gmail.com",
    subject: `Contact Form Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    replyTo: email,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

// Start server
app.listen(PORT, () => console.log(`✅ Server running on port http://localhost:${PORT}`));
