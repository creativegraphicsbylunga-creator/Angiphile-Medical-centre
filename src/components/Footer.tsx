import React from 'react';
import { PageId } from '../types';
import { CLINIC_INFO } from '../data/clinicData';
import { MapPin, Phone, Mail, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Upper footer with clean column layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand & Purpose */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#027884] flex items-center justify-center text-white font-bold">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 10.5h-5.5V5a1.5 1.5 0 0 0-3 0v5.5H5a1.5 1.5 0 0 0 0 3h5.5V19a1.5 1.5 0 0 0 3 0v-5.5H19a1.5 1.5 0 0 0 0-3z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Angiphile Medical Centre
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Dedicated private healthcare clinic situated at Brikhill Centre in Estcourt, KwaZulu-Natal.
              Committed to providing compassionate, accessible family medicine, maternal care, and chronic illness management.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Registered Healthcare Practice · HPCSA Compliant</span>
            </div>
          </div>

          {/* Column 2: Navigation & Key Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Clinic Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Practice Overview</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Clinical Services</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('practitioners')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Medical Doctors & Team</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('booking')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Book Appointment Online</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('testimonials')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Patient Testimonials</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Directions & Contact</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Location (Estcourt KZN) */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Location & Enquiries
            </h3>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Brikhill Centre, Estcourt, KwaZulu-Natal, 3310
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`tel:${CLINIC_INFO.contact.phoneRaw}`}
                  className="hover:text-white transition-colors tabular-nums font-medium text-slate-300"
                >
                  {CLINIC_INFO.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`mailto:${CLINIC_INFO.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {CLINIC_INFO.contact.email}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={CLINIC_INFO.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#027884] hover:bg-[#015c65] text-white text-xs font-semibold transition-colors"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Hours & Medical Aids */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Consulting Hours
            </h3>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-300">Mon – Fri:</span>
                    <span className="tabular-nums">08:00 – 17:00</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-300">Saturday:</span>
                    <span className="tabular-nums">08:30 – 13:00</span>
                  </div>
                  <div className="flex justify-between gap-4 text-xs text-slate-500">
                    <span>Sunday:</span>
                    <span>Emergency On-Call</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                Medical Aids Accepted
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Discovery Health, GEMS, Bonitas, Medscheme, Momentum, Bestmed, Fedhealth & Private Cash.
              </p>
            </div>
          </div>
        </div>

        {/* Local KZN SEO Coverage Area strip */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-400">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>
              <span className="font-semibold text-slate-300">Serving KwaZulu-Natal Communities: </span>
              <span>
                Estcourt Central · Brikhill Centre · Wembezi · Winterton · Colenso · Loskop · Mooi River · Drakensberg Midlands · uThukela District
              </span>
            </div>
            <div className="shrink-0 text-slate-500">
              Emergency: 10177 / 082 911
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Angiphile Medical Centre. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Brikhill Centre, Estcourt</span>
            <span>·</span>
            <span>Tel: +27 74 924 3680</span>
            <span>·</span>
            <button
              onClick={() => onNavigate('booking')}
              className="text-emerald-400 hover:underline cursor-pointer"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
