const Student = require("../models/studentModel");

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});

    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addStudent = async (req, res) => {
  try {
    const { name, image, age, status } = req.body;

    const student = new Student({
      name,
      image,
      age,
      status,
    });

    await student.save();

    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student_id = req.params.id;

    const { name, image, age, status } = req.body;

    const student = await Student.findByIdAndUpdate(
      student_id,
      {
        name,
        image,
        age,
        status,
      },
      { new: true }
    );

    if (!student) {
      res.status(404).json({ error: "No student by that id found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const setStudentStatus = async (req, res) => {
  try {
    const student_id = req.params.id;

    const { status } = req.body;

    const student = await Student.findById(student_id);

    if (!student) {
      res.status(404).json({ error: "No student by that id found" });
    }

    student.status = status;

    await student.save();

    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student_id = req.params.id;

    const student = await Student.findByIdAndDelete(student_id);

    if (!student) {
      res.status(404).json({ error: "No student by that id found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  setStudentStatus,
};
