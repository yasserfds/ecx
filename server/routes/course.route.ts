import express from "express";

// Import middleware for authentication and role authorization
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

// Import course controller functions to handle course-related operations
import {
  addAnswer,              // Function to add an answer to a question in a course
  addQuestion,            // Function to add a new question to a course
  addReplyToReview,       // Function to add a reply to a course review
  addReview,              // Function to add a review to a course
  editCourse,             // Function to edit an existing course
  getAllCourses,          // Function to get a list of all courses
  getAllCoursesForAdmin,  // Function to get all courses specifically for admin purposes
  getCourseByUser,        // Function to get course content for a specific user
  getSignleCourse,        // Function to get details of a single course
  uploadCourse,           // Function to create/upload a new course
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

// Route to add a review to a course by course ID
// Accessible only to authenticated users
// Method: PUT
// URL: /add-review/:id
// Middleware: isAuthenticated
courseRouter.put("/add-review/:id", isAuthenticated, addReview);

// Route to add a reply to a review
// Accessible only to authenticated users with the 'admin' role
// Method: PUT
// URL: /add-reply
// Middleware: isAuthenticated, authorizeRoles("admin")
courseRouter.put(
  "/add-reply/",
  isAuthenticated,
  authorizeRoles("admin"),
  addReplyToReview
);

// Route to get all courses specifically for admin purposes
// Accessible only to authenticated users with the 'admin' role
// Method: PUT
// URL: /get-all-courses
// Middleware: isAuthenticated, authorizeRoles("admin")
courseRouter.put(
  "/get-all-courses/",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllCoursesForAdmin
);

// Export the router to be used in other parts of the application
export default courseRouter;
