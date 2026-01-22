import React from 'react'
import '../styles/home.css'
function Featurecard() {
  return (
    <div className='features-section'>
      <h2>Features</h2>
      <div className='features-grid'>
        <div className='card'>
          <h3>AI-Powered</h3>
          <p>Advanced machine learning algorithms to enhance your learning experience</p>
        </div>
        <div className='card'>
          <h3>Personalized</h3>
          <p>Customized learning paths tailored to your unique needs and pace</p>
        </div>
        <div className='card'>
          <h3>Interactive</h3>
          <p>Engaging content and real-time feedback to keep you motivated</p>
        </div>
        <div className='card'>
          <h3>curiosity driven</h3>
          <p>made with love from the devs</p>
        </div>
      </div>
    </div>
  )
}

export default Featurecard
