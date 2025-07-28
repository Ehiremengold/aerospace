import Layout from "../components/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-24 space-y-6 text-gray-800">
        <h1 className="text-3xl font-semibold">Privacy Policy</h1>
        <p>
          N&H Construction Co. (“we,” “our,” or “us”) values your privacy. This
          Privacy Policy explains how we collect, use, and protect your
          information when you use our website and services.
        </p>

        <h2 className="text-xl font-semibold">1. Information We Collect</h2>
        <p>
          We may collect personal information such as your name, email address,
          phone number, and resume when you apply for a role or contact us
          through our site.
        </p>

        <h2 className="text-xl font-semibold">
          2. How We Use Your Information
        </h2>
        <p>
          We use the information to process applications, respond to inquiries,
          and improve our services. We do not sell or share your personal data
          with third parties without consent.
        </p>

        <h2 className="text-xl font-semibold">3. Cookies</h2>
        <p>
          We may use cookies to improve user experience and gather analytics.
          You can control cookie settings in your browser.
        </p>

        <h2 className="text-xl font-semibold">4. Data Security</h2>
        <p>
          We implement reasonable measures to protect your information from
          unauthorized access or disclosure.
        </p>

        <h2 className="text-xl font-semibold">5. Your Rights</h2>
        <p>
          You can request access to, or deletion of, your personal data by
          contacting us directly.
        </p>

        <h2 className="text-xl font-semibold">6. Changes to this Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The latest
          version will always be available on our website.
        </p>

        <p className="text-sm text-gray-600">Last updated: July 26, 2025</p>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
