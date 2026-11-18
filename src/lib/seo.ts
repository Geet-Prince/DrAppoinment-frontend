import { Doctor } from '@/types';

export const SITE_NAME = 'Dr.Appoinment';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://drappoinment.in';
export const SITE_DESCRIPTION =
  'Instant verified doctor appointment booking and AI clinical triage assistant across India. Find top MBBS, MD, and DM specialists in Bengaluru, Delhi-NCR, Mumbai, and Hyderabad with live slots.';

export function getMedicalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: 'Dr.Appoinment Healthcare Network India',
    alternateName: 'DrAppoinment Portal India',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: SITE_DESCRIPTION,
    telephone: '+91-1800-208-5555',
    currenciesAccepted: 'INR',
    paymentAccepted: 'UPI, Credit Card, Debit Card, Net Banking, Ayushman Bharat / Insurance',
    priceRange: '₹₹',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '21:00',
      },
    ],
    medicalSpecialty: [
      'Cardiology',
      'Dermatology',
      'Pediatrics',
      'Neurology',
      'Orthopedics',
      'General Practice',
      'Psychiatry',
      'Gynecology',
    ],
    availableService: [
      {
        '@type': 'MedicalProcedure',
        name: 'Online Doctor Consultation Booking & OPD Token System',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'AI Healthcare Triage and Specialist Recommendation',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plot 14, 100 Feet Road, Indiranagar',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560038',
      addressCountry: 'IN',
    },
  };
}

export function getPhysicianSchema(doctor: Doctor) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: `Dr. ${doctor.fullName}`,
    description: doctor.about,
    medicalSpecialty: doctor.specialization,
    qualifications: doctor.qualification,
    telephone: doctor.phoneNumber,
    email: doctor.email,
    priceRange: `₹${doctor.consultationFee}`,
    image: doctor.profileImageUrl || `${SITE_URL}/default-doctor.jpg`,
    aggregateRating: doctor.averageRating
      ? {
          '@type': 'AggregateRating',
          ratingValue: doctor.averageRating,
          reviewCount: doctor.totalReviews || 1,
          bestRating: '5',
          worstRating: '1',
        }
      : undefined,
    parentOrganization: {
      '@type': 'MedicalClinic',
      name: 'Dr.Appoinment Healthcare Network India',
    },
  };
}

export function getFAQPageSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(
  items: Array<{ name: string; item: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: crumb.item.startsWith('http') ? crumb.item : `${SITE_URL}${crumb.item}`,
    })),
  };
}
