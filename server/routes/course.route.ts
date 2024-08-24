import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  editCourse,
  getAllCourses,
  getSignleCourse,
  uploadCourse,
} from "../controllers/course.controller";

// Create a new router instance for handling course-related routes
const courseRouter = express.Router();

// Route to create a new course
// Accessible only to authenticated users with the 'admin' role
courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);

// Route to edit an existing course by its ID
// Accessible only to authenticated users with the 'admin' role
courseRouter.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);

// Route to get details of a single course by its ID
// Accessible only to authenticated users
courseRouter.get("/get-course/:id", isAuthenticated, getSignleCourse);

// Route to get a list of all courses
// Accessible only to authenticated users
courseRouter.get("/get-courses/", isAuthenticated, getAllCourses);

// Export the router to be used in other parts of the application
export default courseRouter;
