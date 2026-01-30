import React from 'react'


function Profilecard() {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 max-w-sm mx-auto">
      <div className="h-32 bg-primary"></div>
      <div className="px-6 pb-6 -mt-12.5 text-center">
        <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 mx-auto overflow-hidden">
          <img src="https://res.cloudinary.com/dgh9uunif/image/upload/v1768719858/Wavy_Buddies_-_Avatar_5_gdbuhf.webp" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mt-4">Visitor</h3>
        <p className="text-gray-500 text-sm">Welcome to our facility</p>
        <button className="mt-6 w-full py-2 bg-secondary text-white rounded-lg hover:bg-primary transition-colors">
          View Details
        </button>
      </div>
    </div>
  )
}

export default Profilecard
