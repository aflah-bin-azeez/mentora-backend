import Booking from "../models/Booking.js";
import Student from "../models/Student.js";
import Lesson from "../models/Lesson.js";

export const createBooking = async (req, res) => {
  try {

    const { studentId, lessonId } = req.body;

    if (!studentId || !lessonId) {
      return res.status(400).json({
        message: "studentId and lessonId are required"
      });
    }

    // Check student exists
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    // Ensure student belongs to the parent
    if (student.parentId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only book lessons for your own students"
      });
    }

    // Check lesson exists
    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found"
      });
    }

    const booking = await Booking.create({
      studentId,
      lessonId,
      parentId: req.user._id
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};