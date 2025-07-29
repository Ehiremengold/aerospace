import { motion, easeOut } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet-async";
import techInnoImg from "../assets/images/tech-innovation.jpg";
import revotionalImg from "../assets/images/revotionalizing.jpg";
import ManufactureImg from "../assets/images/gh.jpg";
import { companyName } from "../utils/constants";
import type { StrapiPost } from "../utils/types";
import { Loader } from "@mantine/core";

interface HomeProps {
  posts: StrapiPost[];
  loading: boolean;
}

const Home = ({ posts, loading }: HomeProps) => {
  
  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  // Animation for hero text
  const heroVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: easeOut,
        staggerChildren: 0.2,
      },
    },
  };

  // Animation for buttons
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeOut,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3, ease: easeOut },
    },
  };

  // Animation for logo grid
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  // Animation for story cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: easeOut,
      },
    },
    hover: {
      y: -10,
      transition: { duration: 0.3, ease: easeOut },
    },
  };

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home | {companyName}</title>
        <meta
          name="description"
          content={`Discover ${companyName}'s cutting-edge defense and aerospace solutions, pioneering next-gen infrastructure for mission-critical performance.`}
        />
        <meta property="og:title" content={`Home | ${companyName}`} />
        <meta
          property="og:description"
          content={`Explore ${companyName}'s innovative technologies in defense, aerospace, and infrastructure, shaping the future of global security.`}
        />
        <meta property="og:image" content="/assets/images/hero-image.png" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={`defense technology, aerospace engineering, next-gen infrastructure, mission-critical solutions, ${companyName}`}
        />
      </Helmet>
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: easeOut }}
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>

        <div className="absolute inset-0 bg-black/60 z-10"></div>

        <motion.div
          className="relative z-20 flex items-center justify-center min-h-screen text-white text-center px-4"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="lg:w-3/5">
            <motion.h1
              className="lg:text-5xl text-3xl font-bold mb-4"
              variants={heroVariants}
            >
              Engineering the Future of {companyName} & Defense
            </motion.h1>
            <motion.p className="lg:text-xl" variants={heroVariants}>
              From concept to combat readiness, N&H Construction Co. pioneers
              next-gen infrastructure that powers innovation, resilience, and
              mission-critical performance.
            </motion.p>
            <motion.div
              className="flex items-center gap-5 flex-wrap mt-4 justify-center"
              variants={heroVariants}
            >
              <motion.div
                className="group bg-black/60 text-white text-sm py-1 px-3 flex items-center gap-2 rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
                variants={buttonVariants}
                whileHover="hover"
              >
                <h2>Learn About Next-Gen Architecture</h2>
                <ArrowRight className="w-3 text-white group-hover:text-black transition-all duration-300 ease-in-out" />
              </motion.div>
              <motion.div
                className="group bg-black/60 text-white text-sm py-1 px-3 flex items-center gap-2 rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
                variants={buttonVariants}
                whileHover="hover"
              >
                <h3>Explore our Technology</h3>
                <ArrowRight className="w-3 text-transparent" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Trusted By Section */}
      <motion.section
        className="py-24 sm:py-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg/8 font-semibold text-gray-900">
            Trusted by the world’s most innovative teams
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            {[
              {
                src: "https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-gray-900.svg",
                alt: "Transistor logo",
              },
              {
                src: "https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-gray-900.svg",
                alt: "Reform logo",
              },
              {
                src: "https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-gray-900.svg",
                alt: "Tuple logo",
              },
              {
                src: "https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-gray-900.svg",
                alt: "SavvyCal logo",
              },
              {
                src: "https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-gray-900.svg",
                alt: "Statamic logo",
              },
            ]?.map((logo, index) => (
              <motion.img
                key={index}
                width="158"
                height="48"
                src={logo.src}
                alt={logo.alt}
                className={`col-span-2 max-h-12 w-full object-contain ${
                  index === 3 ? "sm:col-start-2" : ""
                } ${
                  index === 4 ? "col-start-2 sm:col-start-auto" : ""
                } lg:col-span-1`}
                variants={logoVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Technology and Innovation Section */}
      <motion.section
        className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 px-4 md:px-8 lg:px-16 py-12 max-w-7xl mx-auto"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          className="flex flex-col gap-4 w-full md:w-1/2 text-center md:text-left"
          variants={sectionVariants}
        >
          <h2 className="font-bold text-2xl md:text-4xl leading-tight">
            Technology and Innovation
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            For some, the word 'impossible' ends discussions. For us, it's a
            starting point.
          </p>
          <motion.div
            className="bg-black w-fit text-white text-sm py-2 px-4 flex items-center gap-2 rounded-lg cursor-pointer mx-auto md:mx-0"
            variants={buttonVariants}
            whileHover="hover"
          >
            <span>Learn About Next-Gen Architecture</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </motion.div>
        </motion.div>

        <motion.div className="w-full md:w-1/2" variants={sectionVariants}>
          <img
            src={techInnoImg}
            alt={`Innovative technology solutions at ${companyName}`}
            className="rounded-xl w-full h-auto max-w-[600px] mx-auto"
            loading="lazy"
          />
        </motion.div>
      </motion.section>

      {/* Manufacturing the Future Section */}
      <motion.section
        className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 px-4 md:px-8 lg:px-16 py-12 max-w-7xl mx-auto"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="w-full md:w-1/2" variants={sectionVariants}>
          <img
            src={ManufactureImg}
            alt={`Advanced manufacturing for defense at ${companyName}`}
            className="rounded-xl w-full h-auto max-w-[600px] mx-auto"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          className="flex flex-col gap-4 w-full md:w-1/2 text-center md:text-left"
          variants={sectionVariants}
        >
          <h2 className="font-bold text-2xl md:text-4xl leading-tight">
            Manufacturing the Future
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            Global Power Made in America. Defining possible through advanced
            manufacturing and innovation engineering
          </p>
          <motion.div
            className="bg-black w-fit text-white text-sm py-2 px-4 flex items-center gap-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out mx-auto md:mx-0"
            variants={buttonVariants}
            whileHover="hover"
          >
            <span>Explore more</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Redefining Space Technology Section */}
      <motion.section
        className="relative h-[70dvh] w-full"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <img
          src={revotionalImg}
          alt={`Redefining space technology with ${companyName}`}
          className="absolute inset-0 h-full w-full object-cover object-center z-0"
          loading="lazy"
        />
        <div className="absolute bg-black/60 inset-0 left-0 flex flex-col justify-center gap-3 items-center md:px-6 lg:pl-28 z-20">
          <motion.h2
            variants={heroVariants}
            className="font-semibold lg:text-5xl text-3xl text-white text-center"
          >
            Redefining Space Technology
          </motion.h2>
          <motion.p
            variants={heroVariants}
            className="text-white font-medium lg:text-3xl text-xl text-center"
          >
            From fortified ground bases to aerospace-grade structures, N&H
            delivers integrated defense infrastructure for today’s operations —
            and tomorrow’s possibilities.
          </motion.p>
        </div>
      </motion.section>

      {/* Blog Posts Section */}
      <motion.section
        className="w-full bg-gray-50 py-16 px-4 md:px-8"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Stories that Define Us
          </h2>
          {loading ? (
            <div className="grid place-items-center place-content-center py-24 min-h-screen">
              <Loader size={30} color="black" />
            </div>
          ) : posts?.length === 0 ? (
            <p className="text-center">No blog posts available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
              {posts?.map((post) => (
                <motion.div
                  key={post.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                >
                  <a
                    href={`/blog-post/${post.attributes.slug}`}
                    aria-label={`Read blog post: ${post.attributes.title}`}
                  >
                    <img
                      src={
                        post.attributes.coverImage?.data?.attributes?.url
                          ? `${post.attributes.coverImage.data.attributes.url}`
                          : ""
                      }
                      alt={`${post.attributes.title} - ${companyName} blog`}
                      className="w-full h-56 object-cover"
                      loading="lazy"
                    />
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-1">
                          {post.attributes.title}
                        </h3>
                        {/* <p className="text-gray-500 text-sm mb-3">
                          {post.attributes.author} • {post.attributes.date}
                        </p> */}
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                          {post.attributes.excerpt}
                        </p>
                      </div>
                      <motion.span
                        className="text-blue-600 inline-block"
                        variants={buttonVariants}
                        whileHover="hover"
                      >
                        Read more →
                      </motion.span>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          )}
          <motion.div
            className="mt-8 text-center"
            variants={buttonVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <a
              href="/blog-posts"
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
            >
              View All Blog Posts
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default Home;
