import { useState, useEffect } from 'react';
import { FaFilter, FaTimes, FaSearch } from 'react-icons/fa';
import CourseCard from '../components/CourseCard';
import coursesData from '../data/courses.json';

function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('popularity');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        // Load courses and categories
        setCourses(coursesData.courses);
        setCategories(coursesData.categories);
        setFilteredCourses(coursesData.courses);
    }, []);

    useEffect(() => {
        // Apply filters
        let result = [...courses];

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                course => course.title.toLowerCase().includes(query) ||
                    course.description.toLowerCase().includes(query)
            );
        }

        // Filter by selected categories
        if (selectedCategories.length > 0) {
            result = result.filter(course => selectedCategories.includes(course.categoryId));
        }

        // Filter by price range
        result = result.filter(
            course => {
                const price = course.discountPrice || course.price;
                return price >= priceRange[0] && price <= priceRange[1];
            }
        );

        // Sort courses
        switch (sortBy) {
            case 'popularity':
                result.sort((a, b) => b.studentsCount - a.studentsCount);
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                result.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
                break;
            case 'price-low':
                result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
                break;
            case 'price-high':
                result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
                break;
            default:
                break;
        }

        setFilteredCourses(result);
    }, [courses, searchQuery, selectedCategories, priceRange, sortBy]);

    const toggleCategory = (categoryId) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Search is already handled in the useEffect
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setPriceRange([0, 100]);
        setSearchQuery('');
        setSortBy('popularity');
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div className="py-12">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">All Courses</h1>
                    <p className="text-gray-medium">
                        Browse our collection of {courses.length} courses across various categories
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Mobile filter toggle */}
                    <div className="lg:hidden mb-4">
                        <button
                            onClick={toggleFilters}
                            className="w-full flex items-center justify-center gap-2 bg-gray-light py-3 rounded-lg font-medium"
                        >
                            <FaFilter />
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </button>
                    </div>

                    {/* Filters sidebar */}
                    <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold">Filters</h2>
                                <button
                                    onClick={clearFilters}
                                    className="text-primary text-sm font-medium hover:underline"
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Search */}
                            <div className="mb-6">
                                <h3 className="font-medium mb-3">Search</h3>
                                <form onSubmit={handleSearch} className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search courses..."
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </form>
                            </div>

                            {/* Categories */}
                            <div className="mb-6">
                                <h3 className="font-medium mb-3">Categories</h3>
                                <div className="space-y-2">
                                    {categories.map(category => (
                                        <div key={category.id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`category-${category.id}`}
                                                checked={selectedCategories.includes(category.id)}
                                                onChange={() => toggleCategory(category.id)}
                                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                            />
                                            <label
                                                htmlFor={`category-${category.id}`}
                                                className="ml-2 text-gray-dark"
                                            >
                                                {category.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <h3 className="font-medium mb-3">Price Range</h3>
                                <div className="flex items-center justify-between mb-2">
                                    <span>${priceRange[0]}</span>
                                    <span>${priceRange[1]}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Course listing */}
                    <div className="lg:w-3/4">
                        {/* Sort options */}
                        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-center">
                            <p className="text-gray-medium mb-4 sm:mb-0">
                                Showing <span className="font-medium">{filteredCourses.length}</span> results
                            </p>

                            <div className="flex items-center">
                                <label htmlFor="sort" className="mr-2 text-gray-medium">Sort by:</label>
                                <select
                                    id="sort"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                >
                                    <option value="popularity">Most Popular</option>
                                    <option value="rating">Highest Rated</option>
                                    <option value="newest">Newest</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Course grid */}
                        {filteredCourses.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredCourses.map(course => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                                <FaTimes className="mx-auto text-4xl text-gray-400 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                                <p className="text-gray-medium mb-4">
                                    We couldn't find any courses matching your criteria.
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="btn btn-primary"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoursesPage;