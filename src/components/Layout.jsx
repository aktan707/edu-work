import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { FaBars, FaTimes, FaShoppingCart, FaUser, FaSearch, FaChevronDown } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import Footer from './Footer';
import coursesData from '../data/courses.json';

function Layout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const { cartCount } = useCart();
    const location = useLocation();

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    // Add scroll event listener
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search functionality
        console.log('Searching for:', searchQuery);
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className={`sticky top-0 z-50 bg-white ${isScrolled ? 'shadow-md' : ''} transition-shadow duration-300`}>
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center">
                            <span className="text-2xl font-bold text-primary">EduPress</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            <Link to="/" className="text-gray-dark hover:text-primary font-medium">Home</Link>
                            <Link to="/courses" className="text-gray-dark hover:text-primary font-medium">Courses</Link>
                            <div className="relative group">
                                <button className="flex items-center text-gray-dark hover:text-primary font-medium">
                                    Categories <FaChevronDown className="ml-1 h-3 w-3" />
                                </button>
                                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div className="py-1">
                                        {coursesData.categories.map(category => (
                                            <Link
                                                key={category.id}
                                                to={`/category/${category.id}`}
                                                className="block px-4 py-2 text-sm text-gray-dark hover:bg-gray-100"
                                            >
                                                {category.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </nav>

                        {/* Search, Cart, and User */}
                        <div className="hidden md:flex items-center space-x-6">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary w-64"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </form>

                            <Link to="/cart" className="relative text-gray-dark hover:text-primary">
                                <FaShoppingCart className="h-6 w-6" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                                )}
                            </Link>

                            <Link to="/login" className="text-gray-dark hover:text-primary">
                                <FaUser className="h-6 w-6" />
                            </Link>

                            <Link to="/register" className="btn btn-primary">
                                Sign Up
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex md:hidden items-center space-x-4">
                            <Link to="/cart" className="relative text-gray-dark">
                                <FaShoppingCart className="h-6 w-6" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                                )}
                            </Link>

                            <button
                                onClick={toggleMobileMenu}
                                className="text-gray-dark focus:outline-none"
                            >
                                {mobileMenuOpen ? (
                                    <FaTimes className="h-6 w-6" />
                                ) : (
                                    <FaBars className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white md:hidden">
                    <div className="p-4 h-full flex flex-col">
                        <div className="flex justify-between items-center mb-8">
                            <Link to="/" className="text-2xl font-bold text-primary">EduPress</Link>
                            <button onClick={toggleMobileMenu} className="text-gray-dark">
                                <FaTimes className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSearch} className="relative mb-6">
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className="pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </form>

                        <nav className="flex flex-col space-y-4">
                            <Link to="/" className="text-lg font-medium py-2 border-b border-gray-100">Home</Link>
                            <Link to="/courses" className="text-lg font-medium py-2 border-b border-gray-100">Courses</Link>

                            <div className="py-2 border-b border-gray-100">
                                <p className="text-lg font-medium mb-2">Categories</p>
                                <div className="pl-4 space-y-2">
                                    {coursesData.categories.map(category => (
                                        <Link
                                            key={category.id}
                                            to={`/category/${category.id}`}
                                            className="block text-gray-dark hover:text-primary"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <Link to="/login" className="text-lg font-medium py-2 border-b border-gray-100">Login</Link>
                        </nav>

                        <div className="mt-auto">
                            <Link to="/register" className="btn btn-primary w-full">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Main content */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Layout;