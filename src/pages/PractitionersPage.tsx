import React from 'react';
import { PageId, Practitioner } from '../types';
import { PRACTITIONERS, CLINIC_INFO } from '../data/clinicData';
import { Calendar, Award, Languages, Clock, ShieldCheck, Stethoscope } from 'lucide-react';

interface PractitionersPageProps {
  onNavigate: (page: PageId, extraId?: string) => void;
}

export const PractitionersPage: React.FC<PractitionersPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#027884] uppercase tracking-wide">
          <span>Clinical Team</span>
          <span aria-hidden="true">·</span>
          <span>Brikhill Centre, Estcourt</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
          Meet Our Experienced Medical Doctors & Clinical Practitioners
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Our clinicians combine decades of primary clinical experience across KwaZulu-Natal with continuous medical education, delivering patient-centred, evidence-guided diagnostics and treatment in Estcourt.
        </p>
      </div>

      {/* Practitioner Profile Cards */}
      <div className="space-y-12">
        {PRACTITIONERS.map((doc, index) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-[#027884]/40 hover:shadow-md transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Doctor Image Column */}
              <div className="lg:col-span-4 bg-slate-100 relative min-h-[320px] lg:min-h-full">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded text-[11px] font-semibold text-slate-700 shadow-sm">
                  {doc.experienceYears}+ Years Clinical Practice
                </div>
              </div>

              {/* Doctor Details Column */}
              <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-semibold text-[#027884] uppercase tracking-wide">
                      {doc.title}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                      {doc.name}
                    </h2>
                    <div className="text-xs text-slate-500 mt-1 font-medium">
                      {doc.qualification}
                    </div>
                  </div>

                  {/* HPCSA & Languages unboxed metadata */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 font-mono">
                      <ShieldCheck className="w-4 h-4 text-[#027884]" />
                      <span>{doc.hpcsaNumber}</span>
                    </div>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <div className="flex items-center gap-1.5">
                      <Languages className="w-4 h-4 text-[#027884]" />
                      <span>Languages: {doc.languages.join(', ')}</span>
                    </div>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#027884]" />
                      <span>{doc.availability}</span>
                    </div>
                  </div>

                  {/* Biography */}
                  <p className="text-sm text-slate-600 leading-relaxed pt-1">
                    {doc.bio}
                  </p>

                  {/* Specialties checklist */}
                  <div>
                    <div className="text-xs font-semibold text-slate-900 uppercase tracking-wide mb-2">
                      Key Clinical Focus Areas:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                      {doc.specialties.map((spec, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Stethoscope className="w-3.5 h-3.5 text-[#027884] shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Consultation Details & Action */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">Consultation Rates: </span>
                    <span>{doc.consultationFee}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onNavigate('booking', doc.id)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#027884] hover:bg-[#015c65] rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book with {doc.name.split(' ')[1] || doc.name}</span>
                    </button>
                    <a
                      href={`tel:${CLINIC_INFO.contact.phoneRaw}`}
                      className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
                    >
                      Call Reception
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Clinical Ethics & HPCSA Statement */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 sm:p-10 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#027884] uppercase tracking-wide">
          <Award className="w-4 h-4 text-[#027884]" />
          <span>Professional Governance & Patient Rights</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          Strict HPCSA Compliance, Confidentiality & Clinical Governance
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
          All medical practitioners at Angiphile Medical Centre are registered with the Health Professions Council of South Africa (HPCSA) and the South African Nursing Council (SANC). We adhere strictly to the National Health Act, HPCSA ethical guidelines, informed patient consent protocols, and POPIA privacy laws for health records.
        </p>
        <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-500">
          <span>Practice Address: Brikhill Centre, Estcourt, KZN</span>
          <span>·</span>
          <span>Reception Enquiries: +27 74 924 3680</span>
        </div>
      </div>
    </div>
  );
};
