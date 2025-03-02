import { Link } from 'react-router';
import { FaStar, FaUser, FaClock } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';

function CourseCard({ course }) {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(course);
    };

    return (
        <div className="card group">
            <Link to={`/courses/${course.id}`} className="block">
                <div className="relative">
                    <img
                        src={course.image || 'https://via.placeholder.com/400x225?text=Course+Image'}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                    />
                    {course.discountPrice && (
                        <div className="absolute top-4 right-4 bg-secondary text-white text-sm font-bold px-2 py-1 rounded">
                            {Math.round((1 - course.discountPrice / course.price) * 100)}% OFF
                        </div>
                    )}
                </div>

                <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {course.title}
                    </h3>

                    <div className="flex items-center text-sm text-gray-medium mb-3">
                        <span>By {course.instructor}</span>
                    </div>

                    <div className="flex items-center mb-3">
                        <div className="flex items-center text-yellow-400 mr-2">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                        </div>
                        <span className="text-sm text-gray-medium">
              {course.rating} ({course.reviewCount} reviews)
            </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-medium mb-4">
                        <div className="flex items-center">
                            <FaUser className="mr-1" />
                            <span>{course.studentsCount.toLocaleString()} students</span>
                        </div>
                        <div className="flex items-center">
                            <FaClock className="mr-1" />
                            <span>{course.duration}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            {course.discountPrice ? (
                                <div className="flex items-center">
                                    <span className="text-lg font-bold text-primary mr-2">${course.discountPrice.toFixed(2)}</span>
                                    <span className="text-sm text-gray-medium line-through">${course.price.toFixed(2)}</span>
                                </div>
                            ) : (
                                <span className="text-lg font-bold text-primary">${course.price.toFixed(2)}</span>
                            )}
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="btn btn-outline py-1 px-3 text-sm"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default CourseCard;