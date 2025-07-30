const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   
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

  
  assignedAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  
  comments: [
    {
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      text: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],

  
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

  
  resolvedAt: {
    type: Date,
    default: null,
  },


  feedback: {
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
  },
});

complaintSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Complaint", complaintSchema);
