import React, { FC, useState } from "react";
import SignUp from "../auth/signup"; // Adjust the import path if needed
import Login from "../auth/login";
import Verification from "../auth/verification"
import CustomModal from "@/app/utils/customModal"; // Adjust the import path for CustomModal

const Hero: FC = () => {
  const [open, setOpen] = useState(false); // Manages modal visibility
  const [route, setRoute] = useState(""); // Define specific route types
  const [activeItem, setActiveItem] = useState("");

  // Handler for opening the Sign-Up modal
  const handleGetStartedClick = () => {
    setRoute("Sign-Up");
    setOpen(true);
  };

  // Common function to render CustomModal based on the route
  const renderModal = () => {
    let Component = null;

    switch (route) {
      case "Sign-Up":
        Component = SignUp;
        break;
      case "Login":
        Component = Login;
        break;
      case "verification":
        Component = Verification;
        break;
      default:
        return null;
    }

    return (
      <CustomModal
        open={open}
        setOpen={setOpen}
        setRoute={setRoute}
        activeItem={activeItem}
        component={Component} // Pass the resolved component
      />
    );
  };

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-20 px-6 transition-colors duration-500">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to EduConnectX
        </h1>
        <p className="text-lg md:text-xl mb-8 mx-auto">
          Empowering education through community and technology. Discover
          resources, courses, and tools to enhance your learning experience.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={handleGetStartedClick}
            className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-800 transition-all duration-300 dark:bg-white dark:text-black dark:hover:bg-gray-700"
          >
            Get Started
          </button>
          <button
            onClick={() => console.log("Learn More")}
            className="px-6 py-3 bg-transparent border-2 border-gray-900 text-gray-900 font-semibold rounded-md hover:bg-gray-900 hover:text-white transition-all duration-300 dark:border-gray-800 dark:text-white dark:hover:bg-gray-800 dark:hover:text-gray-900"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Render the appropriate modal based on the route */}
      {renderModal()}
    </section>
  );
};

export default Hero;
