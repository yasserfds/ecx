import express from "express";

// Import middleware for authentication and role authorization
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

// Import order controller functions to handle order-related operations
import { createOrder, getAllOrders } from "../controllers/order.controller";

// Initialize the Express router for handling order-related routes
const orderRouter = express.Router();

// Route to create a new order; requires the user to be authenticated
orderRouter.post("/create-order", isAuthenticated, createOrder);

// Route to fetch all orders; requires the user to be authenticated and have admin role
orderRouter.put(
  "/get-all-orders/",
  isAuthenticated,          // Middleware to check if the user is authenticated
  authorizeRoles("admin"),  // Middleware to check if the user has the 'admin' role
  getAllOrders              // Controller function to fetch all orders
);

// Export the router to be used in other parts of the application
export default orderRouter;
