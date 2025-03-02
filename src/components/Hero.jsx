import { Link } from 'react-router';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

function Hero() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search functionality
        console.log('Searching for:', searchQuery);
    };

    return (
        <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2 mb-10 lg:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Unlock Your Potential with Online Learning
                        </h1>
                        <p className="text-xl mb-8 text-blue-100">
                            Discover thousands of courses taught by industry experts and take your skills to the next level.
                        </p>

                        <form onSubmit={handleSearch} className="relative max-w-lg mb-8">
                            <input
                                type="text"
                                placeholder="What do you want to learn today?"
                                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-dark focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                Search
                            </button>
                        </form>

                        <div className="flex flex-wrap gap-4">
                            <Link to="/courses" className="btn btn-secondary">
                                Browse Courses
                            </Link>
                            <Link to="/register" className="btn bg-white text-primary hover:bg-gray-100">
                                Sign Up for Free
                            </Link>
                        </div>
                    </div>

                    <div className="lg:w-1/2 lg:pl-10">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                            alt="Students learning online"
                            className="rounded-lg shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;