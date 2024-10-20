import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import emailjs from "@emailjs/browser"; // Import EmailJS
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const HeroSection = () => {
  const [signupMessage, setSignupMessage] = useState(""); // State for the signup message
  const [email, setEmail] = useState(""); // State for the email input
  const [loading, setLoading] = useState(false); // State for loading

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS
  }, []);

  const handleSignUp = () => {
    // Check if email is valid
    if (!email) {
      toast.error("Please enter a valid email."); // Show error toast
      return;
    }

    setLoading(true); // Set loading to true
    // Sending email using EmailJS
    emailjs
      .send(
        "service_ibnkfbb",
        "signup_template",
        {
          email,
          message: "New signup for early access!",
        },
        "8cu9YH3f38WXRhH9-"
      )
      .then(() => {
        // Set the signup message and clear the email input
        setSignupMessage(
          "Thanks for signing up! Exciting things are coming your way soon."
        );
        setEmail("");
        toast.success("Thank you for signing up!"); // Show success toast
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
        toast.error("Failed to send the email. Please try again later."); // Show error toast
      })
      .finally(() => {
        setLoading(false); // Set loading to false after operation
      });
  };

  return (
    <div
      className="flex flex-col lg:flex-row items-center justify-between bg-[#FAEDCB] w-full h-auto lg:h-[100vh] px-[2vw] lg:px-[4vw] py-[2vw]"
      data-aos="fade-in" // Adding AOS animation for the entire section
    >
      {/* Right Section (Image at the top for mobile) */}
      <div
        className="flex justify-center items-center w-full lg:w-[50%] mb-[2vw] lg:mb-0 lg:order-2"
        data-aos="zoom-in" // Animation for the image
      >
        <img
          src="/herosection.png"
          alt="Hero Section"
          className="w-[90%] lg:w-[100%] p-[1.5vw] lg:p-[2vw]"
        />
      </div>

      {/* Left Section (Text and Input below image on mobile) */}
      <div
        className="flex flex-col w-full lg:w-[50%] h-full lg:ml-[3vw] mt-[2vw] lg:mt-[18vw]"
        data-aos="fade-up" // Animation for text and input
      >
        <h1 className="font-comic-neue font-bold text-[5vw] lg:text-[2.5vw] leading-[6vw] lg:leading-[3vw] text-black mt-[1vw] lg:mt-10 text-center lg:text-left">
          Unlock Your Child’s Speech with Fun, AI-Powered Games
        </h1>
        <p className="font-comic-neue font-normal text-[4vw] lg:text-[1.5vw] leading-[5vw] lg:leading-[2vw] text-black mt-[1vw] lg:mt-5 text-center lg:text-left">
          Designed by experts from{" "}
          <span className="text-[rgba(38,65,149,1)] font-bold">
            IIT & Harvard University
          </span>
          , loved by kids, and trusted by parents. Speed up your child's
          speech-language development from home with interactive, engaging
          activities.
        </p>

        {/* Input & Button */}
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-start w-full mt-[4vw] lg:mt-[2vw]">
          <input
            type="email"
            value={email} // Set email input value
            onChange={(e) => setEmail(e.target.value)} // Update email state
            placeholder="Enter your email to unlock the early access"
            className="w-full lg:max-w-[28vw] p-[3vw] lg:p-[1vw] rounded-t-xl lg:rounded-t-none lg:rounded-tl-xl lg:rounded-s-xl border-2 border-[#DBCDF0] focus:outline-none focus:border-purple-500 mb-[1vw] lg:mb-0"
            data-aos="fade-right"
          />
          <button
            onClick={handleSignUp} // Handle signup click
            className={`w-full lg:w-[10vw] bg-[#DBCDF0] px-[3vw] lg:px-[1.5vw] py-[2vw] lg:py-[1vw] lg:rounded-b-none lg:rounded-br-xl lg:border-b-[0.2vw] lg:border-[#DBCDF0]  rounded-b-xl lg:rounded-e-xl text-black font-semibold ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`} // Disable button while loading
            disabled={loading} // Disable button while loading
            data-aos="fade-left"
          >
            {loading ? "Loading..." : "Sign me up!"} {/* Change button text based on loading */}
          </button>
        </div>
        {signupMessage ? (
          <h3 className="mt-[0.5vw] font-light text-[3vw] lg:text-[0.9vw] text-center lg:text-left">
            {signupMessage}
          </h3>
        ) : (
          <h3 className="mt-[0.5vw] font-light text-[3vw] lg:text-[0.9vw] text-center lg:text-left">
            <span className="text-red-700">*</span>We’ll only send what’s worth
            opening – no spam, guaranteed!
          </h3>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default HeroSection;
