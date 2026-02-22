const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const protect = require("../middleware/authMiddleware"); 
const { adminOnly } = require("../middleware/adminMiddleware"); 

// --- PUBLIC ROUTES ---
router.get("/", courseController.getCourses); 
router.get("/:id", courseController.getCourse); 

// --- ADMIN ONLY ROUTES (Protected) ---
// Inke liye pehle Token (protect) chahiye aur phir Admin role (adminOnly) check hoga
router.post("/", protect, adminOnly, courseController.createCourse); 
router.put("/:id", protect, adminOnly, courseController.updateCourse); 
router.delete("/:id", protect, adminOnly, courseController.deleteCourse); 

module.exports = router;