import { Link } from 'react-router';

function CTASection() {
    return (
        <section className="py-16 bg-gradient-to-r from-primary to-blue-700 text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of students who are already learning on our platform. Start your journey today!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/courses" className="btn bg-white text-primary hover:bg-gray-100">
                            Browse Courses
                        </Link>
                        <Link to="/register" className="btn bg-secondary text-white hover:bg-secondary/90">
                            Sign Up for Free
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CTASection;