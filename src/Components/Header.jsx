import hero from "../assets/hero.jpg";
import "./Header.css";

export default function Header() {
  return (
    <header className="hero">
      <div className="hero-container">
        <div className="hero-text">
          <h1>Build Something Amazing</h1>
          <p>
            A modern responsive website built with React & Vite.  
            Clean UI, fast performance, and scalable architecture.
          </p>
          <button>Get Started</button>
        </div>

        <div className="hero-image">
          <img src={hero} alt="Hero" />
        </div>
      </div>
    </header>
  );
}

