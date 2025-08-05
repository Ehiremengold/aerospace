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
import Newsletter from "./pages/Newsletter";
import MediaCenter from "./pages/MediaCenter";
import ContactUs from "./pages/ContactUs";
import LatestQuarterlyReport from "./pages/LatestQuarterlyReport";
import PreviousQuarters from "./pages/PreviousQuarters";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/who-we-are" element={<WhoWeAre />} />
        <Route path="/what-we-do" element={<WhatWeDo />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/investors" element={<LatestQuarterlyReport />} />
        <Route
          path="/investors/previous-quarters"
          element={<PreviousQuarters />}
        />
        <Route path="/media" element={<MediaCenter />} />
        <Route path="/blog-posts" element={<BlogPosts />} />
        <Route path="/blog-post/:slug" element={<BlogDetail />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  );
};

export default App;
