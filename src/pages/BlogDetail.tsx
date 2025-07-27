import { NavLink, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { blogPosts } from "../constants";
import { Helmet } from "react-helmet-async";
import { companyName } from "../constants";

const BlogDetail = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post)
    return (
      <Layout>
        <p className="text-center py-24">Post not found.</p>
      </Layout>
    );

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {post.title} | {companyName}
        </title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | ${companyName}`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.coverImage} />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={`defense technology, aerospace innovation, cybersecurity, ${companyName}, ${post.title}`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
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
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://yourwebsite.com/blog-post/${post.slug}`,
            },
          })}
        </script>
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 py-24 min-h-screen">
        <NavLink
          to="/blog-posts"
          className="text-blue-600 hover:underline my-3 inline-block"
        >
          Back to Blog
        </NavLink>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 mb-6">
          {post.author} • {post.date}
        </p>
        <img
          src={post.coverImage}
          alt={`${post.title} - ${companyName} blog`}
          className="w-full h-72 object-cover rounded-lg mb-6"
          loading="lazy"
        />
        <div
          className="prose max-w-none prose-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>
    </Layout>
  );
};

export default BlogDetail;
