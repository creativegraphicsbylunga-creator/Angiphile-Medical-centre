import React, { useState } from 'react';
import { Testimonial } from '../types';
import { Star, X, CheckCircle2 } from 'lucide-react';
import { SERVICES, PRACTITIONERS } from '../data/clinicData';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (testimonial: Testimonial) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [patientName, setPatientName] = useState('');
  const [location, setLocation] = useState('Estcourt, KZN');
  const [serviceCategory, setServiceCategory] = useState(SERVICES[0].title);
  const [doctorAttended, setDoctorAttended] = useState(PRACTITIONERS[0].name);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !reviewText.trim()) return;

    const newReview: Testimonial = {
      id: `rev-${Date.now()}`,
      patientName: patientName.trim(),
      location: location.trim(),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
      serviceCategory,
      rating,
      doctorAttended,
      reviewText: reviewText.trim(),
    };

    onSubmit(newReview);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-xl relative border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          aria-label="Close review dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <div className="text-lg font-bold text-slate-900">Thank You For Your Feedback</div>
            <p className="text-xs text-slate-500">
              Your patient review has been recorded to help inform the KwaZulu-Natal community.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="text-xs font-semibold text-[#027884] uppercase tracking-wide">
                Patient Feedback
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Share Your Clinical Experience
              </h2>
              <p className="text-xs text-slate-500">
                Help other families in Estcourt and the KZN Midlands find trusted medical care.
              </p>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Rating</label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 cursor-pointer focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-semibold text-slate-700 ml-2">{rating} of 5 Stars</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sindi Ndlovu"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#027884]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">Your Area / Town</label>
                <input
                  type="text"
                  placeholder="e.g. Wembezi, Estcourt, Winterton"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#027884]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">Service Received</label>
                <select
                  value={serviceCategory}
                  onChange={(e) => setServiceCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#027884]"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">Doctor / Clinician</label>
                <select
                  value={doctorAttended}
                  onChange={(e) => setDoctorAttended(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#027884]"
                >
                  {PRACTITIONERS.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Your Review & Outcome *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Describe your consultation, the care received at Brikhill Centre, or your recovery outcome..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#027884]"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-[#027884] hover:bg-[#015c65] rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                Submit Review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
