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

// CREATE course
exports.createCourse = async (req, res) => {
  try {
    const {
      name,
      description,
      courseCode,
      price,
      instructor,
      isPublished,
      image, // Agar frontend se aati hai toh theek, warna default use hoga
    } = req.body;

    if (!name || !description || !courseCode || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

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
      image: image || "/images/course-default.svg",
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
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE course
exports.deleteCourse = async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.status(200).json({ message: "Course deleted successfully" });
};