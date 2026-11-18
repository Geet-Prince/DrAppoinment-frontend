import React from 'react';
import Link from 'next/link';
import { Stethoscope, Heart, ShieldAlert, Sparkles, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      {/* Indian Medical Emergency Banner */}
      <div className="bg-red-950/80 border-b border-red-900/50 py-3 px-4 text-center text-xs sm:text-sm text-red-200 flex items-center justify-center gap-2">
        <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
        <span>
          <strong>Emergency Medical Notice:</strong> In case of a medical emergency, please dial <strong>112</strong> (National Emergency) or <strong>108</strong> (Ambulance Service) immediately.
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Dr.<span className="text-teal-400">Appoinment</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm">
              India's smart clinical OPD scheduling platform with real-time slot synchronization and Gemini-powered conversational health triage.
            </p>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Plot 14, 100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>1800-208-5555 (Toll-Free) / +91-80-4920-5555</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>support@drappoinment.in</span>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Top Specialties
            </h3>
            <ul className="space-y-2 text-sm">
              {['Cardiology', 'Dermatology', 'Neurology', 'Orthopedics', 'Pediatrics', 'General Medicine'].map((spec) => (
                <li key={spec}>
                  <Link
                    href={`/doctors?specialization=${encodeURIComponent(spec)}`}
                    className="hover:text-teal-400 transition"
                  >
                    {spec}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Patient Portals */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Patient Services
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/doctors" className="hover:text-teal-400 transition">
                  Find Doctors & Live Slots
                </Link>
              </li>
              <li>
                <Link href="/patient" className="hover:text-teal-400 transition">
                  My OPD Appointments
                </Link>
              </li>
              <li>
                <Link href="/patient" className="hover:text-teal-400 transition">
                  Download E-Prescriptions
                </Link>
              </li>
              <li>
                <Link href="/#faqs" className="hover:text-teal-400 transition">
                  Patient Help & FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Developers & AI SEO */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Platform & AI
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/doctor" className="hover:text-teal-400 transition">
                  Doctor Clinic Portal
                </Link>
              </li>
              <li>
                <Link href="/llms.txt" target="_blank" className="hover:text-teal-400 transition flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  llms.txt for AI Search
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" target="_blank" className="hover:text-teal-400 transition">
                  XML Sitemap
                </Link>
              </li>
              <li>
                <span className="text-xs text-gray-500">NMC Compliant Healthcare Network</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Dr.Appoinment Healthcare India Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Designed with care for Indian healthcare & clinical discovery</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 inline ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
