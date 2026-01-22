import React from 'react'
import herobg1 from '../assets/hero-background.png'
function About() {
  return (
    <div style={{ backgroundImage: `url(${herobg1})` }}>
      <h1>About Us</h1>
      <p>Welcome to our company! We are dedicated to providing the best services to our customers.</p>
      <h2>Our Mission</h2>
      <p>Our mission is to empower learners through innovative technology and personalized insights.</p>
      <h2>Our Team</h2>
      <p>We have a diverse team of experts in education, technology, and data science working together to achieve our goals.</p>
      <h2>Our Values</h2>
      <ul>
        <li>Innovation: We strive to stay ahead of the curve with cutting-edge technology.</li>
        <li>Integrity: We believe in transparency and honesty in all our dealings.</li>
        <li>Customer Focus: Our customers are at the heart of everything we do.</li>
        <li>Collaboration: We work together to achieve common goals.</li>
      </ul>
    </div>
  )
}

export default About
