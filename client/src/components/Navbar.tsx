import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Scissors, Gift, Search, MapPin, Calendar, Info, Phone } from 'lucide-react';

const Navbar: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services', icon: Scissors },
        { name: 'Salons', path: '/salons', icon: MapPin },
        { name: 'Offers', path: '/offers', icon: Gift },
        { name: 'About', path: '/about', icon: Info },
        { name: 'Contact', path: '/contact', icon: Phone },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30 transition-transform group-hover:scale-110 group-hover:rotate-3">
                            <Scissors size={20} />
                        </div>
                        <span className="text-2xl font-bold text-gray-900 tracking-tight">Glow<span className="text-primary italic">Biz</span></span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-medium transition-colors hover:text-primary relative group py-2 ${isActive(link.path) ? 'text-primary font-bold' : 'text-gray-600'
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                            </Link>
                        ))}

                        <button
                            onClick={onOpenBooking}
                            className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-bold text-sm tracking-wide hover:bg-primary transition-all shadow-xl hover:shadow-primary/20 active:scale-95"
                        >
                            <Calendar size={16} />
                            Book Now
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 p-2">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full h-screen">
                    <div className="px-4 pt-4 pb-20 space-y-2 h-full flex flex-col">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-4 px-4 py-4 rounded-xl text-lg font-medium transition-colors ${isActive(link.path) ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {link.icon && <link.icon size={20} />}
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={() => { onOpenBooking(); setIsOpen(false); }}
                            className="mt-6 w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/30"
                        >
                            <Calendar size={20} />
                            Book Appointment
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
