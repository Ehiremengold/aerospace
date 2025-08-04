import wwdHero from "../assets/images/wwdHero.webp";
import { NavLink, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import advancedImg from "../assets/images/advanced.webp";
import aircraftImg from "../assets/images/aircraft.jpg";
import missileDefenceImg from "../assets/images/missileDefence.jpg";
import spaceImg from "../assets/images/space.webp";
import possibleImg from "../assets/images/possible.webp";
import { Helmet } from "react-helmet-async";
import { companyName } from "../utils/constants";
import { useEffect } from "react";

const WhatWeDo = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.hash === "#advanced-weapons") {
      const element = document.getElementById("advanced-weapons");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (location.hash === "#space") {
      const element = document.getElementById("space");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (location.hash === "#aircraft") {
      const element = document.getElementById("aircraft");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (location.hash === "#missile-defense") {
      const element = document.getElementById("missile-defense");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]);

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>What We Do | {companyName}</title>
        <meta
          name="description"
          content={`Explore ${companyName}'s advanced solutions in weapons, aircraft, missile defense, and space technology for unparalleled mission success.`}
        />
        <meta property="og:title" content={`What We Do | ${companyName}`} />
        <meta
          property="og:description"
          content={`Learn about ${companyName}'s innovative technologies in defense, aerospace, and space, delivering performance in high-stakes environments.`}
        />
        <meta property="og:image" content="/assets/images/wwdHero.webp" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={`advanced weapons, aircraft technology, missile defense, space technology, ${companyName}`}
        />
      </Helmet>
      <section className="relative h-[70dvh] w-full">
        {/* Background Image */}
        <img
          src={wwdHero}
          alt={`${companyName} advanced defense solutions`}
          className="absolute inset-0 h-full w-full object-cover object-center z-0"
        />

        {/* Overlay with text */}
        <div className="absolute left-0 top-0 h-full flex items-center px-6 lg:px-16 z-10">
          <div className="bg-black/70 text-white rounded-xl p-6 lg:w-[80%] w-full flex flex-col gap-4">
            <h1 className="font-semibold lg:text-4xl text-2xl">What We Do</h1>
            <p className="lg:text-2xl text-lg">
              Advanced Solutions for Ultimate Performance
            </p>
          </div>
        </div>
      </section>
      <div className="bg-black w-full text-white py-5">
        <div className="w-[80%] mx-auto flex items-center gap-2">
          <NavLink to="/" className={"text-gray-400"}>
            Home{" "}
          </NavLink>
          <span>&gt; What We Do</span>
        </div>
      </div>
      <section className="flex flex-col px-4 md:px-8 lg:px-16 py-12 max-w-7xl mx-auto gap-4">
        <h2 className="font-bold text-2xl md:text-4xl leading-tight">
          Forging Technologies that Push the Boundaries of Possible
        </h2>
        <p>
          {companyName} transforms bold ideas into operational realities with
          unparalleled expertise and a relentless focus on mission success. We
          pair a clear vision for the future with the experience to bring it to
          life. Trusted by those operating at the edge, our capacity to deliver
          with rigor and reliability – paired with speed, scale, and the
          ingenuity of our people – result in technology that performs when the
          stakes are highest.
        </p>
      </section>
      <section className="bg-black flex flex-col gap-4 lg:p-0 py-8">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
          <div className="w-full md:w-1/2">
            <img
              src={advancedImg}
              alt={`Advanced weapons technology by ${companyName}`}
              className="w-full h-auto max-w-[600px] mx-auto"
              loading="lazy"
            />
          </div>

          <div
            id="advanced-weapons"
            className="flex flex-col gap-4 w-full md:w-1/2 text-center md:text-left"
          >
            <h2 className="font-bold text-2xl md:text-4xl leading-tight text-white">
              Advanced Weapons
            </h2>
            <p className="text-base md:text-lg text-white">
              Our advanced weapons are built for precision, adaptability and
              performance in no-fail missions. Our arsenal maximizes combat
              effectiveness today while driving revolutionary capabilities for
              the future, delivering smarter, more survivable and effective
              weapons with speed and affordability.
            </p>
          </div>
        </div>
        <div
          className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto"
          id="aircraft"
        >
          <div className="flex flex-col gap-4 w-full md:w-1/2 text-center md:text-left">
            <h2 className="font-bold text-2xl md:text-4xl leading-tight text-white">
              Aircraft
            </h2>
            <p className="text-base md:text-lg text-white">
              We’re redefining air dominance with some of the most advanced
              aircraft in the world. From the sixth-generation B-21 Raider to
              autonomous systems to leading edge airborne sensors, our aircraft
              are engineered to win in complex environments. Through digital
              engineering and advanced manufacturing, we accelerate every stage
              of design and production to meet the demands of the modern
              battlespace.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={aircraftImg}
              alt={`Next-generation aircraft by ${companyName}`}
              className="w-full h-auto max-w-[600px] mx-auto"
              loading="lazy"
            />
          </div>
        </div>
        <div
          className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto"
          id="missile-defense"
        >
          <div className="w-full md:w-1/2">
            <img
              src={missileDefenceImg}
              alt={`Missile defense systems by ${companyName}`}
              className="w-full h-auto max-w-[600px] mx-auto"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col gap-4 w-full md:w-1/2 text-center md:text-left">
            <h2 className="font-bold text-2xl md:text-4xl leading-tight text-white">
              Missile Defense
            </h2>
            <p className="text-base md:text-lg text-white">
              Our missile defense systems lead the industry with end-to-end
              technologies, products and capabilities that defeat advanced
              threats, even before they launch. With a portfolio spanning
              advanced missile warning and tracking, reliable propulsion,
              resilient ground systems, battle management, command and control
              systems, missile interceptors, and realistic test targets, our
              systems deliver agility, speed, and accuracy at scale.
            </p>
          </div>
        </div>
        <div
          id="space"
          className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto"
        >
          <div className="flex flex-col gap-4 w-full md:w-1/2 text-center md:text-left">
            <h2 className="font-bold text-2xl md:text-4xl leading-tight text-white">
              Space
            </h2>
            <p className="text-base md:text-lg text-white">
              N and H Construction Co is a trusted partner in the space domain
              with a deep understanding of our customers’ missions. From concept
              to production, integration to launch, and sustainment to mission
              extension, we deliver across the full value chain – shaping the
              future of space through technical depth, operational insight, and
              best-in-class technology.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={spaceImg}
              alt={`Space technology solutions by ${companyName}`}
              className="w-full h-auto max-w-[600px] mx-auto"
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <section className="relative h-[70dvh] w-full">
        {/* Background Image */}
        <img
          src={possibleImg}
          alt={`Defining possible with ${companyName} technology`}
          className="absolute inset-0 h-full w-full object-cover object-center z-0"
          loading="lazy"
        />
        {/* Text Overlay - Left and Vertically Centered */}
        <div className="absolute inset-y-0 left-0 flex items-center px-6 lg:pl-28 z-20">
          <h2 className="font-semibold lg:text-5xl text-3xl text-white">
            We Define Possible
          </h2>
        </div>
      </section>
    </Layout>
  );
};

export default WhatWeDo;
