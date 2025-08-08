import { motion } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet-async";
import techInnoImg from "../assets/images/tech-innovation.jpg";
import revotionalImg from "../assets/images/revotionalizing.jpg";
import ManufactureImg from "../assets/images/gh.jpg";
import { companyName } from "../utils/constants";
import type { StrapiPost } from "../utils/types";
import { Skeleton } from "@mantine/core";
import axios from "axios";
import { lazy, Suspense } from "react";

// Lazy load BlogSection
const BlogSection = lazy(() => import("../components/BlogSection"));

const fetchPosts = async () => {
  const start = performance.now();
  const response = await axios.get<{ data: StrapiPost[] }>(
    `${
      import.meta.env.VITE_STRAPI_API_URL
    }/blog-posts?sort=createdAt:desc&populate[coverImage][fields]=url&fields[0]=title&fields[1]=slug&fields[2]=excerpt&pagination[pageSize]=3&pagination[page]=1`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
      },
    }
  );
  console.log(`fetchPosts took ${performance.now() - start}ms`);
  return response.data.data;
};

const Home = () => {
  const queryClient = useQueryClient();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["homePosts"],
    queryFn: fetchPosts,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });

  // Prefetch next page of blog posts
  const prefetchNextPage = async () => {
    await queryClient.prefetchQuery({
      queryKey: ["blogPosts", 2],
      queryFn: () =>
        axios
          .get(
            `${
              import.meta.env.VITE_STRAPI_API_URL
            }/blog-posts?sort=createdAt:desc&populate[coverImage][fields]=url&fields[0]=title&fields[1]=slug&fields[2]=excerpt&pagination[pageSize]=6&pagination[page]=2`,
            {
              headers: {
                Authorization: `Bearer ${
                  import.meta.env.VITE_STRAPI_API_TOKEN
                }`,
              },
            }
          )
          .then((res) => res.data.data),
    });
  };

  // Simplified animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home | {companyName}</title>
        <meta
          name="description"
          content={`Discover ${companyName}'s cutting-edge defense and aerospace solutions.`}
        />
        <meta property="og:title" content={`Home | ${companyName}`} />
        <meta
          property="og:description"
          content={`Explore ${companyName}'s innovative technologies in defense and aerospace.`}
        />
        <meta property="og:image" content="/assets/images/hero-image.webp" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={`defense technology, aerospace engineering, ${companyName}`}
        />
      </Helmet>
      <section className="relative min-h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full object-cover z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {isMobile ? (
            <img
              src="/hero-poster.webp"
              alt="Hero background"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              loading="eager"
            />
          ) : (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/hero.mp4" type="video/mp4" />
            </video>
          )}
        </motion.div>
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
              From concept to combat readiness, {companyName} pioneers next-gen
              infrastructure.
            </motion.p>
            <motion.div
              className="flex items-center gap-5 flex-wrap mt-4 justify-center"
              variants={heroVariants}
            >
              <motion.div
                className="group bg-black/60 text-white text-sm py-1 px-3 flex items-center gap-2 rounded-lg cursor-pointer hover:bg-white hover:text-black"
                variants={buttonVariants}
                whileHover="hover"
                onMouseEnter={prefetchNextPage} // Prefetch blog posts
              >
                <h2>Learn About Next-Gen Architecture</h2>
                <ArrowRight className="w-3 text-white group-hover:text-black" />
              </motion.div>
              <motion.div
                className="group bg-black/60 text-white text-sm py-1 px-3 flex items-center gap-2 rounded-lg cursor-pointer hover:bg-white hover:text-black"
                variants={buttonVariants}
                whileHover="hover"
              >
                <a href="/media">
                  <h3>Explore our Technology</h3>
                </a>
                <ArrowRight className="w-3 text-transparent" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>
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
                // variants={logoVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </motion.section>
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
            For us, 'impossible' is a starting point.
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
            width={600}
            height={400}
            loading="lazy"
          />
        </motion.div>
      </motion.section>
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
            width={600}
            height={400}
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
            Global Power Made in America.
          </p>
          <motion.div
            className="bg-black w-fit text-white text-sm py-2 px-4 flex items-center gap-2 rounded-lg cursor-pointer mx-auto md:mx-0"
            variants={buttonVariants}
            whileHover="hover"
          >
            <a href="/media" className="flex items-center gap-2">
              <span>Explore more</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </a>
          </motion.div>
        </motion.div>
      </motion.section>
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
          width={1920}
          height={1080}
          loading="lazy"
        />
        <div className="absolute bg-black/60 inset-0 flex flex-col justify-center gap-3 items-center md:px-6 lg:pl-28 z-20">
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
            {companyName} delivers integrated defense infrastructure for today’s
            operations.
          </motion.p>
        </div>
      </motion.section>
      <Suspense fallback={<Skeleton height={400} width="100%" />}>
        <BlogSection posts={posts} isLoading={isLoading} />
      </Suspense>
    </Layout>
  );
};

export default Home;
