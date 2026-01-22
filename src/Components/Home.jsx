import Header from "./Header";
import "./Home.css";
import img1 from "../assets/card1.jpg";
import img2 from "../assets/card2.jpg";

export default function Home() {
  return (
    <>
      <Header />

      <section className="cards-section">
        <h2>Our Services</h2>

        <div className="cards">
          {[img1, img2].map((img, i) => (
            <div className="card" key={i}>
              <img src={img} alt={`card-${i}`} />
              <h3>Service {i + 1}</h3>
              <p>
                We provide high quality digital solutions for modern businesses.
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}


