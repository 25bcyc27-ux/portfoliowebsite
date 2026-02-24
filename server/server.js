const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model("Contact", contactSchema);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Contact route
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.json({ message: "Message saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(5000, () => {
      console.log("Server running on port 5000 🚀");
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error ❌");
    console.log(err);
  });