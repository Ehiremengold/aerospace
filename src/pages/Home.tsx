import { ArrowRight } from "lucide-react";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet-async";
import techInnoImg from "../assets/images/tech-innovation.jpg";

const Home = () => {
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home | AeroSpace</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <section className="relative min-h-screen overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>

        {/* Hero Text */}
        <div className="relative z-20 flex items-center justify-center min-h-screen text-white text-center px-4">
          <div>
            <h1 className="text-5xl font-bold mb-4">Welcome to AeroSpace</h1>
            <p className="text-xl">
              Pioneering the Golden Age of Defense Technology
            </p>
            <div className="flex items-center gap-5 flex-wrap mt-4 justify-center">
              <div className="group bg-black/60 text-white text-sm py-1 px-3 flex items-center gap-2 rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-300 ease-in-out">
                <h1>Learn About Next-Gen Architecture</h1>
                <ArrowRight className="w-3 text-white group-hover:text-black transition-all duration-300 ease-in-out" />
              </div>
              <div className="group bg-black/60 text-white text-sm py-1 px-3 flex items-center gap-2 rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-300 ease-in-out">
                <h1>Explore our Technology</h1>
                <ArrowRight className="w-3 text-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg/8 font-semibold text-gray-900">
            Trusted by the world’s most innovative teams
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <img
              width="158"
              height="48"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />

            <img
              width="158"
              height="48"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-gray-900.svg"
              alt="Reform"
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />

            <img
              width="158"
              height="48"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-gray-900.svg"
              alt="Tuple"
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />

            <img
              width="158"
              height="48"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-gray-900.svg"
              alt="SavvyCal"
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
            />

            <img
              width="158"
              height="48"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-gray-900.svg"
              alt="Statamic"
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 px-4 md:px-8 lg:px-16 py-12 max-w-7xl mx-auto">
        {/* Text Content */}
        <div className="flex flex-col gap-4 w-full md:w-1/2 text-center md:text-left">
          <h1 className="font-bold text-2xl md:text-4xl leading-tight">
            Technology and Innovation
          </h1>
          <p className="text-base md:text-lg text-gray-700">
            For some, the word 'impossible' ends discussions. For us, it's a
            starting point.
          </p>
          <div className="group bg-black w-fit text-white text-sm py-2 px-4 flex items-center gap-2 rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-300 ease-in-out mx-auto md:mx-0">
            <span>Learn About Next-Gen Architecture</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:text-black transition-all duration-300 ease-in-out" />
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src={techInnoImg}
            alt="Technology Illustration"
            className="rounded-xl w-full h-auto max-w-[600px] mx-auto"
          />
        </div>
      </section>
    </Layout>
  );
};

export default Home;
