
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  resumeLink: {
    type: String,
    required: true
  },
  coverLetter: {
    type: String,
    required: true
  },
  applicationStatus: {
    type: String,
    enum: ["Applied", "Shortlisted", "Rejected", "Selected"],
    default: "Applied"
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

applicationSchema.index(
  { jobId: 1, candidateId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Application", applicationSchema);
