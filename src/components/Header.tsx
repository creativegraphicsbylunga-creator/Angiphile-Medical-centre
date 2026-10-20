import React, { useState } from 'react';
import { PageId } from '../types';
import { CLINIC_INFO } from '../data/clinicData';
import { Phone, Calendar, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'practitioners', label: 'Practitioners' },
    { id: 'booking', label: 'Appointments' },
    { id: 'testimonials', label: 'Patient Reviews' },
    { id: 'contact', label: 'Contact & Location' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top micro-announcement bar for clinic phone and local address */}
      <div className="bg-[#015c65] text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-3 text-slate-100">
            <span className="font-medium text-emerald-200">Brikhill Centre, Estcourt, KZN</span>
            <span className="hidden md:inline text-slate-300">·</span>
            <span className="hidden md:inline">Open Mon–Fri 08:00–17:00 & Sat 08:30–13:00</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <a
              href={`tel:${CLINIC_INFO.contact.phoneRaw}`}
              className="flex items-center gap-1.5 text-white hover:text-emerald-200 transition-colors tabular-nums"
              title="Call practice reception"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-300" />
              <span>{CLINIC_INFO.contact.phone}</span>
            </a>
            <span className="text-white/40">|</span>
            <a
              href={CLINIC_INFO.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-emerald-200 transition-colors flex items-center gap-1"
            >
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-5 Nav Links) — Zone 3 (1 Primary CTA) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left text-slate-900 group cursor-pointer"
            aria-label="Angiphile Medical Centre Home"
          >
            <div className="w-9 h-9 rounded-lg bg-[#027884] flex items-center justify-center text-white font-bold text-lg shadow-sm">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 10.5h-5.5V5a1.5 1.5 0 0 0-3 0v5.5H5a1.5 1.5 0 0 0 0 3h5.5V19a1.5 1.5 0 0 0 3 0v-5.5H19a1.5 1.5 0 0 0 0-3z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-[#027884] transition-colors whitespace-nowrap shrink-0">
                Angiphile Medical Centre
              </span>
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider -mt-1 hidden sm:block">
                Estcourt · KwaZulu-Natal
              </span>
            </div>
          </button>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive ? 'text-[#027884] font-semibold' : 'hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#027884] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('booking')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#027884] hover:bg-[#015c65] rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#027884]/10 text-[#027884] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <div className="pt-3">
              <button
                onClick={() => handleNavClick('booking')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#027884] hover:bg-[#015c65] rounded-lg transition-colors shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </button>
            </div>
            <div className="pt-2 text-center text-xs text-slate-500">
              <span>Direct Reception: </span>
              <a href={`tel:${CLINIC_INFO.contact.phoneRaw}`} className="text-[#027884] font-medium">
                {CLINIC_INFO.contact.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
