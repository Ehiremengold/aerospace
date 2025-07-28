import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WhoWeAre from "./pages/WhoWeAre";
import WhatWeDo from "./pages/WhatWeDo";
import Careers from "./pages/Careers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Accessibility from "./pages/Accessibility";
import BlogPosts from "./pages/BlogPosts";
import BlogDetail from "./pages/BlogDetail";
import { useEffect, useState } from "react";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import type { StrapiPost } from "./utils/types";

const App = () => {
  const [posts, setPosts] = useState<StrapiPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<{ data: StrapiPost[] }>(
          `${
            import.meta.env.VITE_STRAPI_API_URL
          }/blog-posts?sort=createdAt:desc&populate=coverImage`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
            },
          }
        );
        setPosts(response.data.data);
        setLoading(false);
      } catch (error: any) {
        showNotification({
          title: "Error",
          message:
            error.response?.status === 401
              ? "Unauthorized access. Please contact support."
              : "Failed to load blog posts. Please try again later.",
          color: "red",
        });
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home posts={posts?.slice(0, 3)} loading={loading} />} />
        <Route path="/who-we-are" element={<WhoWeAre />} />
        <Route path="/what-we-do" element={<WhatWeDo />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/blog-posts" element={<BlogPosts posts={posts} loading={loading} />} />
        <Route path="/blog-post/:slug" element={<BlogDetail />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/accessibility" element={<Accessibility />} />
      </Routes>
    </Router>
  );
};

export default App;