import React, { useState, useEffect } from "react";
const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    { src: 'https://i.ibb.co.com/VtBsq6m/Library1.webp', alt: "Visa apply from any devices." },
    { src: 'https://i.ibb.co.com/T4tkwrB/Library2.webp', alt: "Visa apply for family." },
    { src: 'https://i.ibb.co.com/Nmcb0p9/Library3.webp', alt: "Apply student visa." },
    { src: 'https://i.ibb.co.com/smmfhB1/Visa-Myself.webp', alt: "Visa apply from home online."},
    
  ];



  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="w-full mx-auto">
      <div
        className="relative overflow-hidden rounded-lg w-full"
        style={{
          height: "500px", // Set a fixed height for normal size
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-transform duration-1000 ease-in-out transform ${
              index === currentIndex
                ? "translate-x-0"
                : index < currentIndex
                ? "-translate-x-full"
                : "translate-x-full"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4 w-full">
              <p>{image.alt}</p>
            </div>
          </div>
        ))}

        {/* Navigation buttons */}
        <button
          className="absolute top-1/2 transform -translate-y-1/2 left-4 bg-gray-800 text-white rounded-full p-2 sm:p-4 md:p-6"
          onClick={prevSlide}
          aria-label="Previous Slide"
        >
          &lt;
        </button>
        <button
          className="absolute top-1/2 transform -translate-y-1/2 right-4 bg-gray-800 text-white rounded-full p-2 sm:p-4 md:p-6"
          onClick={nextSlide}
          aria-label="Next Slide"
        >
          &gt;
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-3 w-3 sm:h-4 sm:w-4 rounded-full cursor-pointer ${
                index === currentIndex ? "bg-blue-500" : "bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
