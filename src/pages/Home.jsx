import bannerImage from "../assets/home-banner.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-screen w-full">
        <img
          src={bannerImage}
          alt="Suntouch IT Company"
          className="w-full h-full object-cover"
        />

        {/* TEXT AT TOP (NO BOX, NO SHADE) */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2 text-center px-6 max-w-4xl">
          <h1 className="text-white text-5xl md:text-6xl font-bold drop-shadow-lg">
            Welcome to Suntouch IT
          </h1>
          <p className="text-gray text-lg md:text-xl mt-4 drop-shadow-md">
            
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
