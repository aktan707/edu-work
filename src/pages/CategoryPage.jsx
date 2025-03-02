import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { FaArrowRight } from 'react-icons/fa';
import CourseCard from '../components/CourseCard';
import coursesData from '../data/courses.json';

function CategoryPage() {
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Find category by ID
        const foundCategory = coursesData.categories.find(c => c.id === parseInt(categoryId));
        if (foundCategory) {
            setCategory(foundCategory);

            // Filter courses by category
            const filteredCourses = coursesData.courses.filter(
                course => course.categoryId === parseInt(categoryId)
            );
            setCourses(filteredCourses);
        }

        // Scroll to top
        window.scrollTo(0, 0);
    }, [categoryId]);

    if (!category) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Loading category...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="py-12">
            {/* Category Header */}
            <div className="bg-primary text-white py-12 mb-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <div className="mb-4">
                            <Link to="/courses" className="text-blue-200 hover:text-white">
                                Courses
                            </Link>
                            {' > '}
                            <span>{category.name}</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold mb-4">{category.name} Courses</h1>

                        <p className="text-xl text-blue-100 mb-6">
                            {category.description}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link to="/courses" className="btn bg-white text-primary hover:bg-gray-100">
                                Browse All Courses
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Listing */}
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">All {category.name} Courses</h2>
                    <p className="text-gray-medium">
                        {courses.length} courses available in this category
                    </p>
                </div>

                {courses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {courses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                        <p className="text-gray-medium mb-4">
                            We couldn't find any courses in this category.
                        </p>
                        <Link to="/courses" className="btn btn-primary">
                            Browse All Courses
                        </Link>
                    </div>
                )}

                {/* Learning Path */}
                <div className="mt-16 bg-white rounded-xl shadow-sm p-8">
                    <h2 className="text-2xl font-bold mb-6">Learning Path: {category.name}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <span className="text-primary font-bold text-xl">1</span>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Beginner Level</h3>
                            <p className="text-gray-medium mb-4">
                                Start with the fundamentals and build a solid foundation.
                            </p>
                            <Link to="#" className="text-primary font-medium flex items-center hover:underline">
                                View Beginner Courses <FaArrowRight className="ml-2" />
                            </Link>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <span className="text-primary font-bold text-xl">2</span>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Intermediate Level</h3>
                            <p className="text-gray-medium mb-4">
                                Enhance your skills with more advanced concepts and techniques.
                            </p>
                            <Link to="#" className="text-primary font-medium flex items-center hover:underline">
                                View Intermediate Courses <FaArrowRight className="ml-2" />
                            </Link>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <span className="text-primary font-bold text-xl">3</span>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Advanced Level</h3>
                            <p className="text-gray-medium mb-4">
                                Master complex topics and become an expert in the field.
                            </p>
                            <Link to="#" className="text-primary font-medium flex items-center hover:underline">
                                View Advanced Courses <FaArrowRight className="ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryPage;