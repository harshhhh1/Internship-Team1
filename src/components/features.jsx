import React from 'react'
import Featurecard from './featurecard'
import herobg1 from '../assets/hero-background.png'
function Features() {
  return (
    <div style={{ backgroundImage: `url(${herobg1})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <Featurecard/>
    </div>
  )
}

export default Features
