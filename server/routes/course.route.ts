import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  addAnswer,
  addQuestion,
  editCourse,
  getAllCourses,
  getCourseByUser,
  getSignleCourse,
  uploadCourse,
} from "../controllers/course.controller";

// Create a new router instance for handling course-related routes
const courseRouter = express.Router();

// Route to create a new course
// Accessible only to authenticated users with the 'admin' role
// Method: POST
// URL: /create-course
// Middleware: isAuthenticated (ensures user is logged in), authorizeRoles("admin") (ensures user has 'admin' role)
courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);

// Route to edit an existing course by its ID
// Accessible only to authenticated users with the 'admin' role
// Method: PUT
// URL: /edit-course/:id
// Middleware: isAuthenticated, authorizeRoles("admin")
courseRouter.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);

// Route to get details of a single course by its ID
// Accessible only to authenticated users
// Method: GET
// URL: /get-course/:id
// Middleware: isAuthenticated
courseRouter.get("/get-course/:id", isAuthenticated, getSignleCourse);

// Route to get a list of all courses
// Accessible only to authenticated users
// Method: GET
// URL: /get-courses
// Middleware: isAuthenticated
courseRouter.get("/get-courses/", isAuthenticated, getAllCourses);

// Route to get course content for a specific user by course ID
// Accessible only to authenticated users
// Method: GET
// URL: /get-course-content/:id
// Middleware: isAuthenticated
courseRouter.get("/get-course-content/:id", isAuthenticated, getCourseByUser);

// Route to add a question to a course
// Accessible only to authenticated users
// Method: PUT
// URL: /add-question
// Middleware: isAuthenticated
courseRouter.put("/add-question", isAuthenticated, addQuestion);

// Route to add an answer to a course question
// Accessible only to authenticated users
// Method: PUT
// URL: /add-answer
// Middleware: isAuthenticated
courseRouter.put("/add-answer", isAuthenticated, addAnswer);

// Export the router to be used in other parts of the application
export default courseRouter;
