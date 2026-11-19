
const { body } = require("express-validator");

exports.jobValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("company").trim().notEmpty().withMessage("Company is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("location").trim().notEmpty().withMessage("Location is required"),

  body("skills")
    .isArray({ min: 1 }).withMessage("At least one skill is required"),

  body("salary")
    .isFloat({ min: 0 }).withMessage("Salary must be a positive number"),

  body("experience")
    .isFloat({ min: 0 }).withMessage("Experience must be a non-negative number"),

  body("employmentType")
    .trim()
    .notEmpty().withMessage("Employment type is required")
];
