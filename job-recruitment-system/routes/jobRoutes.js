
const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} = require("../controllers/jobController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const validate = require("../middleware/validate");
const { jobValidator } = require("../validators/jobValidator");

router.post(
  "/",
  protect,
  authorizeRoles("Recruiter"),
  jobValidator,
  validate,
  createJob
);

router.get("/", getAllJobs);
router.get("/:id", getJobById);

router.put("/:id", protect, authorizeRoles("Recruiter", "Admin"), updateJob);

router.delete("/:id", protect, authorizeRoles("Recruiter", "Admin"), deleteJob);

module.exports = router;
