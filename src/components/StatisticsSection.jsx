import { FaUserGraduate, FaBook, FaChalkboardTeacher, FaGlobe } from 'react-icons/fa';

function StatisticsSection() {
    const stats = [
        {
            icon: FaUserGraduate,
            count: '100,000+',
            label: 'Students',
        },
        {
            icon: FaBook,
            count: '500+',
            label: 'Courses',
        },
        {
            icon: FaChalkboardTeacher,
            count: '150+',
            label: 'Instructors',
        },
        {
            icon: FaGlobe,
            count: '50+',
            label: 'Countries',
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                                <stat.icon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-3xl font-bold mb-2">{stat.count}</h3>
                            <p className="text-gray-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default StatisticsSection;