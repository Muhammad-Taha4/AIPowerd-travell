'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaLock, FaCreditCard, FaPlane, FaHotel, FaCheck, FaArrowRight, FaShieldAlt, FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const bookingSteps = ['Traveler Details', 'Payment', 'Confirmation'];

export default function CheckoutPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        passportNumber: '',
        nationality: '',
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: '',
        billingAddress: '',
        specialRequests: '',
    });

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 2));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const handlePayment = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/booking/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer placeholder'
                },
                body: JSON.stringify({ package_id: 'sample-p1' }) // Mocking package_id
            });
            if (res.ok) {
                const data = await res.json();
                if (data.checkout_url) {
                    window.location.href = data.checkout_url;
                } else {
                    nextStep(); // Fallback if local/mock
                }
            }
        } catch (err) {
            console.error('Payment initialization failed');
            nextStep(); // Fallback for demo
        }
    };

    const booking = {
        package: 'Bali Escape',
        room: 'Ocean View Suite',
        travelers: '2 Adults, 1 King Bed',
        flight: 'FX-204',
        flightDetails: 'Direct • 14h 30m',
        dates: 'Mar 15 - Mar 22, 2024',
        subtotal: 4299,
        taxes: 430,
        serviceFee: 299,
        insurance: 0,
        total: 5028,
        ref: 'FX-8829-BK',
    };

    return (
        <div className="min-h-screen pt-8 pb-20" style={{ background: '#0a0e1a' }}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-4 mb-10">
                    {bookingSteps.map((step, i) => (
                        <React.Fragment key={i}>
                            <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i <= currentStep
                                    ? 'text-white'
                                    : 'text-slate-500'
                                    }`} style={i <= currentStep ? { background: 'linear-gradient(135deg, #2463eb, #3b82f6)' } : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    {i < currentStep ? <FaCheck className="text-xs" /> : i + 1}
                                </div>
                                <span className={`hidden sm:block text-sm font-semibold ${i <= currentStep ? 'text-white' : 'text-slate-500'}`}>{step}</span>
                            </div>
                            {i < bookingSteps.length - 1 && (
                                <div className="w-16 h-0.5 rounded-full" style={{ background: i < currentStep ? '#2463eb' : 'rgba(255,255,255,0.08)' }} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Area */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            {/* Step 1: Traveler Details */}
                            {currentStep === 0 && (
                                <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                    <div className="p-6 rounded-2xl" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(36,99,235,0.15)' }}>
                                                <FaUser className="text-blue-400" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold text-white">Traveler Details</h2>
                                                <p className="text-sm text-slate-400">Please enter traveler information</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-2">First Name</label>
                                                <input type="text" value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)}
                                                    placeholder="John" className="input-dark" />
                                            </div>
                                            <div>
                                                <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-2">Last Name</label>
                                                <input type="text" value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)}
                                                    placeholder="Doe" className="input-dark" />
                                            </div>
                                            <div>
                                                <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-2">Email Address</label>
                                                <div className="relative">
                                                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                                                    <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)}
                                                        placeholder="john@example.com" className="input-dark pl-10" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-2">Phone Number</label>
                                                <div className="relative">
                                                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                                                    <input type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)}
                                                        placeholder="+1 (555) 000-0000" className="input-dark pl-10" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-2">Passport Number</label>
                                                <input type="text" value={formData.passportNumber} onChange={(e) => handleChange('passportNumber', e.target.value)}
                                                    placeholder="AB1234567" className="input-dark" />
                                            </div>
                                            <div>
                                                <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-2">Nationality</label>
                                                <select value={formData.nationality} onChange={(e) => handleChange('nationality', e.target.value)} className="input-dark">
                                                    <option value="">Select country</option>
                                                    <option value="US">United States</option>
                                                    <option value="UK">United Kingdom</option>
                                                    <option value="CA">Canada</option>
                                                    <option value="AU">Australia</option>
                                                    <option value="DE">Germany</option>
                                                    <option value="FR">France</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-2">Special Requests</label>
                                            <textarea value={formData.specialRequests} onChange={(e) => handleChange('specialRequests', e.target.value)}
                                                placeholder="Any dietary requirements, accessibility needs, or preferences..."
                                                className="input-dark resize-none h-24" />
                                        </div>

                                        <div className="flex justify-end mt-6">
                                            <button onClick={nextStep}
                                                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-all hover:-translate-y-0.5"
                                                style={{ background: 'linear-gradient(135deg, #2463eb, #3b82f6)', boxShadow: '0 4px 20px rgba(36,99,235,0.3)' }}>
                                                Continue to Payment <FaArrowRight className="text-sm" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 2: Payment */}
                            {currentStep === 1 && (
                                <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                    <div className="p-6 rounded-2xl" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(36,99,235,0.15)' }}>
                                                <FaCreditCard className="text-blue-400" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold text-white">Payment Details</h2>
                                                <p className="text-sm text-slate-400 flex items-center gap-1">
                                                    <FaLock className="text-xs text-green-400" /> Your payment information is encrypted and secure.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Payment methods */}
                                        <div className="flex gap-3 mb-6 mt-4">
                                            {['Credit Card', 'PayPal', 'Apple Pay'].map((method, i) => (
                                                <button key={i} className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${i === 0 ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                                                    }`}
                                                    style={i === 0 ? { background: 'rgba(36,99,235,0.2)', border: '1px solid rgba(36,99,235,0.3)' } : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                                    {method}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-2">Card Number</label>
                                                <div className="relative">
                                                    <FaCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                                                    <input type="text" value={formData.cardNumber} onChange={(e) => handleChange('cardNumber', e.target.value)}
                                                        placeholder="1234 5678 9012 3456" className="input-dark pl-10" maxLength={19} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-2">Name on Card</label>
                                                <input type="text" value={formData.cardName} onChange={(e) => handleChange('cardName', e.target.value)}
                                                    placeholder="JOHN DOE" className="input-dark" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-2">Expiry Date</label>
                                                    <input type="text" value={formData.expiry} onChange={(e) => handleChange('expiry', e.target.value)}
                                                        placeholder="MM/YY" className="input-dark" maxLength={5} />
                                                </div>
                                                <div>
                                                    <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-2">CVV</label>
                                                    <input type="text" value={formData.cvv} onChange={(e) => handleChange('cvv', e.target.value)}
                                                        placeholder="123" className="input-dark" maxLength={4} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-2">Billing Address</label>
                                                <input type="text" value={formData.billingAddress} onChange={(e) => handleChange('billingAddress', e.target.value)}
                                                    placeholder="123 Main Street, City, Country" className="input-dark" />
                                            </div>
                                        </div>

                                        {/* Security notice */}
                                        <div className="flex items-center gap-3 p-3 rounded-xl mt-4" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)' }}>
                                            <FaShieldAlt className="text-green-400 text-sm shrink-0" />
                                            <p className="text-xs text-green-300/80">256-bit SSL encryption. Your card details are never stored on our servers.</p>
                                        </div>

                                        <div className="flex justify-between mt-6">
                                            <button onClick={prevStep}
                                                className="px-5 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-white transition-colors"
                                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                                Back
                                            </button>
                                            <button onClick={handlePayment}
                                                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-all hover:-translate-y-0.5"
                                                style={{ background: 'linear-gradient(135deg, #2463eb, #3b82f6)', boxShadow: '0 4px 20px rgba(36,99,235,0.3)' }}>
                                                <FaLock className="text-xs" /> Pay ${booking.total.toLocaleString()}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 3: Confirmation */}
                            {currentStep === 2 && (
                                <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                                    <div className="p-8 rounded-2xl text-center" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                                        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow"
                                            style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}>
                                            <FaCheckCircle className="text-white text-3xl" />
                                        </div>
                                        <h2 className="text-3xl font-black text-white mb-2">Booking Confirmed!</h2>
                                        <p className="text-slate-400 mb-6">Thank you for booking with Fusix. Your confirmation email is on its way.</p>

                                        <div className="inline-block p-4 rounded-xl mb-8" style={{ background: 'rgba(36,99,235,0.1)', border: '1px solid rgba(36,99,235,0.2)' }}>
                                            <span className="text-xs text-slate-400 uppercase tracking-wider">Booking Reference</span>
                                            <p className="text-2xl font-black text-blue-400 mt-1">{booking.ref}</p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                            <Link href="/my-trip" className="btn-primary inline-flex items-center justify-center gap-2">
                                                Track Your Trip <FaArrowRight />
                                            </Link>
                                            <Link href="/" className="btn-secondary inline-flex items-center justify-center gap-2">
                                                Back to Home
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28">
                            <div className="p-6 rounded-2xl" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>

                                {/* Package Info */}
                                <div className="space-y-3 mb-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(36,99,235,0.15)' }}>
                                            <FaHotel className="text-blue-400 text-sm" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">{booking.package}</p>
                                            <p className="text-xs text-slate-400">{booking.room}</p>
                                            <p className="text-xs text-slate-500">{booking.travelers}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(36,99,235,0.15)' }}>
                                            <FaPlane className="text-blue-400 text-sm" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">Flight {booking.flight}</p>
                                            <p className="text-xs text-slate-400">{booking.flightDetails}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(36,99,235,0.15)' }}>
                                            <FaCalendarAlt className="text-blue-400 text-sm" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">{booking.dates}</p>
                                            <p className="text-xs text-slate-400">7 nights</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Pricing */}
                                <div className="pt-4 space-y-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Subtotal</span>
                                        <span className="text-white">${booking.subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Taxes & fees</span>
                                        <span className="text-white">${booking.taxes}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Service fee</span>
                                        <span className="text-white">${booking.serviceFee}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Insurance</span>
                                        <span className="text-green-400">Included</span>
                                    </div>
                                    <div className="pt-3 mt-2 flex justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                        <span className="text-sm font-bold text-white">Total</span>
                                        <span className="text-xl font-black text-blue-400">${booking.total.toLocaleString()}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 text-center mt-1">Includes all applicable taxes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-16 py-8 px-4 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <p className="text-xs text-slate-600">© 2024 Fusix Travel. All rights reserved.</p>
                <div className="flex justify-center gap-4 mt-2">
                    {['Privacy Policy', 'Terms of Service', 'Support'].map(s => (
                        <a key={s} href="#" className="text-xs text-slate-500 hover:text-blue-400 transition-colors">{s}</a>
                    ))}
                </div>
            </footer>
        </div>
    );
}
