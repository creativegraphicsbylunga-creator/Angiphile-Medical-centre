import React from 'react';
import { PageId } from '../types';
import { CLINIC_INFO, PRACTITIONERS, SERVICES, TESTIMONIALS } from '../data/clinicData';
import { Calendar, Phone, ArrowRight, Shield, HeartPulse, UserCheck, Clock, MapPin, CheckCircle2 } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId, extraId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const featuredServices = SERVICES.slice(0, 4);
  const featuredPractitioners = PRACTITIONERS.slice(0, 3);
  const featuredTestimonial = TESTIMONIALS[0];

  return (
    <div className="space-y-20 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Clinical Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              {/* Unboxed location text metadata */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#027884] tracking-wide uppercase">
                <span>Brikhill Centre</span>
                <span aria-hidden="true">·</span>
                <span>Estcourt</span>
                <span aria-hidden="true">·</span>
                <span>KwaZulu-Natal Healthcare</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]" style={{ textWrap: 'balance' }}>
                Compassionate, High-Quality Clinical Care for the Entire Family
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Angiphile Medical Centre delivers experienced medical consultations, women’s and maternal care, chronic illness regulation, and paediatric health in a calm, modern facility in Estcourt.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={() => onNavigate('booking')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#027884] hover:bg-[#015c65] rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Online Appointment</span>
                </button>
                <a
                  href={`tel:${CLINIC_INFO.contact.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Phone className="w-4 h-4 text-[#027884]" />
                  <span>Call {CLINIC_INFO.contact.phone}</span>
                </a>
              </div>

              {/* Unboxed Trust Signals */}
              <div className="pt-4 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#027884] shrink-0" />
                  <span>Medical Aids Accepted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#027884] shrink-0" />
                  <span>Walk-ins & Bookings</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <CheckCircle2 className="w-4 h-4 text-[#027884] shrink-0" />
                  <span>HPCSA Registered</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-md bg-slate-100 aspect-16/10 sm:aspect-4/3 lg:aspect-square">
                <img
                  src="/src/assets/images/hero_medical_centre_1792484641612.jpg"
                  alt="Angiphile Medical Centre reception and consultation suites in Brikhill Centre, Estcourt"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  onError={(e) => {
                    // Fallback to stylized container if image load fails
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Discrete overlay caption with location badge */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/85 via-slate-900/40 to-transparent p-5 text-white">
                  <div className="text-xs font-semibold text-emerald-300">Modern Clinical Facility</div>
                  <div className="text-sm font-medium">Brikhill Centre, Estcourt, KwaZulu-Natal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & CONVENIENCE ROW (Full-width row below hero) */}
      <section className="bg-slate-50 border-y border-slate-200/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold text-[#027884] tabular-nums">
                14+ Years
              </div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Senior Clinical Experience
              </div>
              <p className="text-xs text-slate-600 hidden sm:block">Dedicated family medicine practice</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold text-[#027884] tabular-nums">
                Brikhill Centre
              </div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Convenient Central Location
              </div>
              <p className="text-xs text-slate-600 hidden sm:block">Easy parking and wheelchair access</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold text-[#027884] tabular-nums">
                100%
              </div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Major Medical Aids
              </div>
              <p className="text-xs text-slate-600 hidden sm:block">Discovery, GEMS, Bonitas, Medscheme</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold text-[#027884] tabular-nums">
                Mon – Sat
              </div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Consultation Schedule
              </div>
              <p className="text-xs text-slate-600 hidden sm:block">Early morning and weekend times</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold text-[#027884] tracking-wide uppercase">
              Comprehensive Primary Care
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Services Offered at Angiphile Medical Centre
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#027884] hover:text-[#015c65] transition-colors cursor-pointer group whitespace-nowrap"
          >
            <span>View All 7 Clinical Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-[#027884]/40 hover:shadow-sm transition-all"
            >
              <div className="space-y-3">
                <div className="text-xs font-medium text-[#027884] tabular-nums">
                  0{index + 1}. Clinical Care
                </div>
                <h3 className="text-lg font-semibold text-slate-900 leading-snug">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 tabular-nums">{service.duration}</span>
                <button
                  onClick={() => onNavigate('booking', service.id)}
                  className="font-semibold text-[#027884] hover:underline cursor-pointer"
                >
                  Book Service →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MEET OUR MEDICAL PRACTITIONERS */}
      <section className="bg-slate-50/70 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-semibold text-[#027884] tracking-wide uppercase">
                Experienced Medical Doctors
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Medical Practitioners Serving Estcourt
              </h2>
            </div>
            <button
              onClick={() => onNavigate('practitioners')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#027884] hover:text-[#015c65] transition-colors cursor-pointer group whitespace-nowrap"
            >
              <span>View All Practitioner Credentials</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPractitioners.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="aspect-4/3 w-full bg-slate-100 overflow-hidden relative">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {doc.name}
                      </h3>
                      <p className="text-xs font-medium text-[#027884] mt-0.5">
                        {doc.title}
                      </p>
                    </div>

                    <div className="text-xs text-slate-500 space-y-1">
                      <div>{doc.qualification}</div>
                      <div className="font-mono text-[11px] text-slate-400">HPCSA: {doc.hpcsaNumber}</div>
                    </div>

                    <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {doc.bio}
                    </p>

                    <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <span className="font-medium text-slate-700">Languages: </span>
                      {doc.languages.join(' · ')}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => onNavigate('booking', doc.id)}
                    className="w-full py-2.5 px-4 text-xs font-semibold text-center text-[#027884] bg-slate-50 hover:bg-[#027884] hover:text-white border border-[#027884]/30 rounded-lg transition-colors cursor-pointer"
                  >
                    Book with {doc.name.split(' ')[1] || doc.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PATIENT EVIDENCE & TESTIMONIAL REST SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <span>Patient Experience</span>
              <span aria-hidden="true">·</span>
              <span>Brikhill Centre Practice</span>
            </div>

            <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed text-slate-100">
              "{featuredTestimonial.reviewText}"
            </blockquote>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800 text-sm">
              <div>
                <div className="font-semibold text-white">{featuredTestimonial.patientName}</div>
                <div className="text-xs text-slate-400">{featuredTestimonial.location} · {featuredTestimonial.serviceCategory}</div>
              </div>
              <button
                onClick={() => onNavigate('testimonials')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 hover:text-white transition-colors cursor-pointer"
              >
                <span>Read More Patient Stories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONVENIENT CLINIC ACCESS & LOCAL KZN APPOINTMENT CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-slate-200 rounded-2xl p-8 sm:p-10 bg-gradient-to-r from-slate-50 via-white to-slate-50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="text-xs font-semibold text-[#027884] uppercase tracking-wide">
                Visit Us in Estcourt
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Ready to Consult a Doctor? Schedule Your Visit Today
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Whether you need a same-day medical check-up, ongoing chronic illness management, or maternal antenatal appointments, our reception team and practitioners are ready to assist.
              </p>
              <div className="flex flex-wrap gap-y-2 gap-x-6 text-xs text-slate-500 pt-2">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#027884]" />
                  Brikhill Centre, Estcourt, KZN
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#027884]" />
                  +27 74 924 3680
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#027884]" />
                  Mon–Fri 08:00–17:00 | Sat 08:30–13:00
                </span>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => onNavigate('booking')}
                className="w-full py-3.5 px-6 text-center text-sm font-semibold text-white bg-[#027884] hover:bg-[#015c65] rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap"
              >
                Book Appointment Online
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-3 px-6 text-center text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                View Map & Directions
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
