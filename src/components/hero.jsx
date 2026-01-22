import React from 'react'
import herobg1 from '../assets/hero-background.png'
import '../styles/home.css'
function Hero() {
  return (
    <>
      <div className='hero-section' style={{ backgroundImage: `url(${herobg1})` }}>
        <div className='hero-content'>
          <h1 className='hero-title'>Welcome to Learnytics</h1>
          <p className='hero-subtitle'>Unlock Your Learning Potential with AI-Powered Insights</p>
          <button className='hero-button'>Get Started</button>
        </div>
      </div>
    </>
  )
}

export default Hero
