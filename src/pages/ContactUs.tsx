import { useDisclosure } from "@mantine/hooks";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet-async";
import { Modal, Text } from "@mantine/core";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [, setError] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [submitting, setSubmitting] = useState(false);
  const [, setSubmissionSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Fixed validation to correctly check message
    if (!name || !email || !subject || !message) {
      setError("Please fill in all required fields.");
      showNotification({
        title: "Error",
        message: "Please fill in all required fields.",
        color: "red",
      });
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_STRAPI_API_URL}/contact-uses`,
        {
          data: {
            Name: name,
            Email: email,
            Telephone: telephone,
            Subject: subject,
            Message: message,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
          },
        }
      );

      if (response.status === 200) {
        setSubmissionSuccess(true);
        open();
        // Reset form
        setName("");
        setEmail("");
        setTelephone("");
        setSubject("");
        setMessage("");
      }
    } catch (error) {
      setError("Failed to submit the form. Please try again.");
      showNotification({
        title: "Error",
        message: "Failed to submit the form. Please try again.",
        color: "red",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact Us | N&H Construction Co.</title>
        <meta
          name="description"
          content="Get in touch with N&H Construction Co. for inquiries, partnerships, or media requests."
        />
      </Helmet>
      <Modal centered opened={opened} onClose={close}>
        <div className="flex flex-col gap-4 text-center font-poppins items-center justify-center">
          <h1 className="text-green-600">Thank You for Your Message!</h1>
          <Text>
            Your message has been successfully submitted. We'll get back to you
            soon.
          </Text>
          <button
            onClick={close}
            className="bg-black text-white hover:bg-gray-800 py-2 rounded-md w-full"
            aria-label="Close modal"
          >
            Close
          </button>
        </div>
      </Modal>
      <section className="px-4 md:px-8 lg:px-16 py-28 max-w-5xl mx-auto min-h-[80dvh]">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Whether you’re looking for partnership opportunities, media inquiries,
          or just want to say hello — we’d love to hear from you.
        </p>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            type="text"
            placeholder="Full Name"
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="Email Address"
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            type="text"
            name="telephone"
            placeholder="Phone Number"
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            type="text"
            name="subject"
            placeholder="Subject"
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Your Message"
            name="message"
            rows={5}
            className="md:col-span-2 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black resize-none"
          ></textarea>
          <button
            type="submit"
            disabled={submitting}
            className="md:col-span-2 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:bg-gray-400"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="mt-12 text-center text-gray-600">
          Or email us directly at{" "}
          <a
            href="mailto:info@nandhconstructionco.com"
            className="underline hover:text-black"
          >
            info@nandhconstructionco.com
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default ContactUs;
