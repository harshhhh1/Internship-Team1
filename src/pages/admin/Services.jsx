import { useState } from 'react';
import {
  FaSearch,
  FaPlus,
  FaEllipsisV,
  FaPen,
  FaTrash,
  FaChevronDown
} from 'react-icons/fa';

// Mock services data
const initialServices = [
  // Facial cleanup
  { id: 1, name: 'Basic Facial', category: 'Facial cleanup', duration: '45 min', price: 599 },
  { id: 2, name: 'Gold Facial', category: 'Facial cleanup', duration: '60 min', price: 1299 },
  { id: 3, name: 'Diamond Facial', category: 'Facial cleanup', duration: '75 min', price: 1899 },
  { id: 4, name: 'Herbal Facial', category: 'Facial cleanup', duration: '50 min', price: 799 },
  
  // Pedicure
  { id: 5, name: 'Classic Pedicure', category: 'Pedicure', duration: '40 min', price: 449 },
  { id: 6, name: 'Spa Pedicure', category: 'Pedicure', duration: '55 min', price: 799 },
  { id: 7, name: 'Gel Pedicure', category: 'Pedicure', duration: '60 min', price: 999 },
  { id: 8, name: 'Paraffin Pedicure', category: 'Pedicure', duration: '50 min', price: 699 },
  
  // Hair repairing treatment
  { id: 9, name: 'Keratin Treatment', category: 'Hair repairing treatment', duration: '120 min', price: 2499 },
  { id: 10, name: 'Protein Treatment', category: 'Hair repairing treatment', duration: '90 min', price: 1499 },
  { id: 11, name: 'Deep Conditioning', category: 'Hair repairing treatment', duration: '45 min', price: 599 },
  { id: 12, name: 'Hair Spa Treatment', category: 'Hair repairing treatment', duration: '60 min', price: 899 },
  
  // Polishing
  { id: 13, name: 'Hair Polishing', category: 'Polishing', duration: '60 min', price: 1199 },
  { id: 14, name: 'Gloss Treatment', category: 'Polishing', duration: '45 min', price: 899 },
  { id: 15, name: 'Silk Blowout', category: 'Polishing', duration: '90 min', price: 1599 },
  
  // Hair cut
  { id: 16, name: 'Basic Haircut', category: 'Hair cut', duration: '30 min', price: 299 },
  { id: 17, name: 'Layered Cut', category: 'Hair cut', duration: '45 min', price: 499 },
  { id: 18, name: 'Bob Cut', category: 'Hair cut', duration: '60 min', price: 699 },
  { id: 19, name: 'Feather Cut', category: 'Hair cut', duration: '45 min', price: 549 },
  { id: 20, name: 'Kids Haircut', category: 'Hair cut', duration: '25 min', price: 199 },
  
  // Hair color
  { id: 21, name: 'Root Touch Up', category: 'Hair color', duration: '60 min', price: 899 },
  { id: 22, name: 'Full Hair Color', category: 'Hair color', duration: '120 min', price: 1899 },
  { id: 23, name: 'Highlights', category: 'Hair color', duration: '150 min', price: 2499 },
  { id: 24, name: 'Balayage', category: 'Hair color', duration: '180 min', price: 3499 },
  { id: 25, name: 'Ombre', category: 'Hair color', duration: '150 min', price: 2999 },
  
  // Hair spa & head message
  { id: 26, name: 'Hair Spa', category: 'Hair spa & head message', duration: '45 min', price: 499 },
  { id: 27, name: 'Head Massage', category: 'Hair spa & head message', duration: '30 min', price: 349 },
  { id: 28, name: 'Scalp Treatment', category: 'Hair spa & head message', duration: '40 min', price: 599 },
  { id: 29, name: 'Ayurvedic Head Spa', category: 'Hair spa & head message', duration: '60 min', price: 899 },
  
  // Menicure
  { id: 30, name: 'Classic Manicure', category: 'Menicure', duration: '35 min', price: 399 },
  { id: 31, name: 'Spa Manicure', category: 'Menicure', duration: '50 min', price: 699 },
  { id: 32, name: 'Gel Manicure', category: 'Menicure', duration: '55 min', price: 899 },
  { id: 33, name: 'Paraffin Manicure', category: 'Menicure', duration: '45 min', price: 599 },
  
  // Relaxing
  { id: 34, name: 'Body Massage (30 min)', category: 'Relaxing', duration: '30 min', price: 699 },
  { id: 35, name: 'Body Massage (60 min)', category: 'Relaxing', duration: '60 min', price: 1299 },
  { id: 36, name: 'Aromatherapy', category: 'Relaxing', duration: '75 min', price: 1799 },
  { id: 37, name: 'Hot Stone Massage', category: 'Relaxing', duration: '90 min', price: 2199 },
  { id: 38, name: 'Reflexology', category: 'Relaxing', duration: '45 min', price: 899 },
  
  // Waxing
  { id: 39, name: 'Full Leg Waxing', category: 'Waxing', duration: '45 min', price: 699 },
  { id: 40, name: 'Full Arm Waxing', category: 'Waxing', duration: '30 min', price: 499 },
  { id: 41, name: 'Underarm Waxing', category: 'Waxing', duration: '15 min', price: 249 },
  { id: 42, name: 'Bikini Waxing', category: 'Waxing', duration: '30 min', price: 599 },
  { id: 43, name: 'Full Body Waxing', category: 'Waxing', duration: '90 min', price: 1899 },
  { id: 44, name: 'Face Waxing', category: 'Waxing', duration: '20 min', price: 349 },
];

const categories = [
  'All Categories',
  'Facial cleanup',
  'Pedicure',
  'Hair repairing treatment',
  'Polishing',
  'Hair cut',
  'Hair color',
  'Hair spa & head message',
  'Menicure',
  'Relaxing',
  'Waxing'
];

function Services() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [showOptionsDropdown, setShowOptionsDropdown] = useState(false);
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [services, setServices] = useState(initialServices);

  // Filter services based on search term and category
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (id) => {
    console.log('Edit service:', id);
    // Add edit logic here
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const handleAddService = (category) => {
    console.log('Add service for category:', category);
    // Add add service logic here
    setShowAddDropdown(false);
  };

  return (
    <div className="min-h-screen bg-[#f4f8fb]">
      {/* Header Section */}
      <section className="py-8 px-5 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0b3c5d]">Our Premium Services</h2>
              <p className="text-gray-500 mt-1">Manage your salon services</p>
            </div>
            
            {/* Top Right Buttons with Dropdowns */}
            <div className="flex gap-3">
              {/* Options Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowOptionsDropdown(!showOptionsDropdown);
                    setShowAddDropdown(false);
                  }}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-all duration-200"
                >
                  <FaEllipsisV />
                  <span>Options</span>
                  <FaChevronDown className={`text-xs transition-transform ${showOptionsDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showOptionsDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700">Export Services</button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700">Import Services</button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700">Bulk Actions</button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700">Settings</button>
                  </div>
                )}
              </div>

              {/* Add Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowAddDropdown(!showAddDropdown);
                    setShowOptionsDropdown(false);
                  }}
                  className="flex items-center gap-2 bg-[#0b3c5d] hover:bg-[#0a2e4d] text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200"
                >
                  <FaPlus />
                  <span>Add</span>
                  <FaChevronDown className={`text-xs transition-transform ${showAddDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showAddDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <p className="px-4 py-1 text-xs text-gray-400 uppercase font-semibold">Select Category</p>
                    {categories.filter(c => c !== 'All Categories').map(category => (
                      <button
                        key={category}
                        onClick={() => handleAddService(category)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm"
                      >
                        + {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Search Bar (Longer) */}
          <div className="mt-6">
            <div className="relative max-w-2xl">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b3c5d] focus:border-[#0b3c5d] outline-none transition-all"
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="mt-4">
            <div className="relative inline-block w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-300 rounded-lg py-3 px-4 pr-10 focus:ring-2 focus:ring-[#0b3c5d] focus:border-[#0b3c5d] outline-none cursor-pointer transition-all"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Table */}
      <section className="py-8 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">Service Name</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">Duration</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.length > 0 ? (
                    filteredServices.map((service, index) => (
                      <tr
                        key={service.id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                      >
                        <td className="py-4 px-6">
                          <div className="font-medium text-gray-900">{service.name}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {service.category}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center text-gray-600">
                            <span className="font-medium">{service.duration}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-semibold text-[#0b3c5d]">₹{service.price}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(service.id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <FaPen />
                            </button>
                            <button
                              onClick={() => handleDelete(service.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-12 px-6 text-center text-gray-500">
                        <div className="flex flex-col items-center justify-center">
                          <FaSearch className="text-4xl text-gray-300 mb-3" />
                          <p className="text-lg font-medium">No services found</p>
                          <p className="text-sm">Try adjusting your search or category filter</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Click outside to close dropdowns */}
      {(showOptionsDropdown || showAddDropdown) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowOptionsDropdown(false);
            setShowAddDropdown(false);
          }}
        />
      )}
    </div>
  );
}

export default Services;

