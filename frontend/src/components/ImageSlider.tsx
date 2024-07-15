import { useState } from "react";

type Props = {
  images: string[];
};

const ImageSlider = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-center relative">
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="object-cover rounded-lg shadow-md max-h-[80vh] w-full"
        />
        {images.length > 1 && (
          <div>
            <button
              className="absolute top-1/2 -left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full text-white text-lg font-semibold px-3 py-2 z-10"
              onClick={goToPrevious}
            >
              &lt;
            </button>
            <button
              className="absolute top-1/2 -right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full text-white text-lg font-semibold px-3 py-2 z-10"
              onClick={goToNext}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
