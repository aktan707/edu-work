import { Link } from 'react-router';
import { FaStar, FaUserGraduate, FaPlayCircle } from 'react-icons/fa';
import coursesData from '../data/courses.json';

function InstructorsSection() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Meet Our Top Instructors</h2>
                    <p className="text-gray-medium max-w-2xl mx-auto">
                        Learn from industry experts who are passionate about teaching and helping you succeed.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {coursesData.instructors.map((instructor) => (
                        <div key={instructor.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
                            <div className="relative">
                                <img
                                    src={instructor.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(instructor.name)}&size=200&background=random`}
                                    alt={instructor.name}
                                    className="w-full h-64 object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Link to="#" className="btn bg-white text-primary hover:bg-gray-100">
                                        View Profile
                                    </Link>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-1">{instructor.name}</h3>
                                <p className="text-gray-medium mb-3">{instructor.role}</p>

                                <div className="flex items-center text-yellow-400 mb-4">
                                    <FaStar className="mr-1" />
                                    <span className="text-gray-dark">{instructor.rating.toFixed(1)}</span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <div className="flex items-center">
                                        <FaPlayCircle className="mr-1 text-primary" />
                                        <span>{instructor.courses} Courses</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaUserGraduate className="mr-1 text-primary" />
                                        <span>{instructor.students.toLocaleString()} Students</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default InstructorsSection;