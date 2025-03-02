import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { FaStar, FaUser, FaClock, FaGlobe, FaCalendarAlt, FaChevronDown, FaChevronUp, FaCheck, FaShoppingCart, FaPlayCircle } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import coursesData from '../data/courses.json';

function CourseDetailsPage() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [expandedSections, setExpandedSections] = useState({});
    const { addToCart, cartItems } = useCart();

    useEffect(() => {
        // Find course by ID
        const foundCourse = coursesData.courses.find(c => c.id === parseInt(courseId));
        if (foundCourse) {
            setCourse(foundCourse);

            // Initialize expanded sections
            const sections = {};
            foundCourse.curriculum.forEach((section, index) => {
                sections[index] = index === 0; // Expand first section by default
            });
            setExpandedSections(sections);
        }

        // Scroll to top
        window.scrollTo(0, 0);
    }, [courseId]);

    const toggleSection = (index) => {
        setExpandedSections(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const isInCart = () => {
        return cartItems.some(item => item.id === parseInt(courseId));
    };

    const handleAddToCart = () => {
        if (course) {
            addToCart(course);
        }
    };

    if (!course) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Loading course details...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="py-12">
            {/* Course Header */}
            <div className="bg-primary text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-2/3">
                            <div className="mb-4">
                                <Link to="/courses" className="text-blue-200 hover:text-white">
                                    Courses
                                </Link>
                                {' > '}
                                <Link
                                    to={`/category/${course.categoryId}`}
                                    className="text-blue-200 hover:text-white"
                                >
                                    {coursesData.categories.find(c => c.id === course.categoryId)?.name}
                                </Link>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>

                            <p className="text-xl text-blue-100 mb-6">{course.description}</p>

                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <div className="flex items-center">
                                    <div className="flex items-center text-yellow-400 mr-2">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-blue-300'}`} />
                                        ))}
                                    </div>
                                    <span>{course.rating} ({course.reviewCount} reviews)</span>
                                </div>

                                <div className="flex items-center">
                                    <FaUser className="mr-2" />
                                    <span>{course.studentsCount.toLocaleString()} students</span>
                                </div>

                                <div className="flex items-center">
                                    <FaCalendarAlt className="mr-2" />
                                    <span>Last updated: {course.lastUpdated}</span>
                                </div>

                                <div className="flex items-center">
                                    <FaGlobe className="mr-2" />
                                    <span>{course.language}</span>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor)}&size=40&background=random`}
                                    alt={course.instructor}
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <span>Created by <span className="font-medium">{course.instructor}</span></span>
                            </div>
                        </div>

                        <div className="lg:w-1/3">
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden text-gray-dark">
                                <div className="relative">
                                    <img
                                        src={course.image || 'https://via.placeholder.com/600x400?text=Course+Image'}
                                        alt={course.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <FaPlayCircle className="text-white text-5xl" />
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="mb-6">
                                        {course.discountPrice ? (
                                            <div className="flex items-center">
                                                <span className="text-3xl font-bold text-primary mr-3">${course.discountPrice.toFixed(2)}</span>
                                                <span className="text-xl text-gray-medium line-through">${course.price.toFixed(2)}</span>
                                                <span className="ml-3 bg-secondary text-white text-sm font-bold px-2 py-1 rounded">
                          {Math.round((1 - course.discountPrice / course.price) * 100)}% OFF
                        </span>
                                            </div>
                                        ) : (
                                            <span className="text-3xl font-bold text-primary">${course.price.toFixed(2)}</span>
                                        )}
                                    </div>

                                    {isInCart() ? (
                                        <Link to="/cart" className="btn bg-gray-800 text-white hover:bg-gray-700 w-full mb-4">
                                            Go to Cart
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={handleAddToCart}
                                            className="btn btn-primary w-full mb-4"
                                        >
                                            <FaShoppingCart className="mr-2" />
                                            Add to Cart
                                        </button>
                                    )}

                                    <button className="btn btn-outline w-full">
                                        Buy Now
                                    </button>

                                    <div className="mt-6 text-center">
                                        <p className="text-gray-medium text-sm mb-1">30-Day Money-Back Guarantee</p>
                                        <p className="text-gray-medium text-sm">Full Lifetime Access</p>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 p-6">
                                    <h3 className="font-semibold mb-4">This course includes:</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center">
                                            <FaClock className="text-gray-medium mr-3" />
                                            <span>{course.duration} of on-demand video</span>
                                        </li>
                                        {course.features.map((feature, index) => (
                                            <li key={index} className="flex items-center">
                                                <FaCheck className="text-primary mr-3" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3">
                        {/* Tabs */}
                        <div className="bg-white rounded-xl shadow-sm mb-8">
                            <div className="border-b border-gray-200">
                                <div className="flex overflow-x-auto">
                                    <button
                                        onClick={() => setActiveTab('overview')}
                                        className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                                            activeTab === 'overview'
                                                ? 'border-b-2 border-primary text-primary'
                                                : 'text-gray-medium hover:text-gray-dark'
                                        }`}
                                    >
                                        Overview
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('curriculum')}
                                        className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                                            activeTab === 'curriculum'
                                                ? 'border-b-2 border-primary text-primary'
                                                : 'text-gray-medium hover:text-gray-dark'
                                        }`}
                                    >
                                        Curriculum
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('instructor')}
                                        className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                                            activeTab === 'instructor'
                                                ? 'border-b-2 border-primary text-primary'
                                                : 'text-gray-medium hover:text-gray-dark'
                                        }`}
                                    >
                                        Instructor
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('reviews')}
                                        className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                                            activeTab === 'reviews'
                                                ? 'border-b-2 border-primary text-primary'
                                                : 'text-gray-medium hover:text-gray-dark'
                                        }`}
                                    >
                                        Reviews
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Overview Tab */}
                                {activeTab === 'overview' && (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                                        <p className="text-gray-dark mb-6">{course.description}</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h3 className="font-semibold mb-2">What you'll learn</h3>
                                                <ul className="space-y-2">
                                                    {course.curriculum.flatMap(section =>
                                                        section.lessons.slice(0, 2).map((lesson, index) => (
                                                            <li key={index} className="flex items-start">
                                                                <FaCheck className="text-primary mt-1 mr-2" />
                                                                <span>{lesson}</span>
                                                            </li>
                                                        ))
                                                    )}
                                                </ul>
                                            </div>

                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h3 className="font-semibold mb-2">Course Details</h3>
                                                <ul className="space-y-2">
                                                    <li className="flex items-center justify-between">
                                                        <span className="text-gray-medium">Level:</span>
                                                        <span className="font-medium">{course.level}</span>
                                                    </li>
                                                    <li className="flex items-center justify-between">
                                                        <span className="text-gray-medium">Duration:</span>
                                                        <span className="font-medium">{course.duration}</span>
                                                    </li>
                                                    <li className="flex items-center justify-between">
                                                        <span className="text-gray-medium">Language:</span>
                                                        <span className="font-medium">{course.language}</span>
                                                    </li>
                                                    <li className="flex items-center justify-between">
                                                        <span className="text-gray-medium">Last Updated:</span>
                                                        <span className="font-medium">{course.lastUpdated}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="mb-8">
                                            <h3 className="text-xl font-bold mb-4">Requirements</h3>
                                            <ul className="list-disc pl-5 space-y-2 text-gray-dark">
                                                <li>Basic computer knowledge</li>
                                                <li>No prior experience required - we'll teach you everything you need to know</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold mb-4">Who this course is for</h3>
                                            <ul className="list-disc pl-5 space-y-2 text-gray-dark">
                                                <li>Anyone interested in learning {coursesData.categories.find(c => c.id === course.categoryId)?.name}</li>
                                                <li>Beginners with no prior experience</li>
                                                <li>Intermediate learners looking to refresh their knowledge</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {/* Curriculum Tab */}
                                {activeTab === 'curriculum' && (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
                                        <p className="text-gray-medium mb-6">
                                            {course.curriculum.length} sections • {course.curriculum.reduce((total, section) => total + section.lessons .length, 0)} lessons • {course.duration} total length
                                        </p>

                                        <div className="space-y-4">
                                            {course.curriculum.map((section, sectionIndex) => (
                                                <div key={sectionIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                                                    <button
                                                        onClick={() => toggleSection(sectionIndex)}
                                                        className="w-full flex items-center justify-between bg-gray-50 p-4 hover:bg-gray-100 transition-colors"
                                                    >
                                                        <div className="flex items-center">
                                                            {expandedSections[sectionIndex] ? (
                                                                <FaChevronUp className="text-gray-400 mr-2" />
                                                            ) : (
                                                                <FaChevronDown className="text-gray-400 mr-2" />
                                                            )}
                                                            <span className="font-medium">{section.title}</span>
                                                        </div>
                                                        <span className="text-sm text-gray-medium">{section.lessons.length} lessons</span>
                                                    </button>

                                                    {expandedSections[sectionIndex] && (
                                                        <div className="p-4 border-t border-gray-200">
                                                            <ul className="space-y-3">
                                                                {section.lessons.map((lesson, lessonIndex) => (
                                                                    <li key={lessonIndex} className="flex items-center">
                                                                        <FaPlayCircle className="text-primary mr-3" />
                                                                        <span>{lesson}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Instructor Tab */}
                                {activeTab === 'instructor' && (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-6">Meet Your Instructor</h2>

                                        {coursesData.instructors
                                            .filter(instructor => instructor.name === course.instructor)
                                            .map(instructor => (
                                                <div key={instructor.id} className="flex flex-col md:flex-row gap-6">
                                                    <div className="md:w-1/4">
                                                        <img
                                                            src={instructor.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(instructor.name)}&size=200&background=random`}
                                                            alt={instructor.name}
                                                            className="w-full rounded-lg"
                                                        />
                                                    </div>

                                                    <div className="md:w-3/4">
                                                        <h3 className="text-xl font-semibold mb-2">{instructor.name}</h3>
                                                        <p className="text-gray-medium mb-4">{instructor.role}</p>

                                                        <div className="flex items-center gap-6 mb-4">
                                                            <div className="flex items-center">
                                                                <FaStar className="text-yellow-400 mr-2" />
                                                                <span>{instructor.rating.toFixed(1)} Instructor Rating</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <FaUser className="text-gray-400 mr-2" />
                                                                <span>{instructor.students.toLocaleString()} Students</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <FaPlayCircle className="text-gray-400 mr-2" />
                                                                <span>{instructor.courses} Courses</span>
                                                            </div>
                                                        </div>

                                                        <p className="text-gray-dark mb-6">{instructor.bio}</p>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                )}

                                {/* Reviews Tab */}
                                {activeTab === 'reviews' && (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>

                                        <div className="flex flex-col md:flex-row gap-8 mb-8">
                                            <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg text-center">
                                                <div className="text-5xl font-bold text-primary mb-2">{course.rating}</div>
                                                <div className="flex items-center justify-center mb-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar key={i} className={`w-5 h-5 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                                                    ))}
                                                </div>
                                                <p className="text-gray-medium">Course Rating</p>
                                            </div>

                                            <div className="md:w-2/3">
                                                <div className="space-y-3">
                                                    {[5, 4, 3, 2, 1].map(stars => {
                                                        // Calculate percentage (mock data)
                                                        const percentage = stars === 5 ? 78 :
                                                            stars === 4 ? 15 :
                                                                stars === 3 ? 5 :
                                                                    stars === 2 ? 1 : 1;

                                                        return (
                                                            <div key={stars} className="flex items-center">
                                                                <div className="flex items-center w-28">
                                                                    <span className="mr-2">{stars}</span>
                                                                    <div className="flex">
                                                                        {[...Array(5)].map((_, i) => (
                                                                            <FaStar key={i} className={`w-4 h-4 ${i < stars ? 'text-yellow-400' : 'text-gray-300'}`} />
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                <div className="w-full h-2 bg-gray-200 rounded-full mx-3">
                                                                    <div
                                                                        className="h-2 bg-yellow-400 rounded-full"
                                                                        style={{ width: `${percentage}%` }}
                                                                    ></div>
                                                                </div>

                                                                <span className="text-gray-medium w-12">{percentage}%</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            {coursesData.testimonials.slice(0, 3).map(testimonial => (
                                                <div key={testimonial.id} className="border-b border-gray-200 pb-6">
                                                    <div className="flex items-start">
                                                        <img
                                                            src={testimonial.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`}
                                                            alt={testimonial.name}
                                                            className="w-12 h-12 rounded-full object-cover mr-4"
                                                        />
                                                        <div>
                                                            <h4 className="font-semibold">{testimonial.name}</h4>
                                                            <div className="flex items-center mt-1 mb-2">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <FaStar key={i} className="w-4 h-4 text-yellow-400 mr-1" />
                                                                ))}
                                                                <span className="text-gray-medium text-sm ml-2">1 month ago</span>
                                                            </div>
                                                            <p className="text-gray-dark">{testimonial.text}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/3">
                        {/* Related Courses */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-xl font-bold mb-4">Related Courses</h3>

                            <div className="space-y-4">
                                {coursesData.courses
                                    .filter(c => c.categoryId === course.categoryId && c.id !== course.id)
                                    .slice(0, 3)
                                    .map(relatedCourse => (
                                        <Link key={relatedCourse.id} to={`/courses/${relatedCourse.id}`} className="flex group">
                                            <img
                                                src={relatedCourse.image || 'https://via.placeholder.com/100?text=Course'}
                                                alt={relatedCourse.title}
                                                className="w-20 h-20 object-cover rounded-lg mr-4"
                                            />
                                            <div>
                                                <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                                                    {relatedCourse.title}
                                                </h4>
                                                <div className="flex items-center mt-1">
                                                    <div className="flex items-center text-yellow-400 mr-2">
                                                        <FaStar className="w-3 h-3" />
                                                        <span className="text-sm ml-1">{relatedCourse.rating}</span>
                                                    </div>
                                                    <span className="text-sm text-gray-medium">
                            ({relatedCourse.reviewCount})
                          </span>
                                                </div>
                                                <div className="text-primary font-medium text-sm mt-1">
                                                    ${relatedCourse.discountPrice || relatedCourse.price}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseDetailsPage;