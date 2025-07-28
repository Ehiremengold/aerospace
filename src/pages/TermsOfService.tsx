import { Helmet } from "react-helmet-async";
import Layout from "../components/Layout";
import { companyName } from "../utils/constants";

const TermsOfService = () => {
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Terms of Service | {companyName}</title>
        <meta
          name="description"
          content={`Discover ${companyName}'s cutting-edge defense and aerospace solutions, pioneering next-gen infrastructure for mission-critical performance.`}
        />
        <meta
          property="og:title"
          content={`Terms of Service | ${companyName}`}
        />
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
        <h1 className="text-3xl font-semibold">Terms of Service</h1>
        <p>
          By accessing or using the N&H Construction Co. website, you agree to
          be bound by these Terms of Service. If you do not agree, please do not
          use our site.
        </p>

        <h2 className="text-xl font-semibold">1. Use of Our Services</h2>
        <p>
          You agree to use the site lawfully and not misuse any feature or
          information available. Unauthorized use may result in termination of
          access.
        </p>

        <h2 className="text-xl font-semibold">2. Intellectual Property</h2>
        <p>
          All content on this site, including logos, designs, and text, is the
          property of N&H Construction Co. and may not be used without
          permission.
        </p>

        <h2 className="text-xl font-semibold">3. Career Submissions</h2>
        <p>
          Information submitted for career opportunities must be accurate. We
          may retain submitted documents for internal hiring purposes.
        </p>

        <h2 className="text-xl font-semibold">4. Limitation of Liability</h2>
        <p>
          We are not liable for damages or losses arising from your use of the
          site or any linked external resources.
        </p>

        <h2 className="text-xl font-semibold">5. Modifications</h2>
        <p>
          We may update these terms periodically. Continued use of the site
          constitutes acceptance of any revised terms.
        </p>

        <p className="text-sm text-gray-600">Last updated: July 26, 2025</p>
      </div>
    </Layout>
  );
};

export default TermsOfService;
