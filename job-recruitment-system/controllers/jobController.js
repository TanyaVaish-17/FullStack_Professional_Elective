const Job = require("../models/Job");
const mongoose = require("mongoose");

exports.createJob = async (req, res, next) => {
  try {
    const {
      title,
      company,
      description,
      location,
      skills,
      salary,
      experience,
      employmentType
    } = req.body;

    if (!title || !company || !description || !location ||
        !Array.isArray(skills) || skills.length === 0 ||
        salary === undefined || experience === undefined || !employmentType) {
      return res.status(400).json({
        success: false,
        message: "All job fields are required"
      });
    }

    const job = await Job.create({
      title,
      company,
      description,
      location,
      skills,
      salary,
      experience,
      employmentType,
      postedBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: "Job published successfully",
      job
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllJobs = async (req, res, next) => {
  try {
    const { search, location, employmentType } = req.query;

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));

    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { skills: { $regex: search, $options: "i" } }
      ];
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (employmentType) {
      filter.employmentType = employmentType;
    }

    const total = await Job.countDocuments(filter);

    const jobs = await Job.find(filter)
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      jobs
    });
  } catch (error) {
    next(error);
  }
};

exports.getJobById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID"
      });
    }

    const job = await Job.findById(req.params.id)
      .populate("postedBy", "name email");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    res.status(200).json({
      success: true,
      job
    });
  } catch (error) {
    next(error);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID"
      });
    }

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    if (
      job.postedBy.toString() !== req.user._id.toString() &&
      req.user.role !== "Admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You cannot update this job"
      });
    }

    const allowedFields = [
      "title", "company", "description", "location",
      "skills", "salary", "experience", "employmentType"
    ];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        job[field] = req.body[field];
      }
    }

    await job.save();

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID"
      });
    }

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    if (
      job.postedBy.toString() !== req.user._id.toString() &&
      req.user.role !== "Admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You cannot delete this job"
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: "Job deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};
