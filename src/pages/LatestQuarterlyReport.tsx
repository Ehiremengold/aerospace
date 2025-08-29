import Layout from "../components/Layout";
import { Helmet } from "react-helmet-async";
import { FaFilePdf } from "react-icons/fa";
import { AudioLines } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import type { QuarterlyReport } from "../utils/types";

const getFileUrl = (url: string | undefined) => {
  if (!url) return "#";
  return url.replace(
    "https://sincere-gem-9844525bed.media.strapiapp.com/api/",
    "https://nandhconstructionco.com/cms"
  );
};

const fetchReports = async () => {
  const start = performance.now();
  const response = await axios.get(
    `${
      import.meta.env.VITE_STRAPI_API_URL
    }/quarterly-reports?filters[year][$eq]=${new Date().getFullYear()}&sort=quarter:desc&populate[mediaFile]=*`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
      },
    }
  );
  console.log(response);
  console.log(`fetchReports took ${performance.now() - start}ms`);
  return response.data.data as QuarterlyReport[];
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
        <title>Investors | N&H Construction Co.</title>
        <meta
          name="description"
          content="Discover investment insights at N&H Construction Co."
        />
        <meta
          name="keywords"
          content="N&H Construction, investor relations, financial reports"
        />
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
