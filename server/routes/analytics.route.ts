import express from "express"; // Import the Express framework
import { authorizeRoles, isAuthenticated } from "../middleware/auth"; // Import middleware for authentication and role-based authorization
import {
  getCoursesAnalytics,
  getOrdersAnalytics,
  getUsersAnalytics,
} from "../controllers/analytics.controller"; // Import controller functions for handling analytics routes
import { getNotifications } from "../controllers/notification.controller"; // Import controller function for handling notifications

const analyticsRouter = express.Router(); // Create a new router object for defining routes related to analytics

// Define a GET route for fetching user analytics
// This route is protected by authentication and authorization middleware, only accessible to admin users
analyticsRouter.get(
  "/get-users-analytics",
  isAuthenticated, // Checks if the user is authenticated
  authorizeRoles("admin"), // Checks if the user has the 'admin' role
  getUsersAnalytics // Controller function that handles fetching user analytics
);

// Define a GET route for fetching course analytics
// This route is protected by authentication and authorization middleware, only accessible to admin users
analyticsRouter.get(
  "/get-courses-analytics",
  isAuthenticated, // Checks if the user is authenticated
  authorizeRoles("admin"), // Checks if the user has the 'admin' role
  getCoursesAnalytics // Controller function that handles fetching course analytics
);

// Define a GET route for fetching order analytics
// This route is protected by authentication and authorization middleware, only accessible to admin users
analyticsRouter.get(
  "/get-orders-analytics",
  isAuthenticated, // Checks if the user is authenticated
  authorizeRoles("admin"), // Checks if the user has the 'admin' role
  getOrdersAnalytics // Controller function that handles fetching order analytics
);

// Define a GET route for fetching notifications analytics
// This route is protected by authentication and authorization middleware, only accessible to admin users
analyticsRouter.get(
  "/get-notifications-analytics",
  isAuthenticated, // Checks if the user is authenticated
  authorizeRoles("admin"), // Checks if the user has the 'admin' role
  getNotifications // Controller function that handles fetching notifications
);

export default analyticsRouter; // Export the router to be used in the main application
