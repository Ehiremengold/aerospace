import Layout from "../components/Layout";
import { Helmet } from "react-helmet-async";
import { FaFilePdf } from "react-icons/fa";
import { AudioLines } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import type { QuarterlyReport } from "../utils/types";
import { companyName, domain } from "../utils/constants";

const getFileUrl = (url: string | undefined) => {
  if (!url) return "#";
  return url.replace(
    "https://sincere-gem-9844525bed.media.strapiapp.com",
    "https://nandhconstructionco.com/cms"
  );
};

const fetchReports = async () => {
  const start = performance.now();
  const response = await axios.get(
    `${
      import.meta.env.VITE_STRAPI_API_URL
    }/quarterly-reports?sort=year:desc,quarter:desc&populate[mediaFile]=*&pagination[pageSize]=100`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
      },
    }
  );
  console.log(response);
  console.log(`fetchReports took ${performance.now() - start}ms`);
  const allReports = response.data.data as QuarterlyReport[];
  if (allReports.length === 0) return [];
  // Show only reports from the most recent year and quarter
  const latestYear = allReports[0].attributes.year;
  const latestQuarter = allReports[0].attributes.quarter;
  return allReports.filter(
    (r) =>
      r.attributes.year === latestYear && r.attributes.quarter === latestQuarter
  );
};

const LatestQuarterlyReport = () => {
  const [reports, setReports] = useState<QuarterlyReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedReports = localStorage.getItem("latestReports");
    if (cachedReports) {
      setReports(JSON.parse(cachedReports));
      setLoading(false);
    }
    fetchReports()
      .then((data) => {
        setReports(data);
        localStorage.setItem("latestReports", JSON.stringify(data));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="grid place-items-center place-content-center py-24 min-h-screen">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (reports.length === 0) {
    return (
      <Layout>
        <div className="grid place-items-center place-content-center py-24 min-h-screen">
          <h1 className="text-2xl font-semibold">No Report Available</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showInvestorContactInfo={true}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Investors | {companyName}</title>
        <meta name="description" content={`Access the latest quarterly financial report from ${companyName}. Stay informed on our investor relations and financial performance.`} />
        <meta property="og:title" content={`Investors | ${companyName}`} />
        <meta property="og:description" content={`View the latest quarterly report from ${companyName} and stay up to date on our financial performance.`} />
        <meta property="og:image" content="https://nandhconstructionco.com/hero-poster.png" />
        <meta property="og:url" content={`${domain}/investors`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={companyName} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Investors | ${companyName}`} />
        <meta name="twitter:description" content={`View the latest quarterly report from ${companyName} and stay up to date on our financial performance.`} />
        <meta name="twitter:image" content="https://nandhconstructionco.com/hero-poster.png" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={`investor relations, quarterly report, financial performance, ${companyName}`} />
        <link rel="canonical" href={`${domain}/investors`} />
      </Helmet>
      <section className="px-4 md:px-8 lg:px-16 py-28 max-w-7xl mx-auto min-h-screen">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Latest Quarterly Report
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-2xl">
            {reports[0].attributes.quarter} {reports[0].attributes.year}
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full md:w-3/5 mx-auto">
          {reports.map((report) => (
            <div
              key={report.id}
              className="border-b border-primary p-2 flex items-center justify-between cursor-pointer gap-4"
            >
              <a
                href={getFileUrl(
                  report.attributes.mediaFile?.data?.attributes?.url
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h1 className="hover:text-primary transition-colors ease-in-out duration-300">
                  {report.attributes.typeOfContent === "PDF"
                    ? report.attributes.title
                    : "Webcast"}
                </h1>
              </a>
              {report.attributes.typeOfContent === "PDF" ? (
                <FaFilePdf />
              ) : (
                <AudioLines />
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a href="/investors/previous-quarters">
            <span className="text-primary font-medium text-xl hover:underline transition-all ease-in-out duration-300 cursor-pointer">
              View Previous Quarters
            </span>
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default LatestQuarterlyReport;
