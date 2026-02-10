import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SalonContext = createContext();

export const useSalon = () => {
    return useContext(SalonContext);
};

export const SalonProvider = ({ children }) => {
    const [salons, setSalons] = useState([]);
    const [selectedSalon, setSelectedSalon] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchSalons = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const role = localStorage.getItem('role');

            if (!userId) {
                setLoading(false);
                return;
            }

            // Fetch request might need adjustment based on your backend logic (e.g. if it filters by owner automatically)
            // For now assuming /salons returns all, we might need to filter or backend handles it.
            // If backend returns all salons, we should filter by ownerId on frontend if specific endpoint missing.
            // But let's assume /salons returns relevant salons.
            let url = 'http://localhost:5050/salons';
            if (role === 'owner' && userId) {
                url += `?ownerId=${userId}`;
            }

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setSalons(data);

                // Auto-select first salon if none selected
                if (!selectedSalon && data.length > 0) {
                    setSelectedSalon(data[0]);
                }
            }
        } catch (error) {
            console.error("Error fetching salons:", error);
        } finally {
            setLoading(false);
        }
    };

    const location = useLocation();

    // Re-fetch when location changes (ensures data is fresh after login/redirects)
    useEffect(() => {
        fetchSalons();
    }, [location.pathname]);

    // Also update selectedSalon if salons change and current selection is invalid
    useEffect(() => {
        if (salons.length > 0 && selectedSalon) {
            const exists = salons.find(s => s._id === selectedSalon._id);
            if (!exists) setSelectedSalon(salons[0]);
        } else if (salons.length > 0 && !selectedSalon) {
            setSelectedSalon(salons[0]);
        }
    }, [salons]);


    const value = {
        salons,
        selectedSalon,
        setSelectedSalon,
        fetchSalons,
        loading
    };

    return (
        <SalonContext.Provider value={value}>
            {children}
        </SalonContext.Provider>
    );
};
