import Layout from "../components/Layout";
import { Helmet } from "react-helmet-async";
import { FaFilePdf } from "react-icons/fa";
import { AudioLines } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import type { QuarterlyReport } from "../utils/types";
import { Loader } from "@mantine/core";

const LatestQuarterlyReport = () => {
  const [report, setReport] = useState<QuarterlyReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestReport = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_STRAPI_API_URL}/api/quarterly-reports`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
            },
            params: {
              _sort: "year:desc,quarter:desc",
              _limit: 1,
            },
          }
        );
        setReport(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching report:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestReport();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="grid place-items-center place-content-center py-24 min-h-screen">
          <Loader size={30} color="black" />
        </div>
      </Layout>
    );
  }

  if (!report) {
    return (
      <Layout>
        <div className="grid place-items-center place-content-center py-24 min-h-screen">
          <h1 className="text-2xl font-semibold">No Report Available</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Investors | N&H Construction Co.</title>
        <meta
          name="description"
          content="Discover investment insights, financial performance, and strategic growth initiatives at N&H Construction Co.—a global leader in aerospace, defense, and advanced technologies."
        />
        <meta
          name="keywords"
          content="N&H Construction, investor relations, aerospace investments, defense sector, financial reports, strategic partnerships, innovation, global security"
        />
      </Helmet>
      <section className="px-4 md:px-8 lg:px-16 py-28 max-w-7xl mx-auto min-h-screen">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Latest Quarterly Report
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-2xl">
            {report.attributes.quarter} {report.attributes.year}
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-3/5 mx-auto">
          <div className="border-b border-primary p-2 flex items-center justify-between cursor-pointer gap-4">
            <a
              href={
                report.attributes.file.data
                  ? report.attributes.file.data.attributes.url
                  : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <h1 className="hover:text-primary transition-colors ease-in-out duration-300">
                {report.attributes.title}
              </h1>
            </a>
            {report.attributes.typeOfContent === "PDF" ? (
              <FaFilePdf />
            ) : (
              <AudioLines />
            )}
          </div>
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
