
const express = require("express");
const router = express.Router();

const {
  applyForJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus
} = require("../controllers/applicationController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const validate = require("../middleware/validate");

const {
  applicationValidator,
  statusValidator
} = require("../validators/applicationValidator");

router.post(
  "/",
  protect,
  authorizeRoles("Candidate"),
  applicationValidator,
  validate,
  applyForJob
);

router.get(
  "/my",
  protect,
  authorizeRoles("Candidate"),
  getMyApplications
);

router.get(
  "/job/:jobId",
  protect,
  authorizeRoles("Recruiter"),
  getJobApplications
);

router.patch(
  "/:id/status",
  protect,
  authorizeRoles("Recruiter"),
  statusValidator,
  validate,
  updateApplicationStatus
);

module.exports = router;
