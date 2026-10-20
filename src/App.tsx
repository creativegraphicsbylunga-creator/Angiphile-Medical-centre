/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PractitionersPage } from './pages/PractitionersPage';
import { BookingPage } from './pages/BookingPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';
import { CLINIC_INFO } from './data/clinicData';
import { MessageSquare, Phone } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [bookingSelection, setBookingSelection] = useState<{
    practitionerId?: string;
    serviceId?: string;
  }>({});

  const handleNavigate = (page: PageId, extraId?: string) => {
    if (page === 'booking') {
      if (extraId) {
        if (extraId.startsWith('dr-') || extraId.startsWith('sr-')) {
          setBookingSelection({ practitionerId: extraId });
        } else {
          setBookingSelection({ serviceId: extraId });
        }
      }
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased font-sans selection:bg-[#027884]/20 selection:text-[#027884]">
      {/* Main Clinical Header */}
      <Header
        currentPage={currentPage}
        onNavigate={(page) => handleNavigate(page)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'services' && <ServicesPage onNavigate={handleNavigate} />}
        {currentPage === 'practitioners' && <PractitionersPage onNavigate={handleNavigate} />}
        {currentPage === 'booking' && <BookingPage initialSelection={bookingSelection} />}
        {currentPage === 'testimonials' && <TestimonialsPage onNavigate={handleNavigate} />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Persistent Quiet Floating Help for Quick Calling & WhatsApp on Mobile */}
      <div className="fixed bottom-4 right-4 z-30 flex items-center gap-2 sm:hidden">
        <a
          href={`tel:${CLINIC_INFO.contact.phoneRaw}`}
          className="w-11 h-11 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          aria-label="Call clinic"
        >
          <Phone className="w-5 h-5 text-emerald-400" />
        </a>
        <a
          href={CLINIC_INFO.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full bg-[#027884] text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          aria-label="WhatsApp clinic"
        >
          <MessageSquare className="w-5 h-5" />
        </a>
      </div>

      {/* Clinical Footer */}
      <Footer onNavigate={(page) => handleNavigate(page)} />
    </div>
  );
}
