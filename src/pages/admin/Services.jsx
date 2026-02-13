import { useState, useEffect } from 'react';
import {
  FaSearch,
  FaPlus,
  FaPen,
  FaTrash,
  FaClock,
  FaTimes,
  FaCheck,
  FaSpinner,
  FaLayerGroup
} from 'react-icons/fa';
import { useSalon } from '../../context/SalonContext';

function Services() {
  const { selectedSalon } = useSalon();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Data states
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // UI states
  const [editingService, setEditingService] = useState(null);
  const [deletingService, setDeletingService] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form states
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    color: '#9381ff'
  });
  
  const [serviceForm, setServiceForm] = useState({
    name: '',
    category: '',
    price: '',
    malePrice: '',
    femalePrice: '',
    duration: '30',
    description: ''
  });

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const salonId = selectedSalon?._id || localStorage.getItem('salonId');
      
      const response = await fetch(
        `http://localhost:5050/categories?salonId=${salonId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch services
  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('token');
      const salonId = selectedSalon?._id || localStorage.getItem('salonId');
      
      let url = `http://localhost:5050/services?salonId=${salonId}`;
      if (selectedCategory !== 'All') {
        const category = categories.find(c => c.name === selectedCategory);
        if (category) {
          url += `&categoryId=${category._id}`;
        }
      }
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    if (selectedSalon?._id) {
      fetchCategories();
    }
  }, [selectedSalon]);

  useEffect(() => {
    if (selectedSalon?._id) {
      fetchServices();
    }
  }, [selectedSalon, selectedCategory, categories]);

  // Filter services based on search term and category
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.categoryName === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle create category
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      const salonId = selectedSalon?._id || localStorage.getItem('salonId');
      
      const response = await fetch('http://localhost:5050/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...categoryForm,
          salonId
        })
      });

      if (response.ok) {
        await fetchCategories();
        setShowCategoryModal(false);
        setCategoryForm({ name: '', description: '', color: '#9381ff' });
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to create category');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Error creating category');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle create service
  const handleCreateService = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      const salonId = selectedSalon?._id || localStorage.getItem('salonId');
      
      const selectedCat = categories.find(c => c._id === serviceForm.category);
      
      const payload = {
        name: serviceForm.name,
        category: serviceForm.category,
        categoryName: selectedCat?.name || '',
        price: parseFloat(serviceForm.price) || 0,
        malePrice: parseFloat(serviceForm.malePrice) || 0,
        femalePrice: parseFloat(serviceForm.femalePrice) || 0,
        duration: parseInt(serviceForm.duration) || 30,
        description: serviceForm.description,
        salonId
      };

      const url = editingService 
        ? `http://localhost:5050/services/${editingService._id}`
        : 'http://localhost:5050/services';
      
      const method = editingService ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        await fetchServices();
        setShowServiceModal(false);
        setServiceForm({
          name: '',
          category: '',
          price: '',
          malePrice: '',
          femalePrice: '',
          duration: '30',
          description: ''
        });
        setEditingService(null);
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to save service');
      }
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Error saving service');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete category
  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5050/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        await fetchCategories();
        if (selectedCategory !== 'All') {
          setSelectedCategory('All');
        }
      } else {
        alert('Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Handle delete service
  const handleDeleteService = async () => {
    if (!deletingService) return;
    
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5050/services/${deletingService._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        await fetchServices();
        setDeletingService(null);
      } else {
        alert('Failed to delete service');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open edit service modal
  const handleEditService = (service) => {
    setEditingService(service);
    setServiceForm({
      name: service.name || '',
      category: service.category?._id || service.category || '',
      price: service.price?.toString() || '',
      malePrice: service.malePrice?.toString() || '',
      femalePrice: service.femalePrice?.toString() || '',
      duration: service.duration?.toString() || '30',
      description: service.description || ''
    });
    setShowServiceModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="px-5 pb-8 pt-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 pt-6 pb-6 px-6 md:px-8">
          <div className="relative z-10">
            {/* Header Row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Services</h2>
                <p className="text-gray-500 mt-1 text-base flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  {filteredServices.length} services available
                </p>
              </div>
              
              {/* Buttons */}
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => setShowCategoryModal(true)}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-5 rounded-xl transition-all duration-200 border border-gray-200"
                >
                  <FaLayerGroup className="text-sm" />
                  <span>Add Category</span>
                </button>

                <button
                  onClick={() => {
                    setEditingService(null);
                    setServiceForm({
                      name: '',
                      category: categories[0]?._id || '',
                      price: '',
                      malePrice: '',
                      femalePrice: '',
                      duration: '30',
                      description: ''
                    });
                    setShowServiceModal(true);
                  }}
                  disabled={categories.length === 0}
                  className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-medium py-2.5 px-5 rounded-xl transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPlus className="text-sm" />
                  <span>Add Service</span>
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-xl mb-5">
              <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden border border-gray-200 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-100 transition-all">
                <div className="pl-4 text-cyan-500">
                  <FaSearch className="text-lg" />
                </div>
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 px-3 bg-transparent text-gray-700 placeholder-gray-400 outline-none"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="pr-4 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 items-center">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === 'All'
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    selectedCategory === category.name
                      ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(category._id);
                    }}
                    className="ml-1 text-xs opacity-60 hover:opacity-100 hover:text-red-200"
                  >
                    ×
                  </button>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Table */}
      <section className="py-6 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">Service</th>
                    <th className="text-left py-4 px-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                    <th className="text-left py-4 px-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">Normal Price</th>
                    <th className="text-left py-4 px-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">Male Price</th>
                    <th className="text-left py-4 px-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">Female Price</th>
                    <th className="text-left py-4 px-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">Duration</th>
                    <th className="text-left py-4 px-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.length > 0 ? (
                    filteredServices.map((service, index) => (
                      <tr
                        key={service._id}
                        className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-cyan-50/50 hover:to-teal-50/50 transition-all duration-200 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                        }`}
                      >
                        <td className="py-4 px-5">
                          <div className="font-semibold text-gray-800">{service.name}</div>
                          {service.description && <div className="text-xs text-gray-500">{service.description}</div>}
                        </td>
                        <td className="py-4 px-5">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white bg-gradient-to-r from-cyan-500 to-teal-500">
                            {service.categoryName || 'Uncategorized'}
                          </span>
                        </td>
                        <td className="py-4 px-5"><span className="font-semibold text-gray-800">₹{service.price || 0}</span></td>
                        <td className="py-4 px-5"><span className="font-semibold text-gray-800">₹{service.malePrice || 0}</span></td>
                        <td className="py-4 px-5"><span className="font-semibold text-gray-800">₹{service.femalePrice || 0}</span></td>
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2">
                            <span className="p-1.5 bg-amber-100 text-amber-600 rounded-lg"><FaClock className="text-xs" /></span>
                            <span className="font-medium text-gray-700">{service.duration || 30} min</span>
                          </div>
                        </td>
                        <td className="py-4 px-5">
                          <div className="flex gap-2">
                            <button onClick={() => handleEditService(service)} className="p-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg" title="Edit"><FaPen className="text-sm" /></button>
                            <button onClick={() => setDeletingService(service)} className="p-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg" title="Delete"><FaTrash className="text-sm" /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="py-16 px-5 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <p className="text-lg font-medium text-gray-600">No services found</p>
                          <p className="text-sm text-gray-400">Add a category and service to get started</p>
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

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowCategoryModal(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-5 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">Add Category</h3>
                  <p className="text-purple-100 text-sm mt-1">Create a new service category</p>
                </div>
                <button onClick={() => setShowCategoryModal(false)} className="p-2 hover:bg-white/10 rounded-lg"><FaTimes /></button>
              </div>
            </div>
            
            <form onSubmit={handleCreateCategory} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Category Name *</label>
                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none"
                  placeholder="e.g., Hair, Skin, Spa"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none"
                  rows="2"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button type="submit" disabled={isSubmitting} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50">
                  {isSubmitting ? <FaSpinner className="animate-spin" /> : <FaCheck />} Create Category
                </button>
                <button type="button" onClick={() => setShowCategoryModal(false)} className="px-6 bg-gray-100 text-gray-700 font-medium py-3 rounded-lg">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowServiceModal(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-cyan-500 to-teal-500 p-5 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{editingService ? 'Edit Service' : 'Add Service'}</h3>
                </div>
                <button onClick={() => { setShowServiceModal(false); setEditingService(null); }} className="p-2 hover:bg-white/10 rounded-lg"><FaTimes /></button>
              </div>
            </div>
            
            <form onSubmit={handleCreateService} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Service Name *</label>
                <input type="text" value={serviceForm.name} onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-cyan-400 outline-none" required />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
                <select value={serviceForm.category} onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-cyan-400 outline-none bg-white" required>
                  <option value="">Select category</option>
                  {categories.map(cat => (<option key={cat._id} value={cat._id}>{cat.name}</option>))}
                </select>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Normal Price</label>
                  <input type="number" value={serviceForm.price} onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-cyan-400 outline-none" min="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Male Price</label>
                  <input type="number" value={serviceForm.malePrice} onChange={(e) => setServiceForm({ ...serviceForm, malePrice: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-cyan-400 outline-none" min="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Female Price</label>
                  <input type="number" value={serviceForm.femalePrice} onChange={(e) => setServiceForm({ ...serviceForm, femalePrice: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-cyan-400 outline-none" min="0" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Duration (min)</label>
                <input type="number" value={serviceForm.duration} onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-cyan-400 outline-none" min="1" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-cyan-400 outline-none" rows="2" />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button type="submit" disabled={isSubmitting} className="flex-1 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50">
                  {isSubmitting ? <FaSpinner className="animate-spin" /> : <FaCheck />} {editingService ? 'Update' : 'Create'} Service
                </button>
                <button type="button" onClick={() => { setShowServiceModal(false); setEditingService(null); }} className="px-6 bg-gray-100 text-gray-700 font-medium py-3 rounded-lg">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setDeletingService(null)}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-white text-center">
              <h3 className="text-lg font-semibold">Delete Service?</h3>
              <p className="text-rose-100 text-sm mt-1">This action cannot be undone</p>
            </div>
            
            <div className="p-5">
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 mb-5">
                <div className="font-medium text-gray-800">{deletingService.name}</div>
                <div className="text-sm text-gray-500">₹{deletingService.price}</div>
              </div>
              
              <div className="flex gap-3">
                <button onClick={handleDeleteService} disabled={isSubmitting} className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50">
                  {isSubmitting ? <FaSpinner className="animate-spin" /> : <FaTrash />} Yes, Delete
                </button>
                <button onClick={() => setDeletingService(null)} className="px-6 bg-gray-100 text-gray-700 font-medium py-3 rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;

