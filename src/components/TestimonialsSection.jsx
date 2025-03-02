import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FaQuoteLeft } from 'react-icons/fa';
import coursesData from '../data/courses.json';

function TestimonialsSection() {
    return (
        <section className="py-16 bg-light">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
                    <p className="text-gray-medium max-w-2xl mx-auto">
                        Hear from our students about how our courses have helped them achieve their goals.
                    </p>
                </div>

                <Swiper
                    modules={[Pagination, Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    pagination={{ clickable: true }}
                    navigation
                    autoplay={{ delay: 5000 }}
                    className="testimonials-swiper"
                >
                    {coursesData.testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                            <div className="bg-white p-8 rounded-xl shadow-sm h-full flex flex-col">
                                <FaQuoteLeft className="text-primary/20 text-4xl mb-4" />
                                <p className="text-gray-dark mb-6 flex-grow">{testimonial.text}</p>
                                <div className="flex items-center">
                                    <img
                                        src={testimonial.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <h4 className="font-semibold">{testimonial.name}</h4>
                                        <p className="text-gray-medium text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

export default TestimonialsSection;