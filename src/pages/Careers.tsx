import Layout from "../components/Layout";
import careerHero from "../assets/images/career-hero.webp";
import { NavLink } from "react-router-dom";
import { companyName } from "../constants";
import { Helmet } from "react-helmet-async";

const Careers = () => {
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Careers | {companyName}</title>
        <meta name="description" content="Concise summary of the page" />
        <meta property="og:title" content="Your Open Graph Title" />
        <meta
          property="og:description"
          content="OG description for social previews"
        />
        <meta property="og:image" content="URL to preview image" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <section className="relative h-[70dvh] w-full">
        {/* Background Image */}
        <img
          src={careerHero}
          alt="Careers"
          className="absolute inset-0 h-full w-full object-cover object-center z-0"
        />

        {/* Overlay with text */}
        <div className="absolute left-0 top-0 h-full flex items-center px-6 lg:px-16 z-10">
          <div className="bg-black/70 text-white rounded-xl p-6 lg:w-[80%] w-full flex flex-col gap-4">
            <h1 className="font-semibold lg:text-4xl text-2xl">
              Careers at {companyName}
            </h1>
            <p className="lg:text-2xl text-lg">
              Explore careers across air, cyber, land, sea, space and
              connectivity in between.
            </p>
          </div>
        </div>
      </section>
      <div className="bg-black w-full text-white py-5">
        <div className="w-[80%] mx-auto flex items-center gap-2">
          <NavLink to="/" className={"text-gray-400"}>
            Home{" "}
          </NavLink>
          <span>&gt; Careers</span>
        </div>
      </div>
    </Layout>
  );
};

export default Careers;
