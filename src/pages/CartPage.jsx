import { useState } from 'react';
import { Link } from 'react-router';
import { FaTrash, FaPlus, FaMinus, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';

function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
    const [couponCode, setCouponCode] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const [discount, setDiscount] = useState(0);

    const handleApplyCoupon = (e) => {
        e.preventDefault();

        if (couponCode.toLowerCase() === 'welcome10') {
            setCouponApplied(true);
            setDiscount(totalPrice * 0.1); // 10% discount
            setCouponCode('');
        } else {
            alert('Invalid coupon code');
        }
    };

    const handleCheckout = () => {
        alert('Proceeding to checkout...');
        // Implement checkout logic
    };

    return (
        <div className="py-12">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">Your Shopping Cart</h1>
                    <Link to="/courses" className="text-primary hover:underline flex items-center">
                        <FaArrowLeft className="mr-2" />
                        Continue Shopping
                    </Link>
                </div>

                {cartItems.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items */}
                        <div className="lg:w-2/3">
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-semibold">{cartItems.length} Course{cartItems.length > 1 ? 's' : ''} in Cart</h2>
                                        <button
                                            onClick={clearCart}
                                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                                        >
                                            Clear Cart
                                        </button>
                                    </div>
                                </div>

                                <div className="divide-y divide-gray-200">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="p-6 flex flex-col sm:flex-row">
                                            <div className="sm:w-1/4 mb-4 sm:mb-0">
                                                <img
                                                    src={item.image || 'https://via.placeholder.com/200x120?text=Course+Image'}
                                                    alt={item.title}
                                                    className="w-full h-32 object-cover rounded-lg"
                                                />
                                            </div>

                                            <div className="sm:w-3/4 sm:pl-6 flex flex-col">
                                                <div className="flex justify-between mb-2">
                                                    <Link to={`/courses/${item.id}`} className="text-lg font-semibold hover:text-primary">
                                                        {item.title}
                                                    </Link>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-gray-400 hover:text-red-500"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>

                                                <p className="text-gray-medium text-sm mb-2">By {item.instructor}</p>

                                                <div className="mt-auto flex flex-wrap items-center justify-between">
                                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="px-3 py-1 text-gray-500 hover:bg-gray-100"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <FaMinus className={item.quantity <= 1 ? 'text-gray-300' : ''} />
                                                        </button>
                                                        <span className="px-3 py-1 border-l border-r border-gray-300">
                              {item.quantity}
                            </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="px-3 py-1 text-gray-500 hover:bg-gray-100"
                                                        >
                                                            <FaPlus />
                                                        </button>
                                                    </div>

                                                    <div className="text-right">
                                                        {item.discountPrice ? (
                                                            <div>
                                <span className="text-lg font-bold text-primary">
                                  ${(item.discountPrice * item.quantity).toFixed(2)}
                                </span>
                                                                <span className="text-sm text-gray-medium line-through ml-2">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                                                            </div>
                                                        ) : (
                                                            <span className="text-lg font-bold text-primary">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:w-1/3">
                            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-gray-medium">Subtotal</span>
                                        <span className="font-medium">${totalPrice.toFixed(2)}</span>
                                    </div>

                                    {couponApplied && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount (10%)</span>
                                            <span>-${discount.toFixed(2)}</span>
                                        </div>
                                    )}

                                    <div className="border-t border-gray-200 pt-4 flex justify-between font-bold">
                                        <span>Total</span>
                                        <span className="text-primary text-xl">
                      ${(totalPrice - discount).toFixed(2)}
                    </span>
                                    </div>
                                </div>

                                <form onSubmit={handleApplyCoupon} className="mb-6">
                                    <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                                        Apply Coupon
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            id="coupon"
                                            placeholder="Enter coupon code"
                                            className="flex-grow px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                        />
                                        <button
                                            type="submit"
                                            className="bg-primary text-white px-4 py-2 rounded-r-lg font-medium hover:bg-primary/90 transition-colors"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Try "WELCOME10" for 10% off
                                    </p>
                                </form>

                                <button
                                    onClick={handleCheckout}
                                    className="btn btn-primary w-full mb-4"
                                >
                                    Proceed to Checkout
                                </button>

                                <p className="text-sm text-gray-500 text-center">
                                    Secure checkout powered by Stripe
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaShoppingCart className="text-gray-400 text-3xl" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                        <p className="text-gray-medium mb-6">
                            Looks like you haven't added any courses to your cart yet.
                        </p>
                        <Link to="/courses" className="btn btn-primary">
                            Browse Courses
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CartPage;