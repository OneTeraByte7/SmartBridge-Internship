const mongoose = require("mongoose")

const complaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   // assuming you have a User model
    required: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  issue: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["Unassigned", "Assigned", "In Progress", "Resolved"],
    default: "Unassigned",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // ref to an Agent user
    default: null,
  },

  assignedAgent: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    default: null },

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Complaint", complaintSchema)
