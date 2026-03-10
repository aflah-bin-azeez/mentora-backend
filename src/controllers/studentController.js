import Student from "../models/Student.js";


export const createStudent = async (req, res) => {

  try {

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Student name is required"
      });
    }

    const student = await Student.create({
      name,
      parentId: req.user._id
    });

    res.status(201).json({
      message: "Student created successfully",
      student
    });

  } catch (error) {

    console.error("Create Student Error:", error);

    res.status(500).json({
      message: "Internal server error"
    });

  }

};


export const getStudents = async (req, res) => {

  try {

    const students = await Student.find({
      parentId: req.user._id
    });

    res.status(200).json({
      message: "Students fetched successfully",
      students
    });

  } catch (error) {

    console.error("Get Students Error:", error);

    res.status(500).json({
      message: "Internal server error"
    });

  }

};