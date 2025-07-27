import Layout from "../components/Layout";
import { blogPosts } from "../constants";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { companyName } from "../constants";

const BlogPosts = () => {
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
            itemListElement: blogPosts.map((post, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "BlogPosting",
                url: `https://yourwebsite.com/blog-post/${post.slug}`,
                headline: post.title,
                description: post.excerpt,
                image: post.coverImage,
                author: {
                  "@type": "Person",
                  name: post.author,
                },
                datePublished: post.date,
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
      <div className="max-w-6xl mx-auto px-4 py-24 min-h-screen">
        <div className="flex flex-col gap-1 justify-center items-center mb-8">
          <h1 className="text-3xl font-bold text-center">Our Space Journey</h1>
          <p className="text-center">
            Join us as we explore the cosmos, pushing the boundaries of
            innovation and discovery
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {blogPosts.map((post) => (
            <NavLink
              key={post.id}
              to={`/blog-post/${post.slug}`}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-lg transition"
              aria-label={`Read blog post: ${post.title}`}
            >
              <img
                src={post.coverImage}
                alt={`${post.title} - ${companyName} blog`}
                className="w-full h-56 object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-500 text-sm mb-3">
                  {post.author} • {post.date}
                </p>
                <p className="text-gray-700">{post.excerpt}</p>
                <span className="text-blue-600 mt-4 inline-block">
                  Read more →
                </span>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPosts;
