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
          `${import.meta.env.VITE_STRAPI_API_URL}/api/quarterly-reports`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
            },
            params: {
              _sort: "year:desc,quarter:desc",
            },
          }
        );
        const reports = response.data.data as QuarterlyReport[];
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

  const items = Object.entries(reportsByYear).map(([year, reports]) => (
    <Accordion.Item key={year} value={year}>
      <Accordion.Control>{year}</Accordion.Control>
      <Accordion.Panel>
        {reports.map((report) => (
          <div
            key={report.id}
            className="border-b border-primary p-2 flex items-center justify-between cursor-pointer gap-4"
          >
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
                {report.attributes.title} ({report.attributes.quarter})
              </h1>
            </a>
            {report.attributes.typeOfContent === "PDF" ? (
              <FaFilePdf />
            ) : (
              <AudioLines />
            )}
          </div>
        ))}
      </Accordion.Panel>
    </Accordion.Item>
  ));

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
      <Accordion defaultValue={Object.keys(reportsByYear)[0]}>
        {items}
      </Accordion>
    </Layout>
  );
};

export default PreviousQuarters;
