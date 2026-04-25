'use client';

import { useState } from 'react';

export default function TicketSubmissionPage() {
  const [formData, setFormData] = useState({ name: '', email: '', issue: '' });
  const [status, setStatus] = useState({ loading: false, message: '', error: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: 'Submitting ticket...', error: false });

    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to submit ticket');

      setFormData({ name: '', email: '', issue: '' });
      setStatus({ loading: false, message: 'Ticket submitted successfully! Our team will get back to you soon.', error: false });
    } catch (err) {
      setStatus({ loading: false, message: err.message, error: true });
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-blue-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">Submit a Support Ticket</h2>
          <p className="text-blue-100 mt-1">Fill out the form below and we'll route it to the right team.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
            <input
              required
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <input
              required
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Describe your issue</label>
            <textarea
              required
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              placeholder="Explain the problem you're experiencing..."
              value={formData.issue}
              onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
            ></textarea>
          </div>

          <button
            disabled={status.loading}
            className={`w-full py-4 rounded-lg font-bold text-white transition-all ${
              status.loading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'
            }`}
          >
            {status.loading ? 'Processing...' : 'Submit Ticket'}
          </button>

          {status.message && (
            <div className={`p-4 rounded-lg text-sm font-medium ${status.error ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
              {status.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
