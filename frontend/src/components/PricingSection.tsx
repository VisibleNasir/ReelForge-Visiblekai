'use client';

import { useState } from 'react';

const PricingSection = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const createOrder = async (plan: string, amount: number, credits: number) => {
    setLoading(plan);

    try {
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, amount, credits }),
      });

      const data = await res.json();

      if (!data.success) {
        alert("Failed to create order: " + (data.error || "Unknown error"));
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "ReelForge",
        description: `${credits} Credits - ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
        order_id: data.orderId,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                plan,
                credits
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              alert(`Payment Successful! ${credits} Credits have been added to your account.`);
              window.location.reload();
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            alert("Payment successful but verification failed.");
          }
        },
        theme: { color: "#7C3AED" },
      };

      const RazorpayConstructor = (window as any).Razorpay;

    if (!RazorpayConstructor) {
        alert("Razorpay SDK not loaded. Please refresh and try again.");
        return;
    }

    const rzp = new RazorpayConstructor(options);
    rzp.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="py-16 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-3">
            Buy Credits & Scale Faster
          </h2>
          <p className="text-lg text-gray-400">
            More credits = More AI clips, subtitles & viral moments
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Free Plan */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 flex flex-col">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-1">Free</h3>
              <div className="flex items-baseline">
                <span className="text-5xl font-bold">₹0</span>
              </div>
              <p className="text-emerald-400 text-lg font-medium">10 Credits</p>
            </div>
            
            <ul className="space-y-3 mb-8 flex-1 text-sm">
              <li className="flex items-center gap-2">✓ Limited Auto-Clipping</li>
              <li className="flex items-center gap-2">✓ Basic Subtitles</li>
              <li className="flex items-center gap-2">✓ Viral Moment Detection</li>
            </ul>
            
            <button className="w-full py-3.5 bg-zinc-800 hover:bg-zinc-700 rounded-2xl font-medium text-sm">
              Get Started Free
            </button>
          </div>

          {/* Starter Plan - Most Popular */}
          <div className="bg-zinc-900 border-2 border-purple-500 rounded-3xl p-6 flex flex-col relative scale-105 shadow-2xl">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-medium px-6 py-1.5 rounded-full">
              MOST POPULAR
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-1">Starter</h3>
              <div className="flex items-baseline">
                <span className="text-5xl font-bold">₹499</span>
                <span className="text-gray-400 ml-2 text-sm">/one-time</span>
              </div>
              <p className="text-emerald-400 text-lg font-medium">100 Credits</p>
            </div>
            
            <ul className="space-y-3 mb-8 flex-1 text-sm">
              <li className="flex items-center gap-2">✓ Unlimited Auto-Clipping</li>
              <li className="flex items-center gap-2">✓ Full Viral Moment Detection</li>
              <li className="flex items-center gap-2">✓ Beautiful Auto Subtitles</li>
              <li className="flex items-center gap-2">✓ Priority Processing</li>
            </ul>
            
            <button 
              onClick={() => createOrder('starter', 49900, 100)}
              disabled={loading === 'starter'}
              className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 rounded-2xl font-semibold text-base disabled:opacity-70"
            >
              {loading === 'starter' ? 'Processing...' : 'Buy 100 Credits'}
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 flex flex-col">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-1">Pro</h3>
              <div className="flex items-baseline">
                <span className="text-5xl font-bold">₹1,299</span>
                <span className="text-gray-400 ml-2 text-sm">/one-time</span>
              </div>
              <p className="text-emerald-400 text-lg font-medium">250 Credits</p>
            </div>
            
            <ul className="space-y-3 mb-8 flex-1 text-sm">
              <li className="flex items-center gap-2">✓ Everything in Starter</li>
              <li className="flex items-center gap-2">✓ Bulk Processing</li>
              <li className="flex items-center gap-2">✓ Advanced AI Features</li>
              <li className="flex items-center gap-2">✓ Early Access</li>
            </ul>
            
            <button 
              onClick={() => createOrder('pro', 129900, 250)}
              disabled={loading === 'pro'}
              className="w-full py-3.5 bg-white text-black hover:bg-gray-200 rounded-2xl font-semibold text-base disabled:opacity-70"
            >
              {loading === 'pro' ? 'Processing...' : 'Buy 250 Credits'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;