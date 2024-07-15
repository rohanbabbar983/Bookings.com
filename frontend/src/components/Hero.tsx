import heroLogo from "../assets/heroLogo.png";

const Hero = () => {
  return (
    <div className="-mb-16 md:-mb-12 pb-4 bg-cover bg-center" style={{ backgroundImage: `url(${heroLogo})` }}>
      <div className="container py-10 items-center mx-auto flex flex-col gap-4 text-center bg-black bg-opacity-50">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight">
          Find your next stay
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mt-2">
          Search low prices on hotels for your dream vacation...
        </p>
      </div>
    </div>
  );
};

export default Hero;
