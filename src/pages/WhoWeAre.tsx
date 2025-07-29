import Layout from "../components/Layout";
import wwaHero from "../assets/images/wwa.webp";
import { NavLink, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import peopleImg from "../assets/images/people.jpg";
import { Helmet } from "react-helmet-async";
import { companyName } from "../utils/constants";
import ceoImg from "../assets/images/ceo.jpg";
import { useEffect } from "react";

const WhoWeAre = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#leadership") {
      const element = document.getElementById("leadership");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]); //
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Who We Are | {companyName}</title>
        <meta
          name="description"
          content={`Learn about ${companyName}, a global leader in defense, aerospace, and cybersecurity, solving complex challenges for the U.S. and its allies.`}
        />
        <meta property="og:title" content={`Who We Are | ${companyName}`} />
        <meta
          property="og:description"
          content={`Discover how ${companyName} pioneers technologies in space, aeronautics, and defense to protect and advance global security.`}
        />
        <meta property="og:image" content="/assets/images/wwa.webp" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={`about ${companyName}, defense company, aerospace technology, cybersecurity solutions`}
        />
      </Helmet>
      <section className="relative h-[70dvh] w-full">
        {/* Background Image */}
        <img
          src={wwaHero}
          alt={`About ${companyName} - Global defense and aerospace leader`}
          className="absolute inset-0 h-full w-full object-cover object-center z-0"
        />

        {/* Overlay with text */}
        <div className="absolute left-0 top-0 h-full flex items-center px-6 lg:px-16 z-10">
          <div className="bg-black/70 text-white rounded-xl p-6 lg:w-[40%] w-full flex flex-col gap-4">
            <h1 className="font-semibold lg:text-4xl text-2xl">Who We Are</h1>
            <p className="lg:text-2xl text-lg">
              We pioneer technologies at the edge of every frontier to connect,
              advance and protect the U.S. and its allies.
            </p>
          </div>
        </div>
      </section>
      <div className="bg-black w-full text-white py-5">
        <div className="w-[80%] mx-auto flex items-center gap-2">
          <NavLink to="/" className={"text-gray-400"}>
            Home{" "}
          </NavLink>
          <span>&gt; Who We Are</span>
        </div>
      </div>
      <section className="flex flex-col px-4 md:px-8 lg:px-16 pb-6 pt-12 max-w-7xl mx-auto gap-4">
        <h2 className="font-bold text-2xl md:text-4xl leading-tight">
          We solve the toughest problems
        </h2>
        <p>
          {companyName} solves the toughest problems in space, aeronautics,
          defense and cyberspace to meet the ever evolving needs of our
          customers worldwide. Our 100,000 employees are Defining Possible every
          day using science, technology and engineering to create and deliver
          advanced systems, products and services.
        </p>
      </section>
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 px-4 md:px-8 lg:px-16 pt-6 pb-12 max-w-7xl mx-auto">
        <div className="w-full md:w-1/2">
          <img
            src={peopleImg}
            alt={`Team at ${companyName} working on defense solutions`}
            className="rounded-xl w-full h-auto max-w-[600px] mx-auto"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col gap-4 w-full md:w-1/2 text-center md:text-left">
          <h2 className="font-bold text-2xl md:text-4xl leading-tight">
            About Us
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            {companyName} is a global , defense and security company. The
            majority of our business is with the U.S. government, principally
            the Department of Defense and intelligence community. In addition,
            we deliver solutions to global and commercial customers.
          </p>
          <p>
            {companyName} 2980 Fairview Park Drive Falls Church, VA 22042 Phone:
            703-280-2900
          </p>
          <div className="bg-black w-fit text-white text-sm py-2 px-4 flex items-center gap-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out mx-auto md:mx-0">
            <a href="mailto:contact@yourwebsite.com">Contact us</a>
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </section>
      <section className="py-16 px-4 md:px-8 lg:px-16" id="leadership">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row gap-10 items-start">
          {/* CEO Bio */}
          <div className="w-full md:w-2/3 space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold leading-tight text-gray-900">
              Noah Kahale
            </h2>
            <p className="text-gray-600 font-medium">
              B.Eng Aerospace Engineering <br />
              CEO, Managing Director — N&H Construction Co.
            </p>

            <div className="space-y-4 text-gray-700 leading-relaxed text-base">
              <p>
                Noah signed and managed production processes for a
                state-of-the-art <strong>155 mm artillery facility</strong>{" "}
                producing tens of thousands of rounds annually. This capability
                significantly bolsters artillery readiness, supports rapid
                response to emerging threats, and reinforces allied defense
                postures.
              </p>
              <p>
                <strong>B-21 Raider Stealth Bomber and Space Systems</strong>
                <br />
                Contributed to the B-21 Raider program, a next-generation
                stealth intercontinental bomber that combines low observable
                design with open-architecture systems. The Raider’s ability to
                deliver both conventional and nuclear payloads deep into
                contested airspace underpins strategic deterrence and future
                force projection.
              </p>
              <p>
                <strong>F-15EX Eagle II and Satellite Systems</strong>
                <br />
                Supported integration of advanced avionics, digital fly-by-wire
                controls, and expanded weapons carriage on the F-15EX Eagle II,
                enhancing air superiority and complementing stealth platforms.
                He also advised on secure satellite communication links that
                provide real-time intelligence, border monitoring, and resilient
                data exchange for counter-terrorism missions.
              </p>
              <p>
                Noah’s unique blend of deep technical expertise, global program
                leadership, and entrepreneurial drive positions him at the
                forefront of aerospace innovation—delivering secure,
                mission-critical solutions that safeguard national interests and
                enable tomorrow’s defense capabilities.
              </p>
            </div>
          </div>

          {/* CEO Image */}
          <div className="w-full md:w-1/3">
            <img
              src={ceoImg}
              alt="Noah Kahale — CEO of N&H Construction Co."
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WhoWeAre;
