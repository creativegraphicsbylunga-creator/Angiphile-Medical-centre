import React, { useState, useEffect } from 'react';
import { AppointmentBooking } from '../types';
import { PRACTITIONERS, SERVICES, AVAILABLE_TIME_SLOTS, CLINIC_INFO, SAMPLE_INITIAL_BOOKINGS } from '../data/clinicData';
import { Calendar, Clock, User, Phone, Mail, Shield, CheckCircle2, Download, MessageSquare, Search, AlertCircle, RefreshCw } from 'lucide-react';

interface BookingPageProps {
  initialSelection?: {
    practitionerId?: string;
    serviceId?: string;
  };
}

export const BookingPage: React.FC<BookingPageProps> = ({ initialSelection }) => {
  const [activeTab, setActiveTab] = useState<'new_booking' | 'manage_booking'>('new_booking');

  // Form State
  const [selectedPractitioner, setSelectedPractitioner] = useState<string>(
    initialSelection?.practitionerId || 'any'
  );
  const [selectedService, setSelectedService] = useState<string>(
    initialSelection?.serviceId || SERVICES[0].id
  );
  
  // Tomorrow's date formatted as YYYY-MM-DD
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState<string>(defaultDateStr);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(AVAILABLE_TIME_SLOTS[0]);

  const [patientName, setPatientName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+27 ');
  const [email, setEmail] = useState('');
  const [paymentType, setPaymentType] = useState<'medical_aid' | 'private_cash'>('medical_aid');
  const [medicalAidName, setMedicalAidName] = useState(CLINIC_INFO.medicalAids[0]);
  const [medicalAidNumber, setMedicalAidNumber] = useState('');
  const [notes, setNotes] = useState('');

  // Confirmation state
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentBooking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Manage Bookings State
  const [allBookings, setAllBookings] = useState<AppointmentBooking[]>(() => {
    try {
      const saved = localStorage.getItem('angiphile_bookings');
      return saved ? JSON.parse(saved) : SAMPLE_INITIAL_BOOKINGS;
    } catch {
      return SAMPLE_INITIAL_BOOKINGS;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<AppointmentBooking[] | null>(null);

  // Sync initialSelection props if passed
  useEffect(() => {
    if (initialSelection?.practitionerId) {
      setSelectedPractitioner(initialSelection.practitionerId);
    }
    if (initialSelection?.serviceId) {
      setSelectedService(initialSelection.serviceId);
    }
  }, [initialSelection]);

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Basic validation
    if (!patientName.trim()) {
      setFormError('Please enter the patient full name.');
      return;
    }
    if (phoneNumber.trim().length < 10) {
      setFormError('Please provide a valid South African phone number (e.g. +27 74 924 3680).');
      return;
    }
    if (!selectedDate) {
      setFormError('Please select an appointment date.');
      return;
    }

    setIsSubmitting(true);

    const doc = PRACTITIONERS.find((p) => p.id === selectedPractitioner);
    const srv = SERVICES.find((s) => s.id === selectedService);

    const doctorDisplayName = doc ? doc.name : 'First Available Doctor (Triage at Brikhill Centre)';
    const serviceDisplayName = srv ? srv.title : 'General Clinical Consultation';

    const refNum = `AMC-${Math.floor(10000 + Math.random() * 90000)}`;

    const newBooking: AppointmentBooking = {
      id: `booking-${Date.now()}`,
      referenceNumber: refNum,
      practitionerId: selectedPractitioner,
      practitionerName: doctorDisplayName,
      serviceId: selectedService,
      serviceName: serviceDisplayName,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      patientName: patientName.trim(),
      idNumber: idNumber.trim() || 'Provided at Reception',
      phoneNumber: phoneNumber.trim(),
      email: email.trim() || 'Not specified',
      paymentType,
      medicalAidName: paymentType === 'medical_aid' ? medicalAidName : undefined,
      medicalAidNumber: paymentType === 'medical_aid' ? medicalAidNumber : undefined,
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    setTimeout(() => {
      const updated = [newBooking, ...allBookings];
      setAllBookings(updated);
      try {
        localStorage.setItem('angiphile_bookings', JSON.stringify(updated));
      } catch (err) {
        console.error('Storage error', err);
      }
      setConfirmedBooking(newBooking);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  const handleDownloadCalendar = (booking: AppointmentBooking) => {
    const startDateTime = `${booking.date.replace(/-/g, '')}T090000Z`;
    const endDateTime = `${booking.date.replace(/-/g, '')}T094500Z`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Angiphile Medical Centre//Appointment//EN',
      'BEGIN:VEVENT',
      `UID:${booking.referenceNumber}@angiphilemedical.co.za`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${startDateTime}`,
      `DTEND:${endDateTime}`,
      `SUMMARY:Medical Consultation: ${booking.serviceName}`,
      `DESCRIPTION:Appointment at Angiphile Medical Centre with ${booking.practitionerName}. Reference: ${booking.referenceNumber}. Phone: +27 74 924 3680.`,
      'LOCATION:Brikhill Centre, Estcourt, KwaZulu-Natal, 3310',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${booking.referenceNumber}-appointment.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSearchBookings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }
    const q = searchQuery.toLowerCase().trim();
    const matches = allBookings.filter(
      (b) =>
        b.referenceNumber.toLowerCase().includes(q) ||
        b.phoneNumber.toLowerCase().includes(q) ||
        b.patientName.toLowerCase().includes(q)
    );
    setSearchResults(matches);
  };

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you wish to cancel this appointment at Angiphile Medical Centre?')) {
      const updated = allBookings.map((b) =>
        b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
      );
      setAllBookings(updated);
      try {
        localStorage.setItem('angiphile_bookings', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      if (searchResults) {
        setSearchResults(
          searchResults.map((b) =>
            b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
          )
        );
      }
    }
  };

  const resetFormForNewBooking = () => {
    setConfirmedBooking(null);
    setPatientName('');
    setIdNumber('');
    setMedicalAidNumber('');
    setNotes('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#027884] uppercase tracking-wide">
          <span>Online Patient Portal</span>
          <span aria-hidden="true">·</span>
          <span>Brikhill Centre, Estcourt</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
          Schedule an In-Person Medical Consultation
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Book your consultation directly with our general practitioners, specialist family physician, or nursing sister. Immediate confirmation voucher issued upon submission.
        </p>
      </div>

      {/* Tabs: New Booking vs Manage Existing Booking */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200/80 max-w-fit">
        <button
          onClick={() => {
            setActiveTab('new_booking');
            setConfirmedBooking(null);
          }}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'new_booking'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Book New Consultation
        </button>
        <button
          onClick={() => setActiveTab('manage_booking')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'manage_booking'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Lookup / Manage Existing Appointment
        </button>
      </div>

      {/* TAB 1: NEW BOOKING */}
      {activeTab === 'new_booking' && (
        <>
          {confirmedBooking ? (
            /* CONFIRMATION VOUCHER DISPLAY */
            <div className="max-w-3xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                      Appointment Confirmed
                    </div>
                    <div className="text-xl font-bold text-slate-900">
                      Booking Reference: <span className="font-mono text-[#027884]">{confirmedBooking.referenceNumber}</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-500 sm:text-right">
                  <div>Clinic Address:</div>
                  <div className="font-medium text-slate-700">Brikhill Centre, Estcourt, KZN</div>
                </div>
              </div>

              {/* Summary Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div className="space-y-1">
                  <div className="text-xs font-medium text-slate-400 uppercase">Consulting Practitioner</div>
                  <div className="font-semibold text-slate-900">{confirmedBooking.practitionerName}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-slate-400 uppercase">Service Requested</div>
                  <div className="font-semibold text-slate-900">{confirmedBooking.serviceName}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-slate-400 uppercase">Date & Time</div>
                  <div className="font-semibold text-slate-900 tabular-nums">
                    {confirmedBooking.date} at {confirmedBooking.timeSlot}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-slate-400 uppercase">Patient Full Name</div>
                  <div className="font-semibold text-slate-900">{confirmedBooking.patientName}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-slate-400 uppercase">Contact Phone</div>
                  <div className="font-semibold text-slate-900 tabular-nums">{confirmedBooking.phoneNumber}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-slate-400 uppercase">Billing Method</div>
                  <div className="font-semibold text-slate-900">
                    {confirmedBooking.paymentType === 'medical_aid'
                      ? `Medical Aid (${confirmedBooking.medicalAidName || 'Card presented at reception'})`
                      : 'Private / Cash / Card at Practice'}
                  </div>
                </div>
              </div>

              {/* Patient Preparation Instructions */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
                <div className="font-semibold text-slate-800">What to Bring to Brikhill Centre:</div>
                <p>• Your South African ID document or valid passport.</p>
                <p>• Your physical or digital Medical Aid card with main member details (if claiming).</p>
                <p>• Any current medication packets or chronic prescription scripts.</p>
                <p>• Please arrive 10 minutes prior to your scheduled time for vital-sign check-in.</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleDownloadCalendar(confirmedBooking)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#027884] hover:bg-[#015c65] rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Calendar Event (.ics)</span>
                </button>

                <a
                  href={`https://wa.me/27749243680?text=Hello%20Angiphile%20Medical%20Centre,%20I%20have%20booked%20appointment%20ref:%20${confirmedBooking.referenceNumber}%20for%20${confirmedBooking.patientName}%20on%20${confirmedBooking.date}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Notify via WhatsApp</span>
                </a>

                <button
                  onClick={resetFormForNewBooking}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors ml-auto cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Book Another Appointment</span>
                </button>
              </div>
            </div>
          ) : (
            /* BOOKING FORM */
            <form onSubmit={handleBookSubmit} className="space-y-10">
              {formError && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Step 1: Practitioner & Clinical Service */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <div className="text-xs font-semibold text-[#027884] uppercase tracking-wide">
                    Step 1 of 3
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                    Select Practitioner & Service
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Practitioner selector */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
                      Doctor or Clinical Practitioner
                    </label>
                    <select
                      value={selectedPractitioner}
                      onChange={(e) => setSelectedPractitioner(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#027884] focus:border-transparent text-slate-800"
                    >
                      <option value="any">First Available Doctor (Triage at Brikhill Centre)</option>
                      {PRACTITIONERS.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} — {doc.title}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-slate-500">
                      Select a specific doctor or leave as first available for immediate triage.
                    </p>
                  </div>

                  {/* Service selector */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
                      Clinical Consultation Type
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#027884] focus:border-transparent text-slate-800"
                    >
                      {SERVICES.map((srv) => (
                        <option key={srv.id} value={srv.id}>
                          {srv.title} (~{srv.duration})
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-slate-500">
                      Standard consultation duration is 20–30 minutes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2: Date & Available Time Slot */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <div className="text-xs font-semibold text-[#027884] uppercase tracking-wide">
                    Step 2 of 3
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                    Appointment Date & Time Slot
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-5 space-y-2">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
                      Select Date (Mon – Sat)
                    </label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#027884] focus:border-transparent text-slate-800"
                    />
                    <div className="text-[11px] text-slate-500 space-y-0.5 pt-1">
                      <div>Consulting Hours:</div>
                      <div>• Mon–Fri: 08:00 – 17:00</div>
                      <div>• Saturday: 08:30 – 13:00</div>
                    </div>
                  </div>

                  <div className="md:col-span-7 space-y-2">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
                      Available Consultation Slot
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {AVAILABLE_TIME_SLOTS.map((slot) => {
                        const isSelected = selectedTimeSlot === slot;
                        return (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                              isSelected
                                ? 'bg-[#027884] text-white border-[#027884] shadow-sm'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Patient Information & Medical Scheme */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <div className="text-xs font-semibold text-[#027884] uppercase tracking-wide">
                    Step 3 of 3
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                    Patient Details & Billing Preference
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Patient Full Name & Surname *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sipho Ndlovu"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#027884] focus:border-transparent text-slate-800"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Mobile Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="+27 74 123 4567"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#027884] focus:border-transparent text-slate-800 tabular-nums"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Used for SMS appointment reminders and reception verification.
                    </p>
                  </div>

                  {/* ID / Passport */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      SA ID Number or Passport (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="13-digit ID number"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#027884] focus:border-transparent text-slate-800 tabular-nums"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        placeholder="patient@example.co.za"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#027884] focus:border-transparent text-slate-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Billing Selector */}
                <div className="pt-2 border-t border-slate-100 space-y-4">
                  <div className="text-xs font-semibold text-slate-900 uppercase tracking-wide">
                    Payment Method
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label
                      className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                        paymentType === 'medical_aid'
                          ? 'border-[#027884] bg-[#027884]/5'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentType"
                        checked={paymentType === 'medical_aid'}
                        onChange={() => setPaymentType('medical_aid')}
                        className="mt-1 text-[#027884] focus:ring-[#027884]"
                      />
                      <div>
                        <div className="text-xs font-semibold text-slate-900">Medical Aid Claim</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Direct claiming from Discovery, GEMS, Bonitas, etc.
                        </div>
                      </div>
                    </label>

                    <label
                      className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                        paymentType === 'private_cash'
                          ? 'border-[#027884] bg-[#027884]/5'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentType"
                        checked={paymentType === 'private_cash'}
                        onChange={() => setPaymentType('private_cash')}
                        className="mt-1 text-[#027884] focus:ring-[#027884]"
                      />
                      <div>
                        <div className="text-xs font-semibold text-slate-900">Private / Cash / Card</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Transparent fixed cash consult fees payable at reception.
                        </div>
                      </div>
                    </label>
                  </div>

                  {paymentType === 'medical_aid' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-slate-700">
                          Medical Aid Scheme
                        </label>
                        <select
                          value={medicalAidName}
                          onChange={(e) => setMedicalAidName(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#027884]"
                        >
                          {CLINIC_INFO.medicalAids.map((scheme, i) => (
                            <option key={i} value={scheme}>
                              {scheme}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-slate-700">
                          Membership Number (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 908123456"
                          value={medicalAidNumber}
                          onChange={(e) => setMedicalAidNumber(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#027884] tabular-nums"
                        />
                      </div>
                    </div>
                  )}

                  {/* Notes / Chief Complaint */}
                  <div className="space-y-1.5 pt-2">
                    <label className="block text-xs font-semibold text-slate-700">
                      Reason for Visit or Symptoms (Optional & Confidential)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Brief note for the clinical triage team (e.g. routine check-up, chest cough for 3 days, prescription refill)..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#027884] focus:border-transparent text-slate-800"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500">
                    <span>Questions? Need urgent triage? Call </span>
                    <a href={`tel:${CLINIC_INFO.contact.phoneRaw}`} className="font-semibold text-[#027884]">
                      +27 74 924 3680
                    </a>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-[#027884] hover:bg-[#015c65] disabled:opacity-50 rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{isSubmitting ? 'Confirming Appointment...' : 'Confirm Appointment Online'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </>
      )}

      {/* TAB 2: MANAGE / LOOKUP APPOINTMENTS */}
      {activeTab === 'manage_booking' && (
        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 max-w-3xl">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Lookup Your Appointment Record
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your booking reference (e.g. AMC-74921) or mobile phone number to retrieve your upcoming consultation voucher.
              </p>
            </div>

            <form onSubmit={handleSearchBookings} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  placeholder="Enter reference (AMC-...) or phone number"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#027884]"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#027884] hover:bg-[#015c65] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Find Appointment
              </button>
            </form>
          </div>

          {/* Search or Saved Appointments Results */}
          <div className="space-y-4 max-w-3xl">
            <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
              {searchResults ? `Search Results (${searchResults.length})` : `All Scheduled Clinic Visits (${allBookings.length})`}
            </div>

            {(searchResults || allBookings).length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 text-sm">
                No appointments found. Use the booking tab to schedule your appointment.
              </div>
            ) : (
              (searchResults || allBookings).map((booking) => (
                <div
                  key={booking.id}
                  className={`bg-white rounded-xl border p-5 sm:p-6 transition-all ${
                    booking.status === 'cancelled'
                      ? 'border-slate-200 bg-slate-50/70 opacity-70'
                      : 'border-slate-200 hover:border-[#027884]/40 hover:shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-[#027884]">
                        {booking.referenceNumber}
                      </span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-xs text-slate-500">{booking.date} at {booking.timeSlot}</span>
                    </div>
                    <div>
                      {booking.status === 'confirmed' ? (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          Confirmed at Brikhill Centre
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                          Cancelled
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs text-slate-600">
                    <div>
                      <span className="text-slate-400">Patient: </span>
                      <span className="font-medium text-slate-800">{booking.patientName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Practitioner: </span>
                      <span className="font-medium text-slate-800">{booking.practitionerName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Service: </span>
                      <span className="font-medium text-slate-800">{booking.serviceName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Contact: </span>
                      <span className="font-medium text-slate-800 tabular-nums">{booking.phoneNumber}</span>
                    </div>
                  </div>

                  {booking.status === 'confirmed' && (
                    <div className="pt-4 mt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <button
                        onClick={() => handleDownloadCalendar(booking)}
                        className="text-xs font-semibold text-[#027884] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download .ics Calendar</span>
                      </button>

                      <div className="flex items-center gap-3">
                        <a
                          href={`tel:${CLINIC_INFO.contact.phoneRaw}`}
                          className="text-xs text-slate-600 hover:text-slate-900"
                        >
                          Call Reception
                        </a>
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="text-xs text-red-600 hover:text-red-700 cursor-pointer"
                        >
                          Cancel Appointment
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
