import React from "react";

const About = () => {
  return (
    <div className="bg-bg-light min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl mb-6">
            About Our Hospital
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-blue-100">
            Building reliable, secure, and efficient digital systems that support
            modern healthcare delivery.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Who we are */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Who We Are
            </h2>
            <p className="text-lg text-gray-600 mb-4 font-semibold">
              A technology-driven hospital management platform.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our Hospital Management System helps healthcare institutions manage
              patients, staff, appointments, and data through a single, secure
              platform. We focus on clarity, reliability, and operational efficiency
              so medical professionals can focus on patient care.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start"><span className="text-primary mr-2">•</span> Secure and centralized patient records</li>
              <li className="flex items-start"><span className="text-primary mr-2">•</span> Efficient appointment and staff workflows</li>
              <li className="flex items-start"><span className="text-primary mr-2">•</span> Real-time operational and clinical insights</li>
              <li className="flex items-start"><span className="text-primary mr-2">•</span> Scalable architecture for growing hospitals</li>
            </ul>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To empower healthcare providers with intuitive, secure, and scalable
              digital solutions that improve efficiency and elevate patient outcomes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold text-secondary mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To become a trusted digital partner for hospitals by continuously
              improving how healthcare systems operate and scale.
            </p>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Core Values
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Patient First",
                desc: "Every decision is made with patient care as the priority.",
                color: "bg-blue-50 text-blue-700"
              },
              {
                title: "Integrity",
                desc: "We operate with transparency, security, and trust.",
                color: "bg-green-50 text-green-700"
              },
              {
                title: "Innovation",
                desc: "We continuously improve through modern technology.",
                color: "bg-purple-50 text-purple-700"
              },
              {
                title: "Excellence",
                desc: "We aim for high standards in performance and reliability.",
                color: "bg-orange-50 text-orange-700"
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                <h4 className={`text-lg font-bold mb-3 ${item.color.split(' ')[1]}`}>
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
