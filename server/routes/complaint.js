const express = require("express")
const router = express.Router()
const Complaint = require("../models/Complaint")
const User = require("../models/User"); 
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

router.get("/get", authMiddleware, async (req, res) => {
  try {
    let complaints;

    if (req.user.role === "admin" || req.user.role === "agent") {
      // Admins and agents see all complaints
      complaints = await Complaint.find().populate("user", "fullName email");
    } else {
      // Regular users see only their complaints
      complaints = await Complaint.find({ user: req.user.id }).populate("user", "fullName email");
    }

    res.json({ complaints });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// GET complaints for the logged-in user
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id)
    const complaints = await Complaint.find({ user: userId }).sort({ createdAt: -1 })
    res.status(200).json({ complaints })
  } catch (err) {
    console.error("Error fetching user's complaints:", err)
    res.status(500).json({ error: "Failed to fetch complaints" })
  }
})


router.get("/agents", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const agents = await User.find({ role: "agent" }).select("fullName email role");
    res.status(200).json({ agents });
  } catch (err) {
    console.error("Error fetching agents:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/all", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const users = await User.find().select("fullName email role");
    res.status(200).json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router
