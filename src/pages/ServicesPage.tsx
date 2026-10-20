import React, { useState } from 'react';
import { PageId, ServiceItem } from '../types';
import { SERVICES, CLINIC_INFO } from '../data/clinicData';
import { Calendar, CheckCircle2, Clock, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId, extraId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'primary' | 'specialized' | 'preventive' | 'occupational'>('all');

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#027884] uppercase tracking-wide">
          <span>Clinical Services</span>
          <span aria-hidden="true">·</span>
          <span>Brikhill Centre, Estcourt</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
          Comprehensive Healthcare Services for the KwaZulu-Natal Midlands
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          From everyday family medicine and child wellness to maternal health, chronic condition monitoring, and minor surgical interventions, Angiphile Medical Centre provides evidence-based medical treatments in Estcourt.
        </p>
      </div>

      {/* Interactive Category Segmented Filter */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200/80 max-w-fit">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeCategory === 'all'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Services ({SERVICES.length})
        </button>
        <button
          onClick={() => setActiveCategory('primary')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeCategory === 'primary'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Primary & Family Medicine
        </button>
        <button
          onClick={() => setActiveCategory('specialized')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeCategory === 'specialized'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Women's Health & Minor Procedures
        </button>
        <button
          onClick={() => setActiveCategory('preventive')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeCategory === 'preventive'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Preventive Screenings
        </button>
        <button
          onClick={() => setActiveCategory('occupational')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeCategory === 'occupational'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Occupational & Driver PDP
        </button>
      </div>

      {/* Services Detailed Grid */}
      <div className="space-y-8">
        {filteredServices.map((service, index) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 hover:border-[#027884]/40 hover:shadow-sm transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Details */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="font-semibold text-[#027884] tabular-nums">0{index + 1}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 font-medium text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-[#027884]" />
                    {service.duration}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{service.coveredByMedicalAid ? 'Covered by Medical Aid' : 'Direct Billing / Cash'}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {service.title}
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.fullDescription}
                </p>

                {/* Common Conditions / Indications (Unboxed clean list) */}
                <div className="pt-2">
                  <div className="text-xs font-semibold text-slate-900 uppercase tracking-wide mb-2">
                    Common Clinical Presentations Treated:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                    {service.typicalIndications.map((ind, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#027884] shrink-0 mt-0.5" />
                        <span>{ind}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preparation Instructions */}
                {service.preparationNotes && (
                  <div className="pt-3 text-xs text-slate-500 flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <AlertCircle className="w-4 h-4 text-[#027884] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-700">Patient Note: </span>
                      {service.preparationNotes}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Action Box */}
              <div className="lg:col-span-4 bg-slate-50/80 rounded-xl p-5 border border-slate-200/80 space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-900 uppercase tracking-wide">
                    Appointment Details
                  </div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <div>Location: Brikhill Centre, Estcourt</div>
                    <div>Consultation Time: ~{service.duration}</div>
                    <div>Accepted: Medical Aid / Cash Card</div>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <button
                    onClick={() => onNavigate('booking', service.id)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-[#027884] hover:bg-[#015c65] rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book This Service Online</span>
                  </button>
                  <a
                    href={CLINIC_INFO.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
                  >
                    <span>Enquire via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Medical Aid & Billing Transparency Information */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 sm:p-10 space-y-6">
        <div className="max-w-3xl space-y-2">
          <div className="text-xs font-semibold text-[#027884] uppercase tracking-wide">
            Payment & Medical Schemes
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Transparent Medical Aid Claims & Cash Options
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Angiphile Medical Centre claims directly from all contracted medical aid schemes in South Africa. If your scheme requires a co-payment or if you are visiting privately, transparent rates are communicated upfront with no hidden surcharges.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
          {CLINIC_INFO.medicalAids.map((scheme, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-3 text-xs font-medium text-slate-700 border border-slate-200/80 flex items-center gap-2"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#027884] shrink-0" />
              <span className="truncate">{scheme}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span>Need assistance confirming your medical aid benefits for a procedure? Call our reception at </span>
            <a href={`tel:${CLINIC_INFO.contact.phoneRaw}`} className="font-semibold text-[#027884] underline">
              {CLINIC_INFO.contact.phone}
            </a>
          </div>
          <button
            onClick={() => onNavigate('booking')}
            className="text-xs font-semibold text-[#027884] hover:underline cursor-pointer"
          >
            Go to Appointment Booking →
          </button>
        </div>
      </div>
    </div>
  );
};
