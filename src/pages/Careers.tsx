import Layout from "../components/Layout";
import careerHero from "../assets/images/career-hero.jpg";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { companyName, domain } from "../utils/constants";
import { useDisclosure } from "@mantine/hooks";
import { Loader, Modal, Text } from "@mantine/core";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import type { StrapiJob } from "../utils/types";

const Careers = () => {
  const [jobs, setJobs] = useState<StrapiJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<StrapiJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false); 
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get<{ data: StrapiJob[] }>(
          `${import.meta.env.VITE_STRAPI_API_URL}/jobs`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
            },
          }
        );
        setJobs(response.data.data);
        setSelectedJob(response.data.data[0] || null);
        setLoading(false);
      } catch (error: any) {
        const errorMessage =
          error.response?.status === 401
            ? "Unauthorized access. Please contact support."
            : "Failed to load jobs. Please try again later.";
        showNotification({
          title: "Error",
          message: errorMessage,
          color: "red",
        });
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleClose = () => {
    setName("");
    setPhone("");
    setEmail("");
    setCoverLetter("");
    setResume(null);
    setError("");
    setSubmissionSuccess(false); // Reset success state
    close();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !resume) {
      setError("Please fill in all required fields, including a resume.");
      showNotification({
        title: "Error",
        message: "Please fill in all required fields, including a resume.",
        color: "red",
      });
      return;
    }
    if (resume.type !== "application/pdf") {
      setError("Resume must be a PDF.");
      showNotification({
        title: "Error",
        message: "Resume must be a PDF.",
        color: "red",
      });
      return;
    }
    if (resume.size > 2 * 1024 * 1024) {
      setError("Resume must be under 2MB.");
      showNotification({
        title: "Error",
        message: "Resume must be under 2MB.",
        color: "red",
      });
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          name,
          email,
          phone,
          coverLetter,
          jobTitle: selectedJob?.attributes.title,
        })
      );
      formData.append("files.resume", resume);

      await axios.post(
        `${import.meta.env.VITE_STRAPI_API_URL}/applications`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
          },
        }
      );
      setSubmissionSuccess(true); // Set success state
      showNotification({
        title: "Success",
        message:
          "Application submitted successfully! We'll get back to you soon.",
        color: "green",
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.status === 401
          ? "Unauthorized access. Please contact support."
          : error.response?.data?.error?.message?.includes("resume")
          ? "A valid PDF resume is required. Please upload a PDF file."
          : error.response?.data?.error?.message ||
            "Failed to submit application. Please check your connection and try again.";
      setError(errorMessage);
      showNotification({
        title: "Error",
        message: errorMessage,
        color: "red",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <Layout>
        <div className="grid place-items-center place-content-center py-24 min-h-screen">
          <Loader size={30} color="black" />
          <Text>Loading job opportunities...</Text>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Careers | {companyName}</title>
        <meta
          name="description"
          content={`Join ${companyName} and explore career opportunities in aerospace, defense, and cybersecurity. Find jobs in Lagos, Abuja, and remote roles.`}
        />
        <meta property="og:title" content={`Careers at ${companyName}`} />
        <meta
          property="og:description"
          content={`Apply for exciting roles at ${companyName} in aerospace engineering, cybersecurity, and defense infrastructure. Start your career today.`}
        />
        <meta property="og:image" content="/assets/images/hero-image.png" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={`careers ${companyName}, aerospace jobs, defense jobs, cybersecurity careers, Nigeria jobs`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: selectedJob?.attributes.title,
            description: selectedJob?.attributes.description,
            hiringOrganization: {
              "@type": "Organization",
              name: companyName,
              sameAs: `${domain}`,
            },
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressLocality:
                  selectedJob?.attributes.location.split(", ")[0],
                addressRegion: selectedJob?.attributes.location.includes(
                  "Nigeria"
                )
                  ? "NG"
                  : null,
                addressCountry: selectedJob?.attributes.location.includes(
                  "Nigeria"
                )
                  ? "NG"
                  : "Remote",
              },
            },
            datePosted: "2025-07-27",
            employmentType: "FULL_TIME",
          })}
        </script>
      </Helmet>

      <Modal
        centered
        radius={8}
        size="lg"
        opened={opened}
        onClose={handleClose}
        className="font-poppins"
        title={
          submissionSuccess
            ? "Application Submitted"
            : `${selectedJob?.attributes.title} Application`
        }
      >
        {submissionSuccess ? (
          <div className="flex flex-col gap-4 text-center font-poppins">
            <h1 className="text-green-600">
              Thank You for Your Application!
            </h1>
            <Text>
              Your application for {selectedJob?.attributes.title} has been
              successfully submitted. We'll get back to you soon.
            </Text>
            <button
              onClick={handleClose}
              className="bg-black text-white hover:bg-gray-800 py-2 rounded-md"
              aria-label="Close modal"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border rounded px-4 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-label="Full Name"
              disabled={submitting}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="border rounded px-4 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              aria-label="Phone Number"
              disabled={submitting}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="border rounded px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email Address"
              disabled={submitting}
            />
            <textarea
              placeholder="Cover Letter (optional)"
              rows={4}
              className="border rounded px-4 py-2"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              aria-label="Cover Letter"
              disabled={submitting}
            ></textarea>
            <input
              type="file"
              accept=".pdf"
              className="border rounded px-4 py-2"
              onChange={(e) => setResume(e.target.files?.[0] || null)}
              required
              aria-label="Upload Resume (PDF, required)"
              disabled={submitting}
            />
            {error && (
              <Text color="red" size="sm" aria-live="assertive">
                {error}
              </Text>
            )}
            <button
              type="submit"
              className="bg-black text-white hover:bg-gray-800 py-2 rounded-md disabled:opacity-50 flex items-center justify-center"
              aria-label={
                submitting ? "Submitting application" : "Submit Application"
              }
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader size="sm" className="mr-2" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </form>
        )}
      </Modal>

      <section className="relative h-[70dvh] w-full">
        <img
          src={careerHero}
          alt={`Careers at ${companyName} in aerospace and defense`}
          className="absolute inset-0 h-full w-full object-cover object-bottom z-0"
          loading="lazy"
        />
        <div className="absolute left-0 top-0 h-full flex items-center px-6 lg:px-16 z-10">
          <div className="bg-black/70 text-white rounded-xl p-6 lg:w-[80%] w-full flex flex-col gap-4">
            <h1 className="font-semibold lg:text-4xl text-2xl">
              Careers at {companyName}
            </h1>
            <p className="lg:text-2xl text-lg">
              Explore careers across air, cyber, land, sea, space and
              connectivity in between.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-black w-full text-white py-5">
        <div className="w-[80%] mx-auto flex items-center gap-2">
          <NavLink to="/" className={"text-gray-400"}>
            Home
          </NavLink>
          <span>&gt; Careers</span>
        </div>
      </div>

      <section className="w-[90%] max-w-7xl mx-auto my-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        <aside className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold mb-2">
            Explore Open Roles at {companyName}
          </h2>
          {jobs?.map((job) => (
            <button
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className={`text-left px-5 py-4 rounded-xl border hover:bg-gray-100 transition ${
                selectedJob?.id === job.id
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
              aria-label={`Select ${job.attributes.title} job details`}
            >
              <h3 className="font-semibold text-lg">{job.attributes.title}</h3>
              <p className="text-sm text-gray-500">{job.attributes.location}</p>
            </button>
          ))}
        </aside>

        <article className="flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold">
              {selectedJob?.attributes.title}
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              {selectedJob?.attributes.location}
            </p>
            {/* <p className="text-gray-700 leading-relaxed">
              {selectedJob?.attributes.description}
            </p> */}
          </div>
          <button
            onClick={open}
            className="cursor-pointer inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            aria-label={`Apply for ${selectedJob?.attributes.title}`}
          >
            Apply Now
          </button>
        </article>
      </section>
    </Layout>
  );
};

export default Careers;
