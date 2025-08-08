import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { companyName, domain } from "../utils/constants";
import { useState, useEffect } from "react";
import axios from "axios";
import type { StrapiPost } from "../utils/types";
import { motion, easeOut } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@mantine/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";
import Layout from "../components/Layout";

const fetchBlogPosts = async (page: number, pageSize: number) => {
  const start = performance.now();
  const response = await axios.get<{
    data: StrapiPost[];
    meta: { pagination: { pageCount: number } };
  }>(
    `${
      import.meta.env.VITE_STRAPI_API_URL
    }/blog-posts?sort=createdAt:desc&populate[coverImage][fields]=url&fields[0]=title&fields[1]=slug&fields[2]=excerpt&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
      },
    }
  );
  console.log(`fetchBlogPosts took ${performance.now() - start}ms`);
  return {
    posts: response.data.data,
    totalPages: response.data.meta.pagination.pageCount,
  };
};

const BlogPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["blogPosts", currentPage],
    queryFn: () => fetchBlogPosts(currentPage, postsPerPage),
    staleTime: 15 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  const posts = data?.posts || [];
  const totalPages = data?.totalPages || 1;

  useEffect(() => {
    if (currentPage < totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["blogPosts", currentPage + 1],
        queryFn: () => fetchBlogPosts(currentPage + 1, postsPerPage),
      });
    }
  }, [currentPage, totalPages, queryClient]);

  const handlePageChange = debounce((page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 300);

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: easeOut } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="grid place-items-center place-content-center py-24 min-h-screen">
          <Skeleton height={400} width="100%" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blog | {companyName}</title>
        <meta name="description" content={`Explore ${companyName}'s latest insights and innovations.`} />
        <meta property="og:title" content={`Blog | ${companyName}`} />
        <meta property="og:description" content={`Read about ${companyName}'s advancements in defense and aerospace.`} />
        <meta property="og:image" content="/assets/images/hero-image.webp" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={`defense blog, aerospace news, ${companyName} blog`} />
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
                image: post.attributes.coverImage?.data?.attributes?.url || "",
                datePublished: post.attributes.date,
                publisher: { "@type": "Organization", name: companyName },
              },
            })),
          })}
        </script>
      </Helmet>
      <div className="max-w-6xl mx-auto px-4 py-28 min-h-screen">
        <div className="mb-8 flex flex-col gap-1 justify-center items-center text-center">
          <h1 className="lg:text-3xl text-xl font-bold">Our Space Journey</h1>
          <p className="lg:text-lg text-base">Explore the cosmos with {companyName}</p>
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
                    src={post.attributes.coverImage?.data?.attributes?.url || ""}
                    alt={`${post.attributes.title} - ${companyName} blog`}
                    className="w-full h-56 object-cover"
                    width={400}
                    height={224}
                    loading="lazy"
                  />
                  <div className="p-5">
                    <h2 className="text-xl font-semibold mb-2">{post.attributes.title}</h2>
                    <p className="text-gray-700">{post.attributes.excerpt}</p>
                    <span className="text-primary mt-4 inline-block">Read more →</span>
                  </div>
                </NavLink>
              ))}
            </div>
            <div className="mt-24 flex justify-center gap-4">
              <motion.button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-black text-white py-2 px-4 text-sm rounded-lg disabled:opacity-50"
                variants={buttonVariants}
                whileHover={currentPage === 1 ? undefined : "hover"}
                initial="hidden"
                animate="visible"
              >
                <ChevronLeft color="white" />
              </motion.button>
              <span className="self-center">Page {currentPage} of {totalPages}</span>
              <motion.button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-black text-white py-2 px-4 text-sm rounded-lg disabled:opacity-50"
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