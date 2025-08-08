import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { StrapiPost } from "../utils/types";
import { Skeleton } from "@mantine/core";
import { memo } from "react";

interface BlogSectionProps {
  posts: StrapiPost[] | undefined;
  isLoading: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { y: -5, transition: { duration: 0.2 } },
};

const BlogSection = memo(({ posts, isLoading }: BlogSectionProps) => {
  return (
    <motion.section
      className="w-full bg-gray-50 py-16 px-4 md:px-8"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Stories that Define Us</h2>
        {isLoading ? (
          <Skeleton height={400} width="100%" />
        ) : !posts || posts.length === 0 ? (
          <p className="text-center">No blog posts available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {posts.slice(0, 3).map((post: StrapiPost) => (
              <motion.div
                key={post.id}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
              >
                <a href={`/blog-post/${post.attributes.slug}`} aria-label={`Read blog post: ${post.attributes.title}`}>
                  <img
                    src={post.attributes.coverImage?.data?.attributes?.url || ""}
                    alt={`${post.attributes.title} - blog`}
                    className="w-full h-56 object-cover"
                    width={400}
                    height={224}
                    loading="lazy"
                  />
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-1">{post.attributes.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.attributes.excerpt}</p>
                    </div>
                    <motion.span className="text-primary inline-block" variants={cardVariants} whileHover="hover">
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
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.4 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <a href="/blog-posts" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
            View All Blog Posts
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
});

export default BlogSection;