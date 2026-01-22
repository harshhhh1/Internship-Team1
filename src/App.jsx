import React from "react";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 scroll-smooth">
      <Navbar />

      {/* HERO (dark only) */}
      <section id="home" className="relative min-h-screen flex items-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 w-full">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20">
            <p className="text-sky-300 font-semibold tracking-wide">
              SunTouch IT Company
            </p>

            <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
              Build modern websites{" "}
              <span className="text-sky-400">that grow your business</span>
            </h1>

            <p className="mt-5 max-w-2xl text-white/85 text-lg leading-relaxed">
              We create fast, responsive and professional web solutions for startups,
              shops, and enterprises.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#services"
                className="px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 transition font-semibold"
              >
                Explore Services
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-2xl border border-white/30 hover:bg-white/10 transition font-semibold"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT (white) */}
      <section id="about" className="py-24 bg-white scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">About Us</h2>
          <p className="mt-4 text-slate-600 max-w-3xl leading-relaxed">
            SunTouch IT helps businesses go digital with clean design, strong performance and reliable support.
            Our goal is simple: deliver quality work that looks premium and works perfectly on every device.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { t: "Trusted Team", d: "Friendly communication and on-time delivery." },
              { t: "Modern Tech", d: "React, Tailwind, fast and responsive UI." },
              { t: "Support", d: "After delivery support and changes available." },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg text-slate-900">{x.t}</h3>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES (light gray) */}
      <section id="services" className="py-24 bg-slate-50 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">Services</h2>
          <p className="mt-3 text-slate-600 max-w-3xl leading-relaxed">
            Everything you need to build your online presence.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: "Website Development", d: "Business, portfolio, e-commerce websites." },
              { t: "UI/UX Design", d: "Clean design with great user experience." },
              { t: "Landing Pages", d: "High-converting pages for marketing." },
              { t: "SEO Basics", d: "On-page SEO + performance optimization." },
              { t: "Maintenance", d: "Updates, fixes, content changes." },
              { t: "Hosting Setup", d: "Deploy on Netlify/Vercel and domain setup." },
            ].map((s) => (
              <div
                key={s.t}
                className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold text-slate-900">{s.t}</h3>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY (white) */}
      <section id="gallery" className="py-24 bg-white scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">Gallery</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Some example work / office / team images.
          </p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
              "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80",
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
            ].map((img) => (
              <div key={img} className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                <img
                  src={img}
                  alt="Gallery"
                  className="w-full h-40 md:h-44 object-cover hover:scale-105 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT (light gray) */}
      <section id="contact" className="py-24 bg-slate-50 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">Contact Us</h2>
          <p className="mt-3 text-slate-600 max-w-2xl leading-relaxed">
            Tell us your requirement and we’ll get back soon.
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
              <p className="text-slate-700">📧 suntouchit@example.com</p>
              <p className="mt-2 text-slate-700">📞 +91 98765 43210</p>
              <p className="mt-2 text-slate-700">📍 Chembur, Mumbai, India</p>
              <p className="mt-6 text-slate-500 text-sm">We’ll respond within 24 hours.</p>
            </div>

            <form className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
              <div className="grid gap-4">
                <input
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 outline-none focus:border-sky-600"
                  placeholder="Your Name"
                />
                <input
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 outline-none focus:border-sky-600"
                  placeholder="Email"
                />
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 outline-none focus:border-sky-600"
                  placeholder="Message"
                />
                <button
                  type="button"
                  className="px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 transition font-semibold text-white"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER (like screenshot) */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-semibold">SunTouch Technology</h3>
            <p className="mt-4 text-white/70 text-sm leading-relaxed">
              We are a forward-thinking technology company dedicated to delivering
              innovative solutions that help businesses thrive in the digital age.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="#about" className="hover:text-white">About Us</a></li>
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#gallery" className="hover:text-white">Gallery</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>Website Development</li>
              <li>UI / UX Design</li>
              <li>Landing Pages</li>
              <li>SEO Optimization</li>
              <li>Maintenance</li>
              <li>Hosting Setup</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Get In Touch</h4>
            <p className="text-white/70 text-sm">📞 +91 98765 43210</p>
            <p className="mt-2 text-white/70 text-sm">✉️ suntouchit@example.com</p>
            <p className="mt-2 text-white/70 text-sm">📍 Chembur, Mumbai, India</p>
            <p className="mt-3 text-white/50 text-xs">Mon–Fri 9am–6pm</p>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center text-white/50 text-sm">
          © {new Date().getFullYear()} SunTouch Technology. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
