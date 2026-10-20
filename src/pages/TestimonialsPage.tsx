import React, { useState } from 'react';
import { PageId, Testimonial } from '../types';
import { TESTIMONIALS } from '../data/clinicData';
import { ReviewModal } from '../components/ReviewModal';
import { Star, MessageSquarePlus, Calendar, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface TestimonialsPageProps {
  onNavigate: (page: PageId) => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ onNavigate }) => {
  const [reviews, setReviews] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem('angiphile_reviews');
      return saved ? JSON.parse(saved) : TESTIMONIALS;
    } catch {
      return TESTIMONIALS;
    }
  });

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddReview = (newRev: Testimonial) => {
    const updated = [newRev, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem('angiphile_reviews', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredReviews = filterCategory === 'all'
    ? reviews
    : reviews.filter((r) => r.serviceCategory.toLowerCase().includes(filterCategory.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#027884] uppercase tracking-wide">
            <span>Patient Experiences</span>
            <span aria-hidden="true">·</span>
            <span>Estcourt & KwaZulu-Natal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Real Patient Reviews from our Local Community
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Read direct feedback from families, mothers, workers, and elders treated at Angiphile Medical Centre in Brikhill Centre.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-[#027884] hover:bg-[#015c65] rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap shrink-0"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Leave a Patient Review</span>
        </button>
      </div>

      {/* Aggregate Rating Strip */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center gap-4">
            <div className="text-4xl sm:text-5xl font-bold text-slate-900 tabular-nums">
              4.9
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs text-slate-500">
                Based on verified Estcourt clinic patient reviews
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800">Quality of Care Highlights:</div>
            <div>• Attentive, unhurried consultations in isiZulu & English</div>
            <div>• Spotless, modern facilities at Brikhill Centre</div>
            <div>• Direct medical aid claim processing</div>
          </div>

          <div className="flex justify-start md:justify-end">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-lg text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Genuine Patient Feedback</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Segmented Control */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200/80 max-w-fit">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            filterCategory === 'all'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Reviews ({reviews.length})
        </button>
        <button
          onClick={() => setFilterCategory('chronic')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            filterCategory === 'chronic'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Chronic Care
        </button>
        <button
          onClick={() => setFilterCategory('women')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            filterCategory === 'women'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Maternal & Women's Health
        </button>
        <button
          onClick={() => setFilterCategory('surgery')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            filterCategory === 'surgery'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Minor Procedures & Wound Care
        </button>
        <button
          onClick={() => setFilterCategory('general')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            filterCategory === 'general'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          General Family Consults
        </button>
      </div>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between hover:border-[#027884]/40 hover:shadow-sm transition-all"
          >
            <div className="space-y-4">
              {/* Star Rating and Service */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-slate-400 tabular-nums">{rev.date}</span>
              </div>

              {/* Review text */}
              <p className="text-sm text-slate-700 leading-relaxed">
                "{rev.reviewText}"
              </p>
            </div>

            {/* Author Attribution & Unboxed Metadata */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <div className="font-semibold text-slate-900">{rev.patientName}</div>
                <div className="text-slate-500">{rev.location}</div>
              </div>
              <div className="text-slate-500 sm:text-right">
                <div className="font-medium text-[#027884]">{rev.serviceCategory}</div>
                {rev.doctorAttended && (
                  <div className="text-[11px] text-slate-400">Attended by: {rev.doctorAttended}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-[#027884] text-white rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-2xl font-bold">Experience Dignified, High-Standard Healthcare</h2>
          <p className="text-sm text-emerald-100 max-w-xl">
            Join hundreds of satisfied individuals and families who rely on Angiphile Medical Centre for their medical consultations.
          </p>
        </div>
        <button
          onClick={() => onNavigate('booking')}
          className="px-6 py-3 text-xs font-semibold text-[#027884] bg-white hover:bg-slate-100 rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap shrink-0"
        >
          Book Consultation Online
        </button>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddReview}
      />
    </div>
  );
};
