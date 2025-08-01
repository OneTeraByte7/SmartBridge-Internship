const express = require("express");
const mongoose = require("mongoose"); 
const router = express.Router();
const Complaint = require("../models/Complaint");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware"); 


router.post("/", authMiddleware, async (req, res) => {
  try {
    const { subject, issue } = req.body;

    if (!subject || !issue) {
      return res.status(400).json({ error: "Subject and issue are required" });
    }

    const complaint = new Complaint({
      user: req.user.id,
      subject,
      issue,
    });

    await complaint.save();
    res.status(201).json({ message: "Complaint submitted", complaint });
  } catch (err) {
    console.error("Error submitting complaint:", err);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/get", authMiddleware, async (req, res) => {
  try {
    let complaints;

    if (req.user.role === "admin" || req.user.role === "agent") {
      complaints = await Complaint.find()
        .populate("user", "fullName email")
        .populate("assignedAgent", "fullName email");
    } else {
      complaints = await Complaint.find({ user: req.user.id })
        .populate("user", "fullName email")
        .populate("assignedAgent", "fullName email");
    }

    res.json({ complaints });
  } catch (err) {
    console.error("Error fetching complaints:", err);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/my", authMiddleware, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const complaints = await Complaint.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("assignedAgent", "fullName email");
    res.status(200).json({ complaints });
  } catch (err) {
    console.error("Error fetching user's complaints:", err);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
});


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


router.patch("/:complaintId/assign", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const { complaintId } = req.params;
    const { agentId } = req.body;

    if (!agentId) {
      return res.status(400).json({ error: "Agent ID is required." });
    }

    const agent = await User.findOne({ _id: agentId, role: "agent" });
    if (!agent) {
      return res.status(404).json({ error: "Agent not found." });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      {
        assignedAgent: agentId,
        status: "assigned", 
      },
      { new: true }
    ).populate("assignedAgent", "fullName email");

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found." });
    }

    res.status(200).json({ message: "Agent assigned and status updated successfully.", complaint });
  } catch (err) {
    console.error("Error assigning agent:", err);
    res.status(500).json({ error: "Server error." });
  }
});

router.patch("/:complaintId/update", authMiddleware, async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { status, comment } = req.body;

    if (!status && !comment) {
      return res.status(400).json({ error: "Status or comment required to update." });
    }

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found." });
    }

    const userId = req.user.id;
    const userRole = req.user.role;

    const isAssignedAgent = complaint.assignedAgent?.toString() === userId;
    if (!isAssignedAgent && userRole !== "admin") {
      return res.status(403).json({ error: "Access denied. Only assigned agent or admin can update." });
    }

    if (status) complaint.status = status;

    if (comment && comment.trim().length > 0) {
      if (!complaint.comments) complaint.comments = [];
      complaint.comments.push({
        author: userId,
        text: comment.trim(),
        date: new Date(),
      });
    }

    await complaint.save();

    await complaint.populate([
      { path: "comments.author", select: "fullName email" },
      { path: "assignedAgent", select: "fullName email" },
      { path: "user", select: "fullName email" },
    ]);

    res.json({ message: "Complaint updated successfully.", complaint });
  } catch (err) {
    console.error("Error updating complaint:", err);
    res.status(500).json({ error: "Server error." });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  const complaintId = req.params.id;

  try {
    const complaint = await Complaint.findById(complaintId)
      .populate("user", "fullName email")
      .populate("assignedAgent", "fullName email")
      .populate("comments.author", "fullName email")
      .exec();

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json({ complaint });
  } catch (err) {
    console.error("Error fetching complaint:", err);
    res.status(500).json({ message: "Server error while fetching complaint" });
  }
});

module.exports = router;
