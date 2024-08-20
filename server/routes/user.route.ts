import express from "express";

// Import user controller functions
import {
  activateUser,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updateUserInfo,
  updateUserPassword,
} from "../controllers/user.controller";

// Import middleware for authentication and role authorization
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

// Initialize the Express router
const userRouter = express.Router();

// Route to handle user registration
userRouter.post("/registration", registrationUser);

// Route to handle user account activation
userRouter.post("/activate-user", activateUser);

// Route to handle user login
userRouter.post("/login", loginUser);

// Route to handle user logout; only accessible if the user is authenticated
userRouter.get("/logout", isAuthenticated, logoutUser);

// Route to refresh and update the access token
userRouter.get("/refresh", updateAccessToken);

// Route to get user information; only accessible if the user is authenticated
userRouter.get("/me", isAuthenticated, getUserInfo);

// Route to handle social authentication
userRouter.post("/socialAuth", socialAuth);

// Route to update user information; only accessible if the user is authenticated
userRouter.put("/update-info", isAuthenticated, updateUserInfo);

// Route to update user password; only accessible if the user is authenticated
userRouter.put("/update-password", isAuthenticated, updateUserPassword);

// Export the router to be used in other parts of the application
export default userRouter;
