import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import type { NewsLetter } from "../utils/types";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { Loader } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const Newsletter = () => {
  const [newsletter, setNewsletter] = useState<NewsLetter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsLetter = async () => {
      try {
        const url = `${
          import.meta.env.VITE_STRAPI_API_URL
        }/newsletter?populate=*`;
        console.log("Requesting URL:", url);
        const response = await axios.get<{ data: NewsLetter }>(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
          },
        });
        console.log("Response:", JSON.stringify(response.data, null, 2));
        setNewsletter(response.data.data || null);
        setLoading(false);
      } catch (error: any) {
        console.error("Error details:", error.response?.data || error.message);
        const errorMessage =
          error.response?.status === 401
            ? "Unauthorized access. Please check your API token permissions."
            : error.response?.status === 404
            ? "Newsletter not found. Please ensure it’s published in Strapi."
            : "Failed to load newsletter. Please try again later.";
        showNotification({
          title: "Error",
          message: errorMessage,
          color: "red",
        });
        setLoading(false);
      }
    };
    fetchNewsLetter();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="grid place-items-center place-content-center py-24 min-h-screen">
          <Loader size={30} color="black" />
        </div>
      </Layout>
    );
  }

  if (!newsletter) {
    return (
      <Layout>
        <p className="text-center py-12">No Newsletter Available</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-16 md:py-28 text-gray-800 space-y-10">
        <div className="my-6 flex flex-col gap-1 justify-center items-center text-center">
          <h1 className="lg:text-4xl text-2xl font-semibold">
            {newsletter.attributes.title}
          </h1>
        </div>
        <div className="prose max-w-none prose-headings:font-bold prose-headings:text-2xl md:prose-headings:text-3xl prose-ul:list-disc prose-ul:ml-6 prose-ol:list-decimal prose-ol:ml-6 prose-table:w-full prose-table:border-collapse prose-table:border prose-th:border prose-td:border prose-img:rounded-lg prose-img:shadow-md prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:text-gray-600">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              img: ({ src, alt }) => (
                <img
                  src={
                    src?.startsWith("http")
                      ? src
                      : `${import.meta.env.VITE_STRAPI_API_URL}${src}`
                  }
                  alt={alt}
                  className="w-full h-auto rounded-lg shadow-md my-4"
                />
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    {children}
                  </table>
                </div>
              ),
              h1: ({ children }) => (
                <h1 className="font-semibold text-3xl">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-semibold">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="font-semibold font-lg">{children}</h3>
              ),
              p: ({ children }) => <p className="mb-3">{children}</p>,
              th: ({ children }) => (
                <th className="border border-gray-300 p-2 bg-gray-100">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-gray-300 p-2">{children}</td>
              ),
              ul: ({ children }) => (
                <ul className="list-disc ml-6">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal ml-6">{children}</ol>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 italic pl-4 text-gray-700 my-12">
                  {children}
                </blockquote>
              ),
            }}
          >
            {newsletter.attributes.news}
          </ReactMarkdown>
        </div>
      </div>
    </Layout>
  );
};

export default Newsletter;
