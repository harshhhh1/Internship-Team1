import DashboardSidebar from "../../components/DashboardSidebar";
import {
  FaUserMd,
  FaAmbulance,
  FaBed,
  FaXRay,
  FaSyringe,
  FaPills,
  FaWalking,
  FaHeartbeat,
} from "react-icons/fa";

const services = [
  {
    icon: <FaUserMd />,
    title: "Outpatient Care",
    description:
      "Consultations, diagnosis, and follow-up care without hospital admission.",
  },
  {
    icon: <FaAmbulance />,
    title: "Emergency Services",
    description:
      "24/7 emergency care with rapid response teams and modern equipment.",
  },
  {
    icon: <FaBed />,
    title: "Inpatient Services",
    description:
      "Comfortable rooms with round-the-clock nursing and medical support.",
  },
  {
    icon: <FaXRay />,
    title: "Diagnostics & Imaging",
    description:
      "Advanced lab tests, X-rays, CT scans, MRI, and ultrasound services.",
  },
  {
    icon: <FaSyringe />,
    title: "Surgical Services",
    description:
      "State-of-the-art operation theatres with experienced surgeons.",
  },
  {
    icon: <FaPills />,
    title: "Pharmacy",
    description:
      "In-house pharmacy providing genuine medicines and expert guidance.",
  },
  {
    icon: <FaWalking />,
    title: "Physiotherapy & Rehabilitation",
    description:
      "Personalized rehabilitation programs to help patients regain mobility and strength.",
  },
  {
    icon: <FaHeartbeat />,
    title: "Preventive Health Checkups",
    description:
      "Comprehensive health packages for early detection and disease prevention.",
  },
];

export default function Services() {
  return (
    <section className="py-16 px-5 bg-[#f4f8fb] text-center min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-[#0b3c5d] mb-3">Our Medical Services</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
        We provide quality healthcare services with compassion and care.
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