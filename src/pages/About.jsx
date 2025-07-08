import "../index.css";
import heroImage from "../assets/hero.jpg";
import gallery1 from "../assets/gallery1.webp";
import gallery2 from "../assets/gallery2.png";
import gallery3 from "../assets/gallery3.webp";
import { useTheme } from '../context/ThemeContext';

export default function About() {
  const { theme } = useTheme();

  return (
    <div className={`about-page ${theme}`}>
      {/* Hero Section */}
      <section className="about-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="overlay">
          <h1>Preserving the Art of Japanese Craftsmanship</h1>
          <p>Every piece tells a story, every stroke carries a tradition.</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className={`about-mission ${theme}`}>
        <h2>Our Mission</h2>
        <div className="mission-cards">
          <div className="card">
            <span>🎎</span>
            <h3>Support Artisans</h3>
            <p>Connecting traditional makers to a global audience.</p>
          </div>
          <div className="card">
            <span>🧧</span>
            <h3>Preserve Culture</h3>
            <p>Reviving centuries-old techniques through commerce.</p>
          </div>
          <div className="card">
            <span>📦</span>
            <h3>Deliver Meaning</h3>
            <p>Products that carry identity, not just utility.</p>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className={`about-process ${theme}`}>
        <h2>Crafted with Care</h2>
        <div className="process-steps">
          <div className="step">
            <h4>1. Sourcing Local Materials</h4>
            <p>Only authentic washi paper, bamboo, wood, and clay are used.</p>
          </div>
          <div className="step">
            <h4>2. Handmade Techniques</h4>
            <p>From weaving to sculpting, every process is done by hand.</p>
          </div>
          <div className="step">
            <h4>3. Cultural Meaning</h4>
            <p>Inspired by seasons, festivals, and philosophy.</p>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="about-culture">
        <h2>More Than Just Crafts</h2>
        <p>We believe that every product embodies a piece of Japanese soul — a harmony of nature, art, and spirituality.</p>
      </section>

      {/* Gallery Strip */}
      <section className="about-gallery">
        <img src={gallery1} alt="Craft 1" />
        <img src={gallery2} alt="Craft 2" />
        <img src={gallery3} alt="Craft 3" />
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Become a Patron of Tradition</h2>
        <p>Support artisans. Own heritage. Buy a piece of Japan today.</p>
        <a href="/buy" className="cta-button">Start Exploring</a>
      </section>
    </div>
  );
}
