import React from "react";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <>
      <section className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-black text-white py-20 px-6 relative overflow-hidden">
        <div className="text-center max-w-3xl z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to EduConnectX
          </h1>
          <p className="text-lg md:text-xl mb-8 mx-auto">
            Empowering education through community and technology. Discover
            resources, courses, and tools to enhance your learning experience.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-md hover:bg-gray-800 hover:text-white transition-all duration-300 text-lg"
            >
              Get Started
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 bg-transparent border-2 border-white font-semibold rounded-md hover:bg-white hover:text-gray-900 transition-all duration-300 text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-0"></div>
      </section>
    </>
  );
};

export default Hero;
