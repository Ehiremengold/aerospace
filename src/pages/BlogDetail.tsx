import { NavLink, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet-async";
import { companyName, domain } from "../utils/constants";
import { useEffect, useState } from "react";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import type { StrapiPost } from "../utils/types";
import { Loader } from "@mantine/core";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<StrapiPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get<{ data: StrapiPost[] }>(
          `${
            import.meta.env.VITE_STRAPI_API_URL
          }/blog-posts?filters[slug][$eq]=${slug}&populate=coverImage`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
            },
          }
        );
        if (response?.data?.data?.length === 0) {
          setPost(null);
        } else {
          setPost(response?.data?.data[0]);
        }
        setLoading(false);
      } catch (error: any) {
        const errorMessage =
          error.response?.status === 401
            ? "Unauthorized access. Please contact support."
            : "Failed to load blog post. Please try again later.";
        showNotification({
          title: "Error",
          message: errorMessage,
          color: "red",
        });
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading)
    return (
      <Layout>
        <div className="grid place-items-center place-content-center py-24 min-h-screen">
          <Loader size={30} color="black" />
        </div>
      </Layout>
    );
  if (!post)
    return (
      <Layout>
        <p className="text-center py-12">Post not found.</p>
      </Layout>
    );

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {post.attributes.title} | {companyName}
        </title>
        <meta name="description" content={post.attributes.excerpt} />
        <meta
          property="og:title"
          content={`${post.attributes.title} | ${companyName}`}
        />
        <meta property="og:description" content={post.attributes.excerpt} />
        <meta
          property="og:image"
          content={
            post.attributes.coverImage?.data?.attributes?.url
              ? `${post.attributes.coverImage.data.attributes.url}`
              : ""
          }
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={`defense technology, aerospace innovation, cybersecurity, ${companyName}, ${post.attributes.title}`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
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
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${domain}/blog-post/${post.attributes.slug}`,
            },
          })}
        </script>
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 py-28 min-h-screen">
        <NavLink to="/blog-posts" className="text-blue-600">
          Back to Blog
        </NavLink>
        <h1 className="text-3xl font-bold mb-4">{post.attributes.title}</h1>
        <p className="text-gray-500 mb-6">
          {post.attributes.author} • {post.attributes.date}
        </p>
        <img
          src={
            post.attributes.coverImage?.data?.attributes?.url
              ? `${post.attributes.coverImage.data.attributes.url}`
              : ""
          }
          alt={`${post.attributes.title} - ${companyName} blog`}
          className="w-full h-72 object-cover rounded-lg mb-6"
          loading="lazy"
        />
        <div
          className="prose max-w-none prose-lg"
          dangerouslySetInnerHTML={{ __html: post.attributes.content }}
        ></div>
      </div>
    </Layout>
  );
};

export default BlogDetail;
