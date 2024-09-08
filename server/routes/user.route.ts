import express from "express";

// Import user controller functions to handle various user-related operations
import {
  activateUser,          // Function to activate a user account
  getAllUsers,           // Function to fetch all users (admin only)
  getUserInfo,           // Function to get information of the currently logged-in user
  loginUser,             // Function to handle user login
  logoutUser,            // Function to handle user logout
  registrationUser,      // Function to handle user registration
  socialAuth,            // Function to handle social authentication
  updateAccessToken,     // Function to refresh and update the access token
  updateProfilePicture,  // Function to update the user's profile picture
  updateUserInfo,        // Function to update the user's personal information
  updateUserPassword,    // Function to update the user's password
} from "../controllers/user.controller";

// Import middleware for authentication and role authorization
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

// Initialize the Express router for handling user-related routes
const userRouter = express.Router();

// Route to handle user registration
userRouter.post("/registration", registrationUser);

// Route to handle user account activation
userRouter.post("/activate-user", activateUser);

// Route to handle user login
userRouter.post("/login", loginUser);

// Route to handle user logout; requires the user to be authenticated
userRouter.get("/logout", isAuthenticated, logoutUser);

// Route to refresh and update the access token
userRouter.get("/refresh", updateAccessToken);

// Route to get information of the currently logged-in user; requires authentication
userRouter.get("/me", isAuthenticated, getUserInfo);

// Route to handle social authentication (e.g., via Google, Facebook)
userRouter.post("/socialAuth", socialAuth);

// Route to update user information; requires the user to be authenticated
userRouter.put("/update-info", isAuthenticated, updateUserInfo);

// Route to update user password; requires the user to be authenticated
userRouter.put("/update-password", isAuthenticated, updateUserPassword);

// Route to update user's profile picture; requires the user to be authenticated
userRouter.put("/update-avatar", isAuthenticated, updateProfilePicture);

// Route to fetch all users; requires the user to be authenticated and have admin role
userRouter.put(
  "/get-all-users/",
  isAuthenticated,          // Middleware to check if the user is authenticated
  authorizeRoles("admin"),  // Middleware to check if the user has the 'admin' role
  getAllUsers               // Controller function to get all users
);

// Export the router to be used in other parts of the application
export default userRouter;
