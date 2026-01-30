import DashboardSidebar from "../../components/DashboardSidebar";
import "./Services.css";
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
    
    <section className="services">
      <h2 className="services-title">Our Medical Services</h2>
      <p className="services-subtitle">
        We provide quality healthcare services with compassion and care.
      </p>

      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}