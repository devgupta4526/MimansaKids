import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import SliderSection from './SliderSection';
import WorkingSection from './WorkingSection';
import ChallengeSection from './ChallengeSection';
import ScienceSection from './ScienceSection';
import TestimonialSection from './TestimonialSection';
import FooterSection from './FooterSection';
import DontMissSection from './DontMissSection';
import TestimonialSection2 from './TestimonialSection2';

const LandingPage = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      smoothMobile: true, // Optional: Enable smooth scrolling on mobile devices
    });

    // Cleanup on unmount
    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  return (
    <div data-scroll-container ref={scrollRef} className='w-full h-full'>
      <Navbar />
      <HeroSection />
      <SliderSection />
      <WorkingSection />
      <TestimonialSection />
      <ChallengeSection />
      <TestimonialSection2 />
      <ScienceSection />
      <DontMissSection />
      <FooterSection />
    </div>
  );
};

export default LandingPage;
