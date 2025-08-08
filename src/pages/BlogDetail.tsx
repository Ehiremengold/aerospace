import { NavLink, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet-async";
import { companyName, domain } from "../utils/constants";
import { useQuery } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import type { StrapiPost } from "../utils/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Loader } from "@mantine/core";
import axios from "axios";
import { memo } from "react";

const fetchPost = async (slug: string) => {
  const start = performance.now();
  const response = await axios.get<{ data: StrapiPost[] }>(
    `${
      import.meta.env.VITE_STRAPI_API_URL
    }/blog-posts?filters[slug][$eq]=${slug}&populate=coverImage&fields[0]=title&fields[1]=slug&fields[2]=excerpt&fields[3]=content&fields[4]=author&fields[5]=date`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
      },
    }
  );
  console.log(`fetchPost took ${performance.now() - start}ms`);
  return response.data.data[0] || null;
};

const MarkdownContent = memo(({ content }: { content: string }) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}
    components={{
      img: ({ src, alt }) => (
        <img
          src={src?.startsWith("http") ? src : `${import.meta.env.VITE_STRAPI_API_URL}${src}`}
          alt={alt}
          className="w-full h-auto rounded-lg shadow-md"
          width={800}
          height={600}
          loading="lazy"
        />
      ),
      table: ({ children }) => (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">{children}</table>
        </div>
      ),
      h1: ({ children }) => <h1 className="font-semibold md:text-3xl text-xl">{children}</h1>,
      h2: ({ children }) => <h2 className="text-xl font-semibold">{children}</h2>,
      h3: ({ children }) => <h3 className="font-semibold font-lg">{children}</h3>,
      p: ({ children }) => <p className="">{children}</p>,
      th: ({ children }) => <th className="border border-gray-300 p-2 bg-gray-100">{children}</th>,
      td: ({ children }) => <td className="border border-gray-300 p-2">{children}</td>,
      ul: ({ children }) => <ul className="list-disc ml-6">{children}</ul>,
      ol: ({ children }) => <ol className="list-decimal ml-6">{children}</ol>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 italic pl-4 text-gray-700 my-12">{children}</blockquote>
      ),
    }}
  >
    {content}
  </ReactMarkdown>
));

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blogPost", slug],
    queryFn: () => fetchPost(slug!),
    staleTime: 15 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  if (error) {
    showNotification({
      title: "Error",
      message: "Failed to load blog post. Please try again later.",
      color: "red",
    });
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="grid place-items-center place-content-center py-24 min-h-screen">
          <Loader size={30} color="black" />
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <p className="text-center py-12">Post not found.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{post.attributes.title} | {companyName}</title>
        <meta name="description" content={post.attributes.excerpt} />
        <meta property="og:title" content={`${post.attributes.title} | ${companyName}`} />
        <meta property="og:description" content={post.attributes.excerpt} />
        <meta property="og:image" content={post.attributes.coverImage?.data?.attributes?.url || ""} />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={`defense technology, aerospace, ${companyName}, ${post.attributes.title}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.attributes.title,
            description: post.attributes.excerpt,
            image: post.attributes.coverImage?.data?.attributes?.url || "",
            author: { "@type": "Person", name: post.attributes.author },
            datePublished: post.attributes.date,
            publisher: { "@type": "Organization", name: companyName },
            mainEntityOfPage: { "@type": "WebPage", "@id": `${domain}/blog-post/${post.attributes.slug}` },
          })}
        </script>
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 py-28 min-h-screen">
        <NavLink to="/blog-posts" className="text-primary">Back to Blog</NavLink>
        <h1 className="text-3xl font-bold mb-4">{post.attributes.title}</h1>
        <p className="text-gray-500 mb-6">{post.attributes.author} • {post.attributes.date}</p>
        <img
          src={post.attributes.coverImage?.data?.attributes?.url || ""}
          alt={`${post.attributes.title} - ${companyName} blog`}
          className="w-full h-72 object-cover rounded-lg mb-6"
          width={800}
          height={288}
          loading="lazy"
        />
        <div className="prose space-y-3 max-w-none">
          <MarkdownContent content={post.attributes.content} />
        </div>
      </div>
    </Layout>
  );
};

export default BlogDetail;