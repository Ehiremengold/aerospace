import Layout from "../components/Layout";
import { Accordion, Loader } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { AudioLines } from "lucide-react";
import type { QuarterlyReport } from "../utils/types";
import { Helmet } from "react-helmet-async";

const PreviousQuarters = () => {
  const [reportsByYear, setReportsByYear] = useState<
    Record<number, QuarterlyReport[]>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_STRAPI_API_URL
          }/quarterly-reports?sort=year:desc,quarter:desc&populate[mediaFile]=*`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
            },
            params: {
              _sort: "year:desc,quarter:desc",
            },
          }
        );
        const reports = response?.data?.data as QuarterlyReport[];
        const groupedByYear = reports.reduce((acc, report) => {
          const year = report.attributes.year;
          if (!acc[year]) acc[year] = [];
          acc[year].push(report);
          return acc;
        }, {} as Record<number, QuarterlyReport[]>);
        setReportsByYear(groupedByYear);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
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

  // Sort years in descending order explicitly
  const sortedYears = Object.keys(reportsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  const items = sortedYears.map((year) => {
    const reports = reportsByYear[year];
    const quarters = reports.reduce((acc, report) => {
      const quarter = report.attributes.quarter;
      if (!acc[quarter]) acc[quarter] = [];
      acc[quarter].push(report);
      return acc;
    }, {} as Record<string, QuarterlyReport[]>);

    return (
      <Accordion.Item className="bg-white" key={year} value={year.toString()}>
        <Accordion.Control className="">
          <div className="flex w-full">
            <h1 className="text-3xl font-bold">{year}</h1>
          </div>
        </Accordion.Control>
        <Accordion.Panel className="bg-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(quarters).map(([quarter, quarterReports]) => (
              <div
                key={quarter}
                className="p-4 border border-gray-200 rounded shadow"
              >
                <h2 className="text-xl font-semibold mb-3">{quarter}</h2>
                {quarterReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between gap-4 mb-1"
                  >
                    <a
                      href={
                        report?.attributes?.mediaFile?.data
                          ? report?.attributes?.mediaFile?.data?.attributes?.url
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors ease-in-out duration-300"
                    >
                      {report.attributes.title}
                    </a>
                    {report.attributes.typeOfContent === "PDF" ? (
                      <FaFilePdf />
                    ) : (
                      <AudioLines />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    );
  });

  return (
    <Layout showInvestorContactInfo={true}>
      <Helmet>
        <title>Investors | N&H Construction Co.</title>
        <meta
          name="description"
          content="Explore past financial performance and quarterly reports at N&H Construction Co.—a leader in aerospace, defense, and advanced technologies."
        />
        <meta
          name="keywords"
          content="N&H Construction, investor relations, past financial reports, quarterly earnings, aerospace investments, defense sector"
        />
      </Helmet>
      <section className="px-4 md:px-8 lg:px-16 py-28 max-w-7xl mx-auto min-h-screen">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Earnings Archive
          </h1>
        </div>
        <Accordion defaultValue={sortedYears[0]?.toString()}>{items}</Accordion>
      </section>
    </Layout>
  );
};

export default PreviousQuarters;
