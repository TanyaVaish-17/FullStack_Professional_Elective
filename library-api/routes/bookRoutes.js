const express = require("express");
const {
  createBook,
  getBooks,
  updateAvailability,
} = require("../controllers/bookController");

const router = express.Router();

router.post("/", createBook);
router.get("/", getBooks);
router.patch("/:id", updateAvailability);

module.exports = router;