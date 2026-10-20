export type PageId = 'home' | 'services' | 'practitioners' | 'booking' | 'testimonials' | 'contact';

export interface Practitioner {
  id: string;
  name: string;
  title: string;
  qualification: string;
  hpcsaNumber: string;
  experienceYears: number;
  languages: string[];
  specialties: string[];
  bio: string;
  image: string;
  availability: string;
  consultationFee: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'primary' | 'specialized' | 'preventive' | 'occupational';
  shortDescription: string;
  fullDescription: string;
  duration: string;
  typicalIndications: string[];
  preparationNotes?: string;
  coveredByMedicalAid: boolean;
}

export interface Testimonial {
  id: string;
  patientName: string;
  location: string;
  date: string;
  serviceCategory: string;
  rating: number;
  reviewText: string;
  doctorAttended?: string;
}

export interface AppointmentBooking {
  id: string;
  referenceNumber: string;
  practitionerId: string;
  practitionerName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  patientName: string;
  idNumber: string;
  phoneNumber: string;
  email: string;
  paymentType: 'medical_aid' | 'private_cash';
  medicalAidName?: string;
  medicalAidNumber?: string;
  notes?: string;
  createdAt: string;
  status: 'confirmed' | 'rescheduled' | 'cancelled';
}
