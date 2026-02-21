const Course = require("../models/Course");

// GET all courses
exports.getCourses = async (req, res) => {
  const courses = await Course.find();
  res.status(200).json(courses);
};

// GET single course
exports.getCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  res.status(200).json(course);
};

exports.createCourse = async (req, res) => {
  try {
    const {
      name,
      description,
      courseCode,
      price,
      instructor,
      isPublished,
    } = req.body;

    // Basic manual validation (optional but good practice)
    if (!name || !description || !courseCode || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Check if courseCode already exists
    const existingCourse = await Course.findOne({ courseCode });
    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: "Course code already exists",
      });
    }

    const newCourse = await Course.create({
      name,
      description,
      courseCode,
      price,
      instructor,
      isPublished,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// PUT update course
exports.updateCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  res.status(200).json(course);
};

// DELETE course
exports.deleteCourse = async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  res.status(200).json({ message: "Course deleted successfully" });
};
