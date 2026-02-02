import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    HiHome,
    HiCalendar,
    HiScissors,
    HiUser,
    HiMenu,
    HiX
} from 'react-icons/hi';
// Use react-icons/hi or similar because we need standard icons. 
// Assuming react-icons is installed as per previous context (navbar uses it).

const BottomNav = () => {
    const [isMoreOpen, setMoreOpen] = useState(false);

    const navItems = [
        { to: "/dashboard", icon: <HiHome size={24} />, label: "Home", end: true },
        { to: "/dashboard/appointments", icon: <HiCalendar size={24} />, label: "Appts" },
        { to: "/dashboard/services", icon: <HiScissors size={24} />, label: "Services" },
        { to: "/dashboard/profile", icon: <HiUser size={24} />, label: "Profile" },
    ];

    const moreItems = [
        { to: "/dashboard/staff", label: "Staff" },
        { to: "/dashboard/receptionist", label: "Receptionist" },
        { to: "/dashboard/revenue-and-report", label: "Revenue" },
        { to: "/dashboard/reviews", label: "Reviews" },
        { to: "/dashboard/settings", label: "Settings" },
    ];

    return (
        <>
            {/* Bottom Navigation Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden z-50">
                <div className="flex justify-around items-center h-16">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                                `flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-700'
                                }`
                            }
                            onClick={() => setMoreOpen(false)}
                        >
                            {item.icon}
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </NavLink>
                    ))}

                    {/* More Button */}
                    <button
                        onClick={() => setMoreOpen(!isMoreOpen)}
                        className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isMoreOpen ? 'text-primary' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {isMoreOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                        <span className="text-[10px] font-medium">More</span>
                    </button>
                </div>
            </div>

            {/* More Menu Drawer */}
            {isMoreOpen && (
                <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-100 shadow-xl rounded-t-2xl md:hidden z-30 p-4 animate-slide-up">
                    <div className="grid grid-cols-2 gap-3">
                        {moreItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `p-3 rounded-xl text-center text-sm font-medium transition-colors ${isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                                onClick={() => setMoreOpen(false)}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default BottomNav;
