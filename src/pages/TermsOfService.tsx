import Layout from "../components/Layout";

const TermsOfService = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-gray-800">
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
