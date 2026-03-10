import Session from "../models/Session.js";
import Lesson from "../models/Lesson.js";

export const createSession = async (req, res) => {
  try {

    const { lessonId, date, topic, summary } = req.body;

    if (!lessonId || !date || !topic) {
      return res.status(400).json({
        message: "lessonId, date and topic are required"
      });
    }

    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found"
      });
    }

    const session = await Session.create({
      lessonId,
      date,
      topic,
      summary
    });

    res.status(201).json({
      message: "Session created successfully",
      session
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



export const getLessonSessions = async (req, res) => {
  try {

    const { id } = req.params;

    const sessions = await Session.find({ lessonId: id });

    res.json({
      count: sessions.length,
      sessions
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};