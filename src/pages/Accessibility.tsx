import { Helmet } from "react-helmet-async";
import Layout from "../components/Layout";
import { companyName } from "../utils/constants";

const Accessibility = () => {
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Accessibility | {companyName}</title>
        <meta
          name="description"
          content={`Discover ${companyName}'s cutting-edge defense and aerospace solutions, pioneering next-gen infrastructure for mission-critical performance.`}
        />
        <meta property="og:title" content={`Accessibility | ${companyName}`} />
        <meta
          property="og:description"
          content={`Explore ${companyName}'s innovative technologies in defense, aerospace, and infrastructure, shaping the future of global security.`}
        />
        <meta property="og:image" content="/assets/images/hero-image.png" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={`defense technology, aerospace engineering, next-gen infrastructure, mission-critical solutions, ${companyName}`}
        />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 py-24 space-y-6 text-gray-800">
        <h1 className="text-3xl font-semibold">Accessibility Statement</h1>
        <p>
          N&H Construction Co. is committed to ensuring digital accessibility
          for people with disabilities. We are continually improving the user
          experience for everyone and applying the relevant accessibility
          standards.
        </p>

        <h2 className="text-xl font-semibold">1. Our Commitment</h2>
        <p>
          We strive to ensure our website is accessible according to WCAG 2.1
          guidelines and aim to make our content and experiences inclusive to
          all users.
        </p>

        <h2 className="text-xl font-semibold">
          2. Assistive Technology Support
        </h2>
        <p>
          Our site is designed to be compatible with screen readers and keyboard
          navigation. We test with various assistive technologies to identify
          and fix accessibility barriers.
        </p>

        <h2 className="text-xl font-semibold">3. Ongoing Improvements</h2>
        <p>
          Accessibility is an ongoing effort. If you encounter an issue, please
          let us know, and we will do our best to resolve it promptly.
        </p>

        <h2 className="text-xl font-semibold">4. Contact Us</h2>
        <p>
          If you experience any difficulty accessing content or require
          assistance, contact us at{" "}
          <a
            href="mailto:support@nhconstruction.com"
            className="underline text-blue-600"
          >
            support@nhconstruction.com
          </a>
          .
        </p>

        <p className="text-sm text-gray-600">Last updated: July 26, 2025</p>
      </div>
    </Layout>
  );
};

export default Accessibility;
