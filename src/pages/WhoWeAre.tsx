import Layout from "../components/Layout";
import wwaHero from "../assets/images/wwa.webp";
import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import peopleImg from "../assets/images/people.jpg";
import { Helmet } from "react-helmet-async";
import { companyName } from "../constants";

const WhoWeAre = () => {
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
      <section className="flex flex-col px-4 md:px-8 lg:px-16 py-12 max-w-7xl mx-auto gap-4">
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
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 px-4 md:px-8 lg:px-16 py-12 max-w-7xl mx-auto">
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
    </Layout>
  );
};

export default WhoWeAre;