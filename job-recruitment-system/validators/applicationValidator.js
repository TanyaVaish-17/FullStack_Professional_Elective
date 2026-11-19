
const { body } = require("express-validator");

exports.applicationValidator = [
  body("jobId")
    .isMongoId().withMessage("Valid job ID is required"),

  body("resumeLink")
    .trim()
    .isURL().withMessage("Enter a valid resume URL"),

  body("coverLetter")
    .trim()
    .notEmpty().withMessage("Cover letter is required")
];

exports.statusValidator = [
  body("applicationStatus")
    .isIn(["Applied", "Shortlisted", "Rejected", "Selected"])
    .withMessage("Invalid application status")
];
