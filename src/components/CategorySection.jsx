import { Link } from 'react-router';
import { FaCode, FaPalette, FaBriefcase, FaBullhorn, FaCamera, FaLanguage } from 'react-icons/fa';
import coursesData from '../data/courses.json';

// Map category icons to components
const categoryIcons = {
    FaCode,
    FaPalette,
    FaBriefcase,
    FaBullhorn,
    FaCamera,
    FaLanguage
};

function CategorySection() {
    return (
        <section className="py-16 bg-light">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Browse Top Categories</h2>
                    <p className="text-gray-medium max-w-2xl mx-auto">
                        Explore our most popular course categories. We offer a wide range of courses to help you achieve your goals.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {coursesData.categories.map((category) => {
                        const IconComponent = categoryIcons[category.icon];

                        return (
                            <Link
                                key={category.id}
                                to={`/category/${category.id}`}
                                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 group"
                            >
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                                    {IconComponent && <IconComponent className="w-8 h-8 text-primary" />}
                                </div>
                                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                                <p className="text-gray-medium text-sm">
                                    {coursesData.courses.filter(course => course.categoryId === category.id).length} Courses
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default CategorySection;