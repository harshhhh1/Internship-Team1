import Profilecard from '../components/Profilecard'
import React from 'react'
import Footer from '../components/footer';
function Profile() {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex-grow'>
        <Profilecard />
      </div>
      <Footer />
    </div>
  )
}

export default Profile
