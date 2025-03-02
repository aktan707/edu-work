import { Link } from 'react-router';
import { FaHome, FaSearch } from 'react-icons/fa';

function NotFoundPage() {
    return (
        <div className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-9xl font-bold text-primary mb-6">404</h1>
                <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
                <p className="text-gray-medium max-w-md mx-auto mb-8">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <Link to="/" className="btn btn-primary">
                        <FaHome className="mr-2" />
                        Back to Home
                    </Link>
                    <Link to="/courses" className="btn btn-outline">
                        <FaSearch className="mr-2" />
                        Browse Courses
                    </Link>
                </div>

                <div className="max-w-md mx-auto">
                    <h3 className="font-semibold mb-4">You might be interested in:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link to="/courses" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            Popular Courses
                        </Link>
                        <Link to="/category/1" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            Web Development
                        </Link>
                        <Link to="/category/2" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            Design
                        </Link>
                        <Link to="/category/3" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            Business
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;