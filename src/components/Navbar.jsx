import React, { useEffect, useState } from "react";

const NAV_HEIGHT = 64;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // optional: prevent background scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.pageYOffset - NAV_HEIGHT;
    window.scrollTo({ top: y, behavior: "smooth" });
    setOpen(false);
  };

  const headerClass = scrolled
    ? "bg-slate-950/85 backdrop-blur border-b border-white/10 shadow-sm"
    : "bg-transparent";

  const linkClass = scrolled
    ? "text-sm font-medium text-white/80 hover:text-white transition"
    : "text-sm font-medium text-white/90 hover:text-white transition";

  const brandClass = scrolled ? "text-white" : "text-white";

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerClass}`}>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <button onClick={() => scrollToSection("home")} className={`font-semibold tracking-wide ${brandClass}`}>
          SunTouch<span className="text-sky-400">IT</span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection("about")} className={linkClass}>About</button>
          <button onClick={() => scrollToSection("services")} className={linkClass}>Services</button>
          <button onClick={() => scrollToSection("gallery")} className={linkClass}>Gallery</button>
          <button onClick={() => scrollToSection("contact")} className={linkClass}>Contact</button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToSection("contact")}
            className="hidden sm:inline-flex text-sm font-semibold px-4 py-2 rounded-xl bg-sky-600 text-white hover:bg-sky-500 transition"
          >
            Get Quote
          </button>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className={`md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border transition ${
              scrolled
                ? "border-white/15 text-white hover:bg-white/10"
                : "border-white/30 text-white hover:bg-white/10"
            }`}
            aria-label="Open menu"
          >
            {open ? <span className="text-xl">✕</span> : <span className="text-xl">☰</span>}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-80" : "max-h-0"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-4">
          <div className="rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur shadow-sm p-3 flex flex-col gap-2">
            <button onClick={() => scrollToSection("about")} className="text-left px-3 py-2 rounded-xl hover:bg-white/10 text-white/85">
              About
            </button>
            <button onClick={() => scrollToSection("services")} className="text-left px-3 py-2 rounded-xl hover:bg-white/10 text-white/85">
              Services
            </button>
            <button onClick={() => scrollToSection("gallery")} className="text-left px-3 py-2 rounded-xl hover:bg-white/10 text-white/85">
              Gallery
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-left px-3 py-2 rounded-xl hover:bg-white/10 text-white/85">
              Contact
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="mt-2 text-sm font-semibold px-4 py-2 rounded-xl bg-sky-600 text-white hover:bg-sky-500 transition"
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
