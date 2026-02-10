import DashboardSidebar from "../../components/DashboardSidebar";
import {
  FaCut,
  FaMagic,
  FaSpa,
  FaGem,
  FaPaintBrush,
  FaPumpSoap,
  FaHandSparkles,
  FaSearch,
} from "react-icons/fa";

export const services = [
  {
    id: 1,
    icon: <FaCut />,
    title: "Hair Styling & Cutting",
    description:
      "Expert cuts, styling, and texturing tailored to your face shape and lifestyle.",
  },
  {
    id: 2,
    icon: <FaMagic />,
    title: "Express Facial",
    description:
      "Quick, rejuvenating facials to give your skin a healthy, radiant glow.",
  },
  {
    id: 3,
    icon: <FaSpa />,
    title: "Spa & Massage",
    description:
      "Relaxing massages and body treatments to relieve stress and tension.",
  },
  {
    id: 4,
    icon: <FaSearch />,
    title: "Skin Consultation",
    description:
      "In-depth skin analysis to recommend the best treatments and products.",
  },
  {
    id: 5,
    icon: <FaPaintBrush />,
    title: "Coloring & Highlights",
    description:
      "Professional hair coloring, balayage, and highlights using premium products.",
  },
  {
    id: 6,
    icon: <FaPumpSoap />,
    title: "Beauty Products",
    description:
      "Curated selection of high-end beauty and haircare products for home use.",
  },
  {
    id: 7,
    icon: <FaHandSparkles />,
    title: "Manicure & Pedicure",
    description:
      "Luxurious nail care services including gel polish, nail art, and spa treatments.",
  },
  {
    id: 8,
    icon: <FaGem />,
    title: "Bridal Packages",
    description:
      "Comprehensive bridal beauty packages for your special day.",
  },
];

export default function Services() {
  return (
    <section className="py-16 px-5 bg-[#f4f8fb] text-center min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-[#0b3c5d] mb-3">Our Premium Services</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
        We provide top-tier beauty and wellness services with artistry and care.
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 max-w-275 mx-auto">
        {services.map((service, index) => (
          <div
            className="bg-white p-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] flex flex-col items-center text-center group"
            key={index}
          >
            <div className="text-5xl text-primary mb-4 transition-transform duration-300 group-hover:scale-110">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-[#0b3c5d] mb-3">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}