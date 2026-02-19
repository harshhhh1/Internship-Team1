import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Service Categories
const categories = ['All', 'Hair', 'Skin', 'Nails', 'Spa', 'Makeup'];

// Services Data
const services = [
  {
    id: 1,
    category: 'Hair',
    name: 'Haircut & Styling',
    description: 'Professional haircut and styling tailored to your face shape and lifestyle.',
    price: 'From $45',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    category: 'Hair',
    name: 'Hair Coloring',
    description: 'Full color, highlights, balayage, and ombre services by expert colorists.',
    price: 'From $120',
    duration: '120 min',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    category: 'Hair',
    name: 'Keratin Treatment',
    description: 'Smooth and straighten hair with our premium keratin treatment.',
    price: 'From $200',
    duration: '180 min',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    category: 'Hair',
    name: 'Hair Treatment',
    description: 'Revitalize your hair with deep conditioning and restoration treatments.',
    price: 'From $60',
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    category: 'Skin',
    name: 'Facial Treatment',
    description: 'Customized facial treatments for all skin types and concerns.',
    price: 'From $80',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    category: 'Skin',
    name: 'Microdermabrasion',
    description: 'Advanced skin exfoliation for smoother, younger-looking skin.',
    price: 'From $150',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&h=300&fit=crop'
  },
  {
    id: 7,
    category: 'Skin',
    name: 'Chemical Peel',
    description: 'Professional chemical peel to rejuvenate and refresh your skin.',
    price: 'From $120',
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=400&h=300&fit=crop'
  },
  {
    id: 8,
    category: 'Nails',
    name: 'Manicure',
    description: 'Classic or gel manicure with your choice of polish.',
    price: 'From $30',
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop'
  },
  {
    id: 9,
    category: 'Nails',
    name: 'Pedicure',
    description: 'Luxurious foot spa treatment with massage and polish.',
    price: 'From $40',
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=300&fit=crop'
  },
  {
    id: 10,
    category: 'Nails',
    name: 'Nail Art',
    description: 'Creative nail art designs to express your unique style.',
    price: 'From $50',
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=400&h=300&fit=crop'
  },
  {
    id: 11,
    category: 'Spa',
    name: 'Swedish Massage',
    description: 'Relaxing full-body massage to relieve tension and stress.',
    price: 'From $90',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop'
  },
  {
    id: 12,
    category: 'Spa',
    name: 'Hot Stone Massage',
    description: 'Therapeutic massage using heated volcanic stones.',
    price: 'From $120',
    duration: '90 min',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&h=300&fit=crop'
  },
  {
    id: 13,
    category: 'Spa',
    name: 'Body Wrap',
    description: 'Detoxifying body wrap treatment for smooth, radiant skin.',
    price: 'From $100',
    duration: '75 min',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
  },
  {
    id: 14,
    category: 'Makeup',
    name: 'Bridal Makeup',
    description: 'Professional bridal makeup for your special day.',
    price: 'From $150',
    duration: '90 min',
    image: 'https://images.unsplash.com/photo-1487412947132-34081fd47524?w=400&h=300&fit=crop'
  },
  {
    id: 15,
    category: 'Makeup',
    name: 'Event Makeup',
    description: 'Glamorous makeup for parties, proms, and special occasions.',
    price: 'From $75',
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1526512340740-9217d0159da9?w=400&h=300&fit=crop'
  },
  {
    id: 16,
    category: 'Makeup',
    name: 'Makeup Lesson',
    description: 'Learn professional makeup techniques from our experts.',
    price: 'From $100',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop'
  }
];

function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedService, setSelectedService] = useState(null);

  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary to-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/90 text-xl max-w-2xl mx-auto"
          >
            Discover our wide range of premium beauty and wellness services designed to make you look and feel your best.
          </motion.p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary">
                  {service.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-primary font-bold text-lg">{service.price}</span>
                    <span className="text-gray-400 text-sm ml-2">• {service.duration}</span>
                  </div>
                  <Link 
                    to="/book-appointment"
                    className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-gray-400 mb-8">Contact us and we'll be happy to help you find the perfect service for your needs.</p>
          <Link 
            to="/contact"
            className="inline-block bg-primary hover:bg-secondary text-white font-bold py-4 px-8 rounded-full transition-colors duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage

