'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Transaction = {
  id: string;
  date: string;
  plan: string;
  amount: number;
  credits: number;
  status: string;
  paymentId?: string;
};

const BillingPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const [currentPlan, setCurrentPlan] = useState("Free");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBillingData();
  }, []);

  const fetchBillingData = async () => {
    try {
      const res = await fetch('/api/billing/history', { cache: 'no-store' });
      const data = await res.json();

      if (data.success) {
        setTransactions(data.transactions || []);
        setTotalCredits(data.totalCredits || 0);
        setCurrentPlan(data.currentPlan || "Free");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToPricing = () => {
    window.location.href = '/#pricing';
  };

  return (
    <div 
      suppressHydrationWarning={true}   
      className="min-h-screen bg-black text-white"
    >
      {/* Top Bar */}
      <div className="border-b border-zinc-800 bg-zinc-950 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Billing</h1>
          <div className="flex items-center gap-6">
            <div className="bg-zinc-900 px-5 py-2.5 rounded-2xl text-sm font-medium">
              Credits: <span className="text-emerald-400">{totalCredits}</span>
            </div>
            <Link href="/user/dashboard" className="text-gray-400 hover:text-white">← Dashboard</Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-zinc-900 rounded-3xl p-8">
            <p className="text-gray-400">Current Balance</p>
            <p className="text-6xl font-bold text-emerald-400 mt-2">{totalCredits}</p>
            <p className="text-gray-500">Credits Available</p>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-8">
            <p className="text-gray-400">Current Plan</p>
            <p className="text-4xl font-semibold mt-3 capitalize">{currentPlan}</p>
            <p className="text-emerald-400 mt-1">₹499 • One-time</p>
            
            <button 
              onClick={scrollToPricing}
              className="mt-6 bg-purple-600 hover:bg-purple-700 px-8 py-3.5 rounded-2xl font-semibold w-full md:w-auto"
            >
              Upgrade Plan →
            </button>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-zinc-900 rounded-3xl p-8">
          <h2 className="text-2xl font-semibold mb-6">Payment History</h2>

          {loading ? (
            <p className="text-center py-12 text-gray-400">Loading...</p>
          ) : transactions.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400">No transactions yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="py-4 px-6 text-gray-400 font-medium">Date</th>
                    <th className="py-4 px-6 text-gray-400 font-medium">Plan</th>
                    <th className="py-4 px-6 text-gray-400 font-medium">Amount</th>
                    <th className="py-4 px-6 text-gray-400 font-medium">Credits</th>
                    <th className="py-4 px-6 text-gray-400 font-medium">Status</th>
                    <th className="py-4 px-6 text-gray-400 font-medium">Payment ID</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                      <td className="py-4 px-6">{new Date(t.date).toLocaleDateString('en-IN')}</td>
                      <td className="py-4 px-6 font-medium capitalize">{t.plan}</td>
                      <td className="py-4 px-6">₹{t.amount}</td>
                      <td className="py-4 px-6 text-emerald-400">{t.credits}</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                          {t.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-400 text-sm font-mono">{t.paymentId || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
