const express = require("express")
const router = express.Router()
const Complaint = require("../models/Complaint")
const authMiddleware = require("../middleware/authMiddleware") // Ensure JWT token is verified

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

module.exports = router
