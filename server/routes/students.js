const express = require("express");
const {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  setStudentStatus,
} = require("../controller/studentController");

const router = express.Router();

router.get("/", getAllStudents);
router.post("/", addStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.patch("/:id", setStudentStatus);

module.exports = router;
