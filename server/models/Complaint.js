const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   // The user who submitted the complaint
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

  // Status of the complaint
  status: {
    type: String,
    enum: ["Unassigned", "Assigned", "In Progress", "Resolved"],
    default: "Unassigned",
  },

  // Assigned agent reference (if any)
  assignedAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  // Comments array with author and timestamp
  comments: [
    {
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      text: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],

  // Status change history: logs status changes with who changed and when
  statusHistory: [
    {
      status: {
        type: String,
        enum: ["Unassigned", "Assigned", "In Progress", "Resolved"],
      },
      changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      date: { type: Date, default: Date.now },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },

  // Optional resolution date
  resolvedAt: {
    type: Date,
    default: null,
  },

  // Optional feedback from user after resolution
  feedback: {
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
  },
});

// Update `updatedAt` on every save
complaintSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Complaint", complaintSchema);
