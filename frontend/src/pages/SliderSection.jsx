import React, { useState, useEffect } from "react";

const slides = [
  {
    title: "Real-Time Speech Feedback Powered by AI",
    description:
      "Our advanced AI listens to your child’s speech and provides instant feedback, helping improve articulation and language skills on the go.",
    image: "/aiimage2.png",
  },
  {
    title: "Fun, Interactive Learning",
    description:
      "No more boring exercises! Our games are designed to capture attention and make speech practice fun and rewarding for kids.",
    image: "/kidsimage1.png",
  },
  {
    title: "Healthy Screen Time Design",
    description:
      "Crafted to reduce passive screen time, our app encourages active engagement and meaningful parent-child interaction.",
    image: "/kidsimage2.png",
  },
  {
    title: "Built by Experts, Loved by Parents",
    description:
      "Developed by speech therapists and early childhood experts, our methods are proven to help children improve speech at their own pace.",
    image: "/kidsimage3.png",
  },
];

const SliderSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFading, setIsFading] = useState(false); // State to trigger fade animation
  const [direction, setDirection] = useState(null); 

  // Function to go to the next slide
  const handleNextSlide = () => {
    setIsFading(true); // Start fading out
    setDirection('right');
    setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      setIsFading(false); // Fade in the next slide
      setDirection(null);
    }, 500); // Adjust timing for fade effect
  };

  // Function to go to the previous slide
  const handlePrevSlide = () => {
    setIsFading(true);
    setDirection('left');
    setTimeout(() => {
      setCurrentSlide(
        (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
      );
      setDirection(null);
      setIsFading(false);
    }, 500);
  };

  return (
    <div className="bg-[#C5DEF2] w-full h-[120vh] flex flex-col items-center justify-center relative px-10">
      {/* Header Section */}
      <h1 className="font-comic-neue font-bold text-[2.5vw] leading-[2vw] text-black mb-3 mt-8">
        Why Choose Us
      </h1>
      <p className="font-comic-neue font-normal text-[1.3vw] leading-[3vw] text-black mb-36">
        Empowering Parents. Engaging Children. Proven Results.
      </p>

      {/* Slider Section */}
      <div className="relative flex justify-center items-center w-full max-w-7xl">
        {/* Left Arrow */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-0 flex justify-center items-center w-10 h-10 bg-[#FF9650] rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Main Content Section */}
        <div className= {`flex justify-between items-center w-full max-w-5xl  space-x-10 transition-transform duration-500 ${ isFading && direction == 'right' ? 'translate-x-full' : 'translate-x-0'} ${ isFading && direction == 'left' ? '-translate-x-full' : 'translate-x-0'}`}>
          {/* Text Section */}
          <div
            className={`flex flex-col justify-center w-[60%] transition-opacity duration-500 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            <h2 className="font-comic-neue text-[#6A7FBF] font-bold text-[40px] leading-[45px] mb-4">
              {slides[currentSlide].title}
            </h2>
            <p className="font-comic-neue font-normal text-[1.5vw] leading-[1.9vw] text-black">
              {slides[currentSlide].description}
            </p>
          </div>

          {/* Image Section */}
          <div
            className={`flex justify-center items-center w-[50%] transition-opacity duration-500 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="w-[26vw] h-[20vw] flex justify-center items-center rounded-xl">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full bg-fit"
              />
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNextSlide}
          className="absolute right-0 flex justify-center items-center w-10 h-10 bg-[#FF9650] rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-32 space-x-2">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => {
              setIsFading(true);
              setTimeout(() => {
                setCurrentSlide(index);
                setIsFading(false);
              }, 500); // Adjust timing for fade effect
            }}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentSlide ? "bg-[#FF9650]" : "bg-white opacity-60"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default SliderSection;
