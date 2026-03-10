import Lesson from "../models/Lesson.js";

export const createLesson = async (req, res) => {
  try {

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required"
      });
    }

    const lesson = await Lesson.create({
      title,
      description,
      mentorId: req.user._id
    });

    res.status(201).json({
      message: "Lesson created successfully",
      lesson
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};