import Layout from "../components/Layout";
import { Helmet } from "react-helmet-async";
import video1 from "../assets/videos/video-1.mp4";
import video2 from "../assets/videos/video-2.mp4";
import video3 from "../assets/videos/video-3.mp4";
import video4 from "../assets/videos/video-4.mp4";
import video5 from "../assets/videos/video-5.mp4";
import video6 from "../assets/videos/video-6.mp4";
import video7 from "../assets/videos/video-7.mp4";
import video8 from "../assets/videos/video-8.mp4";

const videos = [
  { src: video1, title: "Engineering Innovation Showcase" },
  { src: video2, title: "Autonomous Drone Test Flight" },
  { src: video3, title: "Advanced Manufacturing Process" },
  { src: video4, title: "Mobile Aerospace Deployment" },
  { src: video5, title: "Next-Gen Facility Tour" },
  { src: video6, title: "Tactical Field Simulation" },
  { src: video7, title: "Security Operations Briefing" },
  { src: video8, title: "AI-Powered Surveillance Demo" },
];

const MediaCenter = () => {
  return (
    <Layout>
      <Helmet>
        <title>Media Center | N&H Construction Co.</title>
        <meta
          name="description"
          content="Watch videos showcasing our aerospace innovations and technologies."
        />
      </Helmet>

      <section className="px-4 md:px-8 lg:px-16 py-28 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Media Center</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our most recent video content highlighting engineering
            breakthroughs, facility tours, and field demonstrations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden shadow-lg bg-black"
            >
              <video
                src={video.src}
                controls
                className="w-full h-[250px] object-cover"
                autoPlay
                muted
                loop
                preload="metadata"
              />
              <div className="p-4 bg-white">
                <h2 className="text-md font-semibold text-gray-800">
                  {video.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default MediaCenter;
