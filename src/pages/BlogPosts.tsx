import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { companyName } from "../utils/constants";
import { useEffect, useState } from "react";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import type { StrapiPost } from "../utils/types";
import { motion, easeOut } from "framer-motion";

interface BlogPostsProps {
  posts: StrapiPost[];
  loading: boolean;
}

const BlogPosts = ({ posts, loading }: BlogPostsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchTotalPages = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_STRAPI_API_URL
          }/blog-posts?pagination[pageSize]=${postsPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
            },
          }
        );
        const total = response.data.meta.pagination.pageCount;
        setTotalPages(total);
      } catch (error: any) {
        showNotification({
          title: "Error",
          message:
            error.response?.status === 401
              ? "Unauthorized access. Please contact support."
              : "Failed to load pagination data. Please try again later.",
          color: "red",
        });
      }
    };
    fetchTotalPages();
  }, []);

  // const fetchPage = async (page: number) => {
  //   try {
  //     const response = await axios.get<{ data: StrapiPost[] }>(
  //       `${
  //         import.meta.env.VITE_STRAPI_API_URL
  //       }/blog-posts?sort=createdAt:desc&populate=coverImage&pagination[page]=${page}&pagination[pageSize]=${postsPerPage}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
  //         },
  //       }
  //     );
  //     return response.data.data;
  //   } catch (error: any) {
  //     showNotification({
  //       title: "Error",
  //       message:
  //         error.response?.status === 401
  //           ? "Unauthorized access. Please contact support."
  //           : "Failed to load blog posts. Please try again later.",
  //       color: "red",
  //     });
  //     return [];
  //   }
  // };

  const handlePageChange = async (page: number) => {
    if (page < 1 || page > totalPages) return;
    // setLoading(true);
    // const newPosts = await fetchPage(page);
    // setPosts(newPosts);
    setCurrentPage(page);
    // setLoading(false);
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

  if (loading)
    return (
      <Layout>
        <p className="text-center py-24 min-h-screen">Loading...</p>
      </Layout>
    );

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
        <meta property="og:image" content="/assets/images/blog-hero.jpg" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={`defense blog, aerospace news, cybersecurity updates, ${companyName} blog`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: posts.map((post, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "BlogPosting",
                url: `https://yourwebsite.com/blog-post/${post.attributes.slug}`,
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
          <p className="text-center">No blog posts available.</p>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2">
              {posts.map((post) => (
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
                    <span className="text-blue-600 mt-4 inline-block">
                      Read more →
                    </span>
                  </div>
                </NavLink>
              ))}
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <motion.button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                className="bg-black text-white py-2 px-4 rounded-lg disabled:opacity-50"
                variants={buttonVariants}
                whileHover="hover"
                initial="hidden"
                animate="visible"
              >
                Previous
              </motion.button>
              <span className="self-center">
                Page {currentPage} of {totalPages}
              </span>
              <motion.button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || loading}
                className="bg-black text-white py-2 px-4 rounded-lg disabled:opacity-50"
                variants={buttonVariants}
                whileHover="hover"
                initial="hidden"
                animate="visible"
              >
                Next
              </motion.button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default BlogPosts;
