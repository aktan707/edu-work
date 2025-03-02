import { useState } from 'react';

function NewsletterSection() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement newsletter subscription
        console.log('Subscribing email:', email);
        setEmail('');
        alert('Thank you for subscribing to our newsletter!');
    };

    return (
        <section className="py-16 bg-primary text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                    <p className="text-blue-100 mb-8">
                        Get the latest updates on new courses, special offers, and educational resources delivered straight to your inbox.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-grow px-4 py-3 rounded-lg text-gray-dark focus:outline-none focus:ring-2 focus:ring-blue-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="btn bg-secondary text-white hover:bg-secondary/90 px-8"
                        >
                            Subscribe
                        </button>
                    </form>

                    <p className="text-sm text-blue-200 mt-4">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default NewsletterSection;