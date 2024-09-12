// Importing necessary modules and middleware
import express from "express"; // Express framework for building web applications
import { authorizeRoles, isAuthenticated } from "../middleware/auth"; // Middleware for authentication and role-based authorization
import {
  createLayout, // Controller function to create a new layout
  editLayout, // Controller function to edit an existing layout
  getLayoutByType, // Controller function to get layout by type
} from "../controllers/layout.controller";

const layoutRouter = express.Router(); // Create a new router instance for layout-related routes

// Route to create a new layout
// This route is protected by authentication and authorization middleware
// Only authenticated users with the 'admin' role can access this route
layoutRouter.post(
  "/create-layout",
  isAuthenticated, // Middleware to check if the user is authenticated
  authorizeRoles("admin"), // Middleware to authorize access for users with the 'admin' role
  createLayout // Controller function to handle the creation of a layout
);

// Route to edit an existing layout
// This route is also protected by authentication and authorization middleware
// Only authenticated users with the 'admin' role can access this route
layoutRouter.put(
  "/edit-layout",
  isAuthenticated, // Middleware to check if the user is authenticated
  authorizeRoles("admin") // Middleware to authorize access for users with the 'admin' role
);
