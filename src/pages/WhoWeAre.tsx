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
            {companyName} is a global defense and security company committed to
            safeguarding national interests and enabling mission success around
            the world. While the majority of our work is conducted in
            partnership with the U.S. government primarily the Department of
            Defense and the intelligence community we proudly extend our
            services to allied governments, global institutions, and commercial
            clients.
          </p>

          <p>
            Address: 11, Commercial Bay Tower Level 17/19 Customs Street West,
            Auckland 1010, New Zealand
          </p>
          <p>Phone: +64 27 317 4986, +61 493 209 737</p>

          <div className="bg-black w-fit text-white text-sm py-2 px-4 flex items-center gap-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out mx-auto md:mx-0">
            <a href="mailto:contact@yourwebsite.com">Contact us</a>
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </section>
      <section className="py-16 px-4 md:px-8 lg:px-16" id="leadership">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row gap-10 items-start">
          <div className="w-full md:w-2/3 space-y-6">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold leading-tight text-gray-900">
                Noah Kahale
              </h2>
              <p className="text-gray-600 font-medium">
                B.Eng Aerospace Engineering <br />
                CEO, Managing Director — N&H Construction Co.
              </p>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed text-base">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Education and Qualifications
                </h3>
                <p>
                  Noah holds a{" "}
                  <strong>
                    Bachelor of Engineering in Aerospace Engineering
                  </strong>{" "}
                  from the University of Technology Hawaii. He has also earned
                  specialized diplomas in{" "}
                  <strong>Radar System Design and Building</strong>,{" "}
                  <strong>Radar Security Management</strong>,{" "}
                  <strong>Risk Management in Engineering</strong>, and{" "}
                  <strong>Operational Analysis</strong>.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Professional Experience
                </h3>
                <p>
                  With over 30 years in the aerospace defense industry, Noah
                  spent more than two decades as an{" "}
                  <strong>Aerospace Engineer at N and H Construction Co</strong>
                  , contributing to cutting-edge radar and security systems.
                  Five years ago, he founded{" "}
                  <strong>N&H Construction Co.</strong>, a consultancy
                  delivering tailored aerospace and defense solutions worldwide.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Regional and Global Focus
                </h3>
                <p>
                  Originally based in New Zealand, Noah set strategic goals for
                  his firm before relocating to Australia to advance his career.
                  He now plays a pivotal role in the{" "}
                  <strong>Australian aerospace defense sector</strong>,
                  leveraging international trade incentives as Australia emerges
                  as the second-largest business jet market in the Asia-Pacific
                  region.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Key Projects
                </h3>
                <ul className="space-y-3 list-disc ml-6 mt-2">
                  <li>
                    <strong>
                      NASA Collaborations, NORAD, The Aerospace Corporation
                    </strong>
                    <br />
                    Provided engineering expertise to flagship programs across
                    civil and defense space agencies.
                  </li>
                  <li>
                    <strong>Project 621B</strong>
                    <br />
                    Contributed to foundational work on space-based navigation,
                    pioneering pseudorandom noise signals and multilateration
                    techniques that informed the development of the modern{" "}
                    <strong>Global Positioning System (GPS)</strong>, enhancing
                    precision navigation for missile guidance, troop movements,
                    and counter-terrorism operations.
                  </li>
                  <li>
                    <strong>155 mm Artillery Ammunition Facility</strong>
                    <br />
                    Designed and managed production processes for a
                    state-of-the-art facility producing tens of thousands of
                    rounds annually, bolstering artillery readiness and
                    supporting rapid response to emerging threats.
                  </li>
                  <li>
                    <strong>
                      B-21 Raider Stealth Bomber and Space Systems
                    </strong>
                    <br />
                    Contributed to the B-21 Raider program, a next-generation
                    stealth intercontinental bomber combining low observable
                    design with open-architecture systems, enabling strategic
                    deterrence and future force projection.
                  </li>
                  <li>
                    <strong>F-15EX Eagle II and Satellite Systems</strong>
                    <br />
                    Supported integration of advanced avionics, digital
                    fly-by-wire controls, and expanded weapons carriage on the
                    F-15EX Eagle II, enhancing air superiority. Advised on
                    secure satellite communication links for real-time
                    intelligence, border monitoring, and resilient data exchange
                    for counter-terrorism missions.
                  </li>
                </ul>
              </div>

              <p className="font-semibold">
                Noah’s unique blend of deep technical expertise, global program
                leadership, and entrepreneurial drive positions him at the
                forefront of aerospace innovation—delivering secure,
                mission-critical solutions that safeguard national interests and
                enable tomorrow’s defense capabilities.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/3">
            <img
              src={ceoImg}
              alt="Noah Kahale — CEO of N&H Construction Co."
              className="w-full h-auto object-cover rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WhoWeAre;
