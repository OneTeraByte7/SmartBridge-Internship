const express = require("express")
const router = express.Router()
const Complaint = require("../models/Complaint")
const authMiddleware = require("../middleware/authMiddleware") // JWT verification

// Submit a new complaint
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { subject, issue } = req.body

    if (!subject || !issue) {
      return res.status(400).json({ error: "Subject and issue are required" })
    }

    const complaint = new Complaint({
      user: req.user.id,
      subject,
      issue,
    })

    await complaint.save()
    res.status(201).json({ message: "Complaint submitted", complaint })
  } catch (err) {
    res.status(500).json({ error: "Server error" })
  }
})

// Get complaints - admin and agent get all, user gets only their own
router.get("/get", authMiddleware, async (req, res) => {
  try {
    let complaints

    if (req.user.role === "admin" || req.user.role === "agent") {
      // Admins and agents see all complaints
      complaints = await Complaint.find().populate("user", "fullName email")
    } else {
      // Regular users see only their complaints
      complaints = await Complaint.find({ user: req.user.id }).populate("user", "fullName email")
    }

    res.json({ complaints })
  } catch (err) {
    res.status(500).json({ error: "Server error" })
  }
})

module.exports = router
