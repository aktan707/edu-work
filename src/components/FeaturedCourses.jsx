import { useState } from 'react';
import CourseCard from './CourseCard';
import coursesData from '../data/courses.json';

function FeaturedCourses() {
    const [activeTab, setActiveTab] = useState('popular');

    // Filter courses based on active tab
    const getFilteredCourses = () => {
        const courses = coursesData.courses;

        switch (activeTab) {
            case 'popular':
                return [...courses].sort((a, b) => b.studentsCount - a.studentsCount).slice(0, 8);
            case 'trending':
                return [...courses].sort((a, b) => b.rating - a.rating).slice(0, 8);
            case 'new':
                return [...courses].sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)).slice(0, 8);
            default:
                return courses.slice(0, 8);
        }
    };

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Featured Courses</h2>
                        <p className="text-gray-medium max-w-2xl">
                            Explore our most popular courses and find the perfect one for you.
                        </p>
                    </div>

                    <div className="flex space-x-2 mt-6 md:mt-0">
                        <button
                            onClick={() => setActiveTab('popular')}
                            className={`px-4 py-2 rounded-lg font-medium ${
                                activeTab === 'popular'
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-light text-gray-dark hover:bg-gray-200'
                            }`}
                        >
                            Popular
                        </button>
                        <button
                            onClick={() => setActiveTab('trending')}
                            className={`px-4 py-2 rounded-lg font-medium ${
                                activeTab === 'trending'
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-light text-gray-dark hover:bg-gray-200'
                            }`}
                        >
                            Trending
                        </button>
                        <button
                            onClick={() => setActiveTab('new')}
                            className={`px-4 py-2 rounded-lg font-medium ${
                                activeTab === 'new'
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-light text-gray-dark hover:bg-gray-200'
                            }`}
                        >
                            New
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {getFilteredCourses().map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturedCourses;