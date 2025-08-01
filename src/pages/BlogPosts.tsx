import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { companyName, domain } from "../utils/constants";
import { useState } from "react";
import axios from "axios";
import type { StrapiPost } from "../utils/types";
import { motion, easeOut } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

const fetchBlogPosts = async (page: number, pageSize: number) => {
  const response = await axios.get<{
    data: StrapiPost[];
    meta: { pagination: { pageCount: number } };
  }>(
    `${
      import.meta.env.VITE_STRAPI_API_URL
    }/blog-posts?sort=createdAt:desc&populate[coverImage][fields]=url&fields[0]=title&fields[1]=slug&fields[2]=excerpt&fields[3]=author&fields[4]=date&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
      },
    }
  );
  return {
    posts: response.data.data,
    totalPages: response.data.meta.pagination.pageCount,
  };
};

const BlogPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const { data, isLoading } = useQuery({
    queryKey: ["blogPosts", currentPage],
    queryFn: () => fetchBlogPosts(currentPage, postsPerPage),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const posts = data?.posts || [];
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

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

  if (isLoading) {
    return (
      <Layout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto py-32 min-h-screen">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden h-fit"
            >
              <Skeleton height={224} width="100%" />
              <div className="p-6">
                <Skeleton height={24} width="80%" mb="sm" />
                <Skeleton height={16} width="100%" />
              </div>
            </div>
          ))}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blog | {companyName}</title>
        <meta
          name="description"
          content={`Explore the latest insights, news, and innovations from ${companyName} in defense, aerospace, and cybersecurity.`}
        />
        <meta property="og:title" content={`Blog | ${companyName}`} />
        <meta
          property="og:description"
          content={`Read about ${companyName}'s advancements in defense technology, aerospace engineering, and sustainable solutions.`}
        />
        <meta property="og:image" content="/assets/images/hero-image.png" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={`defense blog, aerospace news, cybersecurity updates, ${companyName} blog`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: posts?.map((post, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "BlogPosting",
                url: `${domain}/blog-post/${post.attributes.slug}`,
                headline: post.attributes.title,
                description: post.attributes.excerpt,
                image: post.attributes.coverImage?.data?.attributes?.url
                  ? `${post.attributes.coverImage.data.attributes.url}`
                  : "",
                author: {
                  "@type": "Person",
                  name: post.attributes.author,
                },
                datePublished: post.attributes.date,
                publisher: {
                  "@type": "Organization",
                  name: companyName,
                  logo: {
                    "@type": "ImageObject",
                    url: "/assets/images/logo.png",
                  },
                },
              },
            })),
          })}
        </script>
      </Helmet>
      <div className="max-w-6xl mx-auto px-4 py-28 min-h-screen">
        <div className="mb-8 flex flex-col gap-1 justify-center items-center text-center">
          <h1 className="lg:text-3xl text-xl font-bold">Our Space Journey</h1>
          <p className="lg:text-lg text-base">
            Read as we explore the cosmos, pushing the boundaries of innovation
            and discovery
          </p>
        </div>
        {posts?.length === 0 ? (
          <p className="text-center text-2xl">No blog posts available.</p>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2">
              {posts?.map((post) => (
                <NavLink
                  key={post.id}
                  to={`/blog-post/${post.attributes.slug}`}
                  className="bg-white rounded-xl overflow-hidden shadow-lg"
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
                  <div className="p-5">
                    <h2 className="text-xl font-semibold mb-2">
                      {post.attributes.title}
                    </h2>
                    <p className="text-gray-700">{post.attributes.excerpt}</p>
                    <span className="text-primary mt-4 inline-block">
                      Read more →
                    </span>
                  </div>
                </NavLink>
              ))}
            </div>
            <div className="mt-24 flex justify-center gap-4">
              <motion.button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-black text-white py-2 px-4 text-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                variants={buttonVariants}
                whileHover={currentPage === 1 ? undefined : "hover"}
                initial="hidden"
                animate="visible"
              >
                <ChevronLeft color="white" />
              </motion.button>
              <span className="self-center">
                Page {currentPage} of {totalPages}
              </span>
              <motion.button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-black text-white py-2 px-4 text-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                variants={buttonVariants}
                whileHover={currentPage === totalPages ? undefined : "hover"}
                initial="hidden"
                animate="visible"
              >
                <ChevronRight color="white" />
              </motion.button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default BlogPosts;
