
const Application = require("../models/Application");
const Job = require("../models/Job");
const mongoose = require("mongoose");

exports.applyForJob = async (req, res, next) => {
  try {
    const { jobId, resumeLink, coverLetter } = req.body;

    if (!jobId || !resumeLink || !coverLetter) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID"
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    const application = await Application.create({
      jobId,
      candidateId: req.user._id,
      resumeLink,
      coverLetter
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job"
      });
    }
    next(error);
  }
};

exports.getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({
      candidateId: req.user._id
    }).populate("jobId");

    res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    next(error);
  }
};

exports.getJobApplications = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID"
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You cannot view applications for this job"
      });
    }

    const applications = await Application.find({ jobId })
      .populate("candidateId", "name email")
      .populate("jobId", "title company");

    res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    next(error);
  }
};

exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { applicationStatus } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID"
      });
    }

    const validStatuses = [
      "Applied",
      "Shortlisted",
      "Rejected",
      "Selected"
    ];

    if (!validStatuses.includes(applicationStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status"
      });
    }

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    const job = await Job.findById(application.jobId);

    if (!job || job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You cannot update this application"
      });
    }

    application.applicationStatus = applicationStatus;
    await application.save();

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application
    });
  } catch (error) {
    next(error);
  }
};
