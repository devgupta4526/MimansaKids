import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BalloonPopGame from "./components/BalloonPopGame";
import BalloonStartScreen from "./components/BalloonStartScreen";
import Waitlist from "./components/Waitlist";
import LandingPage from "./pages/LandingPage";
import LocomotiveScroll from "locomotive-scroll";
import 'locomotive-scroll/dist/locomotive-scroll.css';
import BalloonTest from "./components/BalloonTest";
import MobileBalloonPopGame from "./components/MobileBalloonPopGame";

function App() {
  const scrollRef = useRef(null); // Create a ref for the scroll container

  useEffect(() => {
    // Initialize Locomotive Scroll
    const locomotiveScroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true, // Enable smooth scrolling
    });

    // Clean up on unmount
    return () => {
      locomotiveScroll.destroy();
    };
  }, []);

  return (
    <Router>
      <div data-scroll-container ref={scrollRef}> 
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/game" element={<BalloonPopGame />} />
          <Route path="/mobile" element={<MobileBalloonPopGame />} />
          <Route path="/vosk" element={<BalloonTest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
