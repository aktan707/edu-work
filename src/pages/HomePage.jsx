import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import FeaturedCourses from '../components/FeaturedCourses';
import TestimonialsSection from '../components/TestimonialsSection';
import InstructorsSection from '../components/InstructorsSection';
import StatisticsSection from '../components/StatisticsSection';
import NewsletterSection from '../components/NewsletterSection';
import CTASection from '../components/CTASection';

function HomePage() {
    return (
        <div>
            <Hero />
            <CategorySection />
            <FeaturedCourses />
            <StatisticsSection />
            <TestimonialsSection />
            <InstructorsSection />
            <CTASection />
            <NewsletterSection />
        </div>
    );
}

export default HomePage;