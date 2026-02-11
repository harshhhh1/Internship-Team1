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
    const [branchLimit, setBranchLimit] = useState(1);

    const fetchSalons = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const role = localStorage.getItem('role');

            if (!userId) {
                setLoading(false);
                return;
            }

            // Fetch Owner's branch limit if role is owner
            if (role === 'owner') {
                const profileRes = await fetch(`http://localhost:5050/auth/me?userId=${userId}&role=${role}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (profileRes.ok) {
                    const profileData = await profileRes.json();
                    if (profileData.subscription?.branchLimit) {
                        setBranchLimit(profileData.subscription.branchLimit);
                    }
                }
            }

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
        loading,
        branchLimit
    };

    return (
        <SalonContext.Provider value={value}>
            {children}
        </SalonContext.Provider>
    );
};
