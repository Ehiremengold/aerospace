import Layout from "../components/Layout";
import careerHero from "../assets/images/career-hero.webp";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { companyName } from "../constants";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";

const jobs = [
  {
    id: 1,
    title: "Aerospace Systems Engineer",
    location: "Lagos, Nigeria",
    description: `Join our mission-driven team to develop next-gen aerospace solutions. You’ll work on flight systems, propulsion, and embedded tech in highly collaborative, cross-functional teams.`,
  },
  {
    id: 2,
    title: "Defense Infrastructure Project Manager",
    location: "Remote",
    description: `Lead critical infrastructure projects from planning to deployment. Ideal for individuals with experience in defense-grade construction and agile methodologies.`,
  },
  {
    id: 3,
    title: "Cybersecurity Analyst",
    location: "Abuja, Nigeria",
    description: `Protect mission-critical systems from evolving threats. You’ll be hands-on with threat intelligence, penetration testing, and real-time incident response.`,
  },
];

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(jobs[0]);
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleClose = () => {
    setName("");
    setPhone("");
    setEmail("");
    setCoverLetter("");
    setResume(null);
    setError("");
    close();
  };

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
        <meta property="og:image" content="/assets/images/career-hero.webp" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={`careers ${companyName}, aerospace jobs, defense jobs, cybersecurity careers, Nigeria jobs`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: selectedJob.title,
            description: selectedJob.description,
            hiringOrganization: {
              "@type": "Organization",
              name: companyName,
              sameAs: "https://yourwebsite.com",
            },
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressLocality: selectedJob.location.split(", ")[0],
                addressRegion: selectedJob.location.includes("Nigeria")
                  ? "NG"
                  : null,
                addressCountry: selectedJob.location.includes("Nigeria")
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
        title={`${selectedJob.title} Application `}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!name || !email || !phone) {
              setError("Please fill in all required fields.");
              return;
            }
            if (resume && resume.type !== "application/pdf") {
              setError("Resume must be a PDF.");
              return;
            }
            if (resume && resume.size > 2 * 1024 * 1024) {
              setError("Resume must be under 2MB.");
              return;
            }
            setError("");
            alert("Application submitted successfully!");
            close();
          }}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Full Name"
            className="border rounded px-4 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            aria-label="Full Name"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="border rounded px-4 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            aria-label="Phone Number"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="border rounded px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email Address"
          />
          <textarea
            placeholder="Cover Letter (optional)"
            rows={4}
            className="border rounded px-4 py-2"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            aria-label="Cover Letter"
          ></textarea>
          <input
            type="file"
            accept=".pdf"
            className="border rounded px-4 py-2"
            onChange={(e) => setResume(e.target.files?.[0] || null)}
            aria-label="Upload Resume (PDF)"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-black text-white hover:bg-gray-800 py-2 rounded-md"
            aria-label="Submit Application"
          >
            Submit Application
          </button>
        </form>
      </Modal>

      <section className="relative h-[70dvh] w-full">
        <img
          src={careerHero}
          alt={`Careers at ${companyName} in aerospace and defense`}
          className="absolute inset-0 h-full w-full object-cover object-center z-0"
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
            Home{" "}
          </NavLink>
          <span>&gt; Careers</span>
        </div>
      </div>

      <section className="w-[90%] max-w-7xl mx-auto my-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        <aside className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold mb-2">
            Explore Open Roles at {companyName}
          </h2>
          {jobs.map((job) => (
            <button
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className={`text-left px-5 py-4 rounded-xl border hover:bg-gray-100 transition ${
                selectedJob.id === job.id
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
              aria-label={`Select ${job.title} job details`}
            >
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p className="text-sm text-gray-500">{job.location}</p>
            </button>
          ))}
        </aside>

        <article className="flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
            <p className="text-sm text-gray-500 mb-3">{selectedJob.location}</p>
            <p className="text-gray-700 leading-relaxed">
              {selectedJob.description}
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              corporis nesciunt sed nam temporibus quos modi assumenda. Id qui
              harum amet cumque quo quam aut earum delectus, quaerat ducimus
              voluptas.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              corporis nesciunt sed nam temporibus quos modi assumenda. Id qui
              harum amet cumque quo quam aut earum delectus, quaerat ducimus
              voluptas.
            </p>
          </div>
          <button
            onClick={open}
            className="cursor-pointer inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            aria-label={`Apply for ${selectedJob.title}`}
          >
            Apply Now
          </button>
        </article>
      </section>
    </Layout>
  );
};

export default Careers;
