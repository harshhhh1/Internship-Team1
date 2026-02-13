import Service from "../models/Service.js";

export const createService = async (req, res) => {
    try {
        const { name, category, categoryName, price, malePrice, femalePrice, duration, description, salonId, isActive } = req.body;
        
        const service = new Service({
            name,
            category,
            categoryName,
            price: price || 0,
            malePrice: malePrice || 0,
            femalePrice: femalePrice || 0,
            duration: duration || 30,
            description: description || '',
            salonId,
            isActive: isActive !== false
        });
        
        await service.save();
        
        // Populate category for response
        await service.populate('category', 'name color');
        
        res.status(201).json(service);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getServices = async (req, res) => {
    try {
        const { salonId, categoryId } = req.query;
        const filter = {};
        
        if (salonId) {
            filter.salonId = salonId;
        }
        
        if (categoryId) {
            filter.category = categoryId;
        }
        
        const services = await Service.find(filter)
            .populate('salonId', 'name')
            .populate('category', 'name color')
            .sort({ name: 1 });
            
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id)
            .populate('salonId', 'name')
            .populate('category', 'name color');
            
        if (!service) return res.status(404).json({ message: "Service not found" });
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateService = async (req, res) => {
    try {
        const { name, category, categoryName, price, malePrice, femalePrice, duration, description, isActive } = req.body;
        
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            { name, category, categoryName, price, malePrice, femalePrice, duration, description, isActive },
            { new: true }
        ).populate('category', 'name color');
        
        if (!service) return res.status(404).json({ message: "Service not found" });
        res.status(200).json(service);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) return res.status(404).json({ message: "Service not found" });
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
