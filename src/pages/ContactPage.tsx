import React, { useState } from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, Navigation, AlertTriangle, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+27 ');
  const [subject, setSubject] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('+27 ');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  // Determine if clinic is currently open
  const now = new Date();
  const day = now.getDay(); // 0 is Sunday, 6 is Saturday
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeNum = hour + minute / 60;

  let isOpenNow = false;
  let statusText = 'Closed Today';

  if (day >= 1 && day <= 5) {
    // Mon-Fri: 08:00 - 17:00
    if (timeNum >= 8 && timeNum < 17) {
      isOpenNow = true;
      statusText = 'Open Now (until 17:00)';
    } else {
      statusText = 'Closed Now (Opens 08:00)';
    }
  } else if (day === 6) {
    // Saturday: 08:30 - 13:00
    if (timeNum >= 8.5 && timeNum < 13) {
      isOpenNow = true;
      statusText = 'Open Now (until 13:00)';
    } else {
      statusText = 'Closed Now (Opens Monday 08:00)';
    }
  } else {
    // Sunday: Emergency on call
    statusText = 'Sunday: Emergency On-Call';
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#027884] uppercase tracking-wide">
          <span>Estcourt Practice Location</span>
          <span aria-hidden="true">·</span>
          <span>KwaZulu-Natal (KZN)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
          Contact Angiphile Medical Centre & Find Our Practice
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Situated at Brikhill Centre, Estcourt. We are easily accessible from the town CBD, N3 highway, and surrounding areas including Wembezi, Winterton, and Colenso.
        </p>
      </div>

      {/* Main Contact & Location Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Info & Practice Hours Card */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Info Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">
                Clinic Details
              </h2>
              {/* Dynamic Open/Closed Status */}
              <div
                className={`text-xs font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5 ${
                  isOpenNow
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                <span>{statusText}</span>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#027884]/10 text-[#027884] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-400 uppercase">Physical Address</div>
                  <div className="font-semibold text-slate-900">Brikhill Centre</div>
                  <div className="text-xs text-slate-600">Estcourt, KwaZulu-Natal, 3310, South Africa</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Near Estcourt Town Centre & Transport Hub</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#027884]/10 text-[#027884] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-400 uppercase">Telephone (Appointments & Reception)</div>
                  <a
                    href={`tel:${CLINIC_INFO.contact.phoneRaw}`}
                    className="font-semibold text-slate-900 hover:text-[#027884] tabular-nums"
                  >
                    {CLINIC_INFO.contact.phone}
                  </a>
                  <div className="text-[11px] text-slate-500">Lines open Monday to Saturday</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#027884]/10 text-[#027884] flex items-center justify-center shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-400 uppercase">WhatsApp Helpdesk</div>
                  <a
                    href={CLINIC_INFO.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-700 hover:underline inline-block"
                  >
                    +27 74 924 3680 (Direct Chat)
                  </a>
                  <div className="text-[11px] text-slate-500">Quick queries & booking confirmations</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#027884]/10 text-[#027884] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-400 uppercase">Email Enquiries</div>
                  <a
                    href={`mailto:${CLINIC_INFO.contact.email}`}
                    className="font-semibold text-slate-900 hover:text-[#027884]"
                  >
                    {CLINIC_INFO.contact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Consulting Hours Table */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 uppercase tracking-wide">
                <Clock className="w-3.5 h-3.5 text-[#027884]" />
                <span>Standard Consulting Hours</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium text-slate-700">Monday – Friday</span>
                  <span className="tabular-nums font-semibold text-slate-900">08:00 – 17:00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium text-slate-700">Saturday</span>
                  <span className="tabular-nums font-semibold text-slate-900">08:30 – 13:00</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-slate-700">Sunday & Public Holidays</span>
                  <span className="text-slate-500">Emergency On-Call Only</span>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Ambulance Card */}
          <div className="bg-red-50/70 border border-red-200/80 rounded-xl p-5 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-semibold text-red-800">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>Medical Emergencies Protocol</span>
            </div>
            <p className="text-red-700 leading-relaxed">
              For life-threatening emergencies (severe chest pain, heavy trauma, breathing arrest), immediately contact uThukela Emergency Medical Services at <strong className="font-mono">10177</strong> or Netcare 911 at <strong className="font-mono">082 911</strong>.
            </p>
          </div>
        </div>

        {/* Right: Message Form & Driving Directions */}
        <div className="lg:col-span-7 space-y-8">
          {/* Contact Inquiry Form */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <div className="text-xs font-semibold text-[#027884] uppercase tracking-wide">
                Direct Message
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Send a Message to Clinic Reception
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Have a question regarding treatments, medical aids, or corporate occupational medicals? Our team typically responds within 2 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3 bg-emerald-50 rounded-xl border border-emerald-200 p-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <div className="text-base font-bold text-slate-900">Message Delivered Successfully</div>
                <p className="text-xs text-slate-600">
                  Thank you for reaching out to Angiphile Medical Centre. A member of our clinical administration team will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nomvula Sithole"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#027884]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+27 74 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#027884] tabular-nums"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">Email Address (Optional)</label>
                    <input
                      type="email"
                      placeholder="nomvula@example.co.za"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#027884]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#027884]"
                    >
                      <option value="General Enquiry">General Medical Enquiry</option>
                      <option value="Medical Aid Question">Medical Aid Claims & Cover</option>
                      <option value="Repeat Prescription">Repeat Chronic Prescription</option>
                      <option value="Occupational PDP">Occupational & PDP Medicals</option>
                      <option value="Maternal Care">Women's Health & Antenatal Care</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Type your inquiry here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#027884]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500">
                    Patient confidentiality strictly maintained under POPIA.
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#027884] hover:bg-[#015c65] rounded-lg transition-colors shadow-sm cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Interactive Directions & Local Geography Guide (Local SEO) */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#027884] uppercase tracking-wide">
              <Navigation className="w-4 h-4 text-[#027884]" />
              <span>Getting to Brikhill Centre, Estcourt</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              Travel Directions for KwaZulu-Natal Midlands Patients
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 space-y-1.5">
                <div className="font-semibold text-slate-800">From N3 Highway (Estcourt Exits):</div>
                <p>
                  Take Exit 175 (Estcourt North) or Exit 170 (Estcourt South). Follow the R103 into Estcourt town centre towards Brikhill Centre.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 space-y-1.5">
                <div className="font-semibold text-slate-800">From Wembezi & Loskop:</div>
                <p>
                  Drive along the Wembezi Main Road into Estcourt CBD. Brikhill Centre provides dedicated visitor bays directly in front of the practice.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 space-y-1.5">
                <div className="font-semibold text-slate-800">From Winterton / Drakensberg:</div>
                <p>
                  Travel east along the R74 towards the N3 / R103. Approximate drive time is 25 minutes with easy town parking upon arrival.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 space-y-1.5">
                <div className="font-semibold text-slate-800">Facility Accessibility:</div>
                <p>
                  Level ground floor entrance with wheelchair access ramps, pram-friendly waiting lounges, and secure paved parking.
                </p>
              </div>
            </div>

            {/* Stylized Interactive Map Locator Preview */}
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-white p-5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Geographic Coordinates:</span>
                <span className="font-mono text-slate-500">-29.0114° S, 29.8732° E</span>
              </div>
              <div className="h-44 w-full bg-slate-100 rounded-lg border border-slate-200 relative flex items-center justify-center overflow-hidden">
                {/* Visual schematic map of Estcourt and Brikhill Centre */}
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#027884_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="text-center z-10 space-y-2 p-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#027884] text-white shadow-md animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">Angiphile Medical Centre</div>
                  <div className="text-[11px] text-slate-500">Brikhill Centre, Estcourt, KZN, 3310</div>
                </div>
              </div>
              <div className="flex justify-end">
                <a
                  href="https://maps.google.com/?q=Brikhill+Centre+Estcourt+KwaZulu-Natal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#027884] hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
