import React from 'react';
import Link from 'next/link';
import {
  Search,
  Sparkles,
  Calendar,
  ShieldCheck,
  Clock,
  HeartPulse,
  Brain,
  Baby,
  Bone,
  Stethoscope,
  Smile,
  ArrowRight,
  Star,
  CheckCircle2,
  Bot,
  UserCheck,
  Building2,
} from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { getFAQPageSchema } from '@/lib/seo';

const SPECIALTIES = [
  { name: 'Cardiology', icon: HeartPulse, count: '12 Doctors', color: 'from-rose-500 to-red-600', description: 'Heart, hypertension, rhythm & coronary care' },
  { name: 'Dermatology', icon: Smile, count: '8 Doctors', color: 'from-amber-500 to-orange-600', description: 'Skin disorders, allergies, acne & biopsies' },
  { name: 'Neurology', icon: Brain, count: '6 Doctors', color: 'from-indigo-500 to-purple-600', description: 'Brain, nerves, migraine & spine evaluation' },
  { name: 'Orthopedics', icon: Bone, count: '10 Doctors', color: 'from-blue-500 to-cyan-600', description: 'Joint pain, fractures, sports injuries & spine' },
  { name: 'Pediatrics', icon: Baby, count: '14 Doctors', color: 'from-emerald-500 to-teal-600', description: 'Infant, child wellness, immunizations & growth' },
  { name: 'General Medicine', icon: Stethoscope, count: '22 Doctors', color: 'from-teal-600 to-teal-800', description: 'Primary care, fevers, infections & vitals' },
];

const FAQS = [
  {
    question: 'How do I book a verified doctor appointment on Dr.Appoinment?',
    answer:
      'Search for your preferred doctor or clinical specialty, select your desired calendar date, choose an open time slot from the dynamic schedule, and confirm your booking. You will instantly receive an appointment confirmation.',
  },
  {
    question: 'How does the Gemini AI Healthcare Chatbot assist with appointments?',
    answer:
      'Our integrated Gemini AI assistant can understand natural language descriptions of your symptoms, recommend the most suitable clinical specialty, query live available doctor slots, and even initiate the appointment scheduling flow automatically.',
  },
  {
    question: 'Can I reschedule or cancel my booked appointment?',
    answer:
      'Yes. Simply navigate to your Patient Portal under "My Appointments", where you can reschedule to any open slot or cancel with a single click up to 2 hours before the consultation time.',
  },
  {
    question: 'How do I receive prescriptions and rate my doctor?',
    answer:
      'Following a completed consultation, your doctor issues an official electronic prescription accessible under your patient profile. You can print it directly or download it, and submit a 1 to 5 star verified review.',
  },
  {
    question: 'Are the doctors verified and licensed?',
    answer:
      'Every physician on the Dr.Appoinment platform is verified with registration number verification from the National Medical Commission (NMC) or State Medical Councils, and credentials verified by hospital administrators.',
  },
];

export default function HomePage() {
  const faqSchema = getFAQPageSchema(FAQS);

  return (
    <>
      <JsonLd data={faqSchema} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-white to-slate-50/50 pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 border border-teal-200/80 text-teal-800 text-xs sm:text-sm font-semibold shadow-sm">
              <Sparkles className="w-4 h-4 text-teal-600 animate-pulse" />
              <span>Next-Gen Healthcare: Real-Time Slots & Gemini AI Assistant</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
              Find Trusted Doctors & Book In{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800">
                Seconds
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Connect with top board-certified physicians, view real-time open consultation slots, and get personalized triage guidance with our built-in clinical AI.
            </p>

            {/* Quick Search Card */}
            <div className="bg-white p-3 sm:p-4 rounded-3xl shadow-xl shadow-teal-950/5 border border-gray-100 max-w-2xl mx-auto mt-8">
              <form
                action="/doctors"
                method="GET"
                className="flex flex-col sm:flex-row items-center gap-2.5"
              >
                <div className="relative flex-1 w-full">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="query"
                    placeholder="Search doctor, condition, or specialty (e.g. Cardiologist)..."
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-sm font-semibold shadow-md transition flex items-center justify-center gap-2 shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span>Find Doctor</span>
                </button>
              </form>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>100% Board Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>Zero Double Booking</span>
              </div>
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-teal-600" />
                <span>AI Clinical Triage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Directory Section */}
      <section id="specialties" className="py-16 sm:py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase font-bold text-teal-600 tracking-wider">
                Clinical Departments
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
                Explore by Medical Specialty
              </h2>
            </div>
            <Link
              href="/doctors"
              className="text-sm font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 mt-2 md:mt-0 transition"
            >
              <span>View all doctors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPECIALTIES.map((spec) => {
              const Icon = spec.icon;
              return (
                <Link
                  key={spec.name}
                  href={`/doctors?specialization=${encodeURIComponent(spec.name)}`}
                  className="group p-6 rounded-2xl border border-gray-100 bg-slate-50/50 hover:bg-white hover:border-teal-200 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${spec.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg group-hover:text-teal-600 transition">
                        {spec.name}
                      </h3>
                      <p className="text-xs text-teal-700 font-semibold">{spec.count}</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
                    {spec.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold text-teal-600 tracking-wider">
              Seamless Patient Experience
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">
              How Dr.Appoinment Works
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Book your consultation in three transparent, frictionless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative text-center">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 font-extrabold text-xl flex items-center justify-center mx-auto mb-5 shadow-sm">
                1
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Find Your Doctor</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Filter by medical specialty, consultation fees, experience, or use our Gemini AI to recommend the right specialist.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative text-center">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 font-extrabold text-xl flex items-center justify-center mx-auto mb-5 shadow-sm">
                2
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Select Live Time Slot</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Choose any open 30-minute consultation window. Backend slot validation ensures zero double-booking.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative text-center">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 font-extrabold text-xl flex items-center justify-center mx-auto mb-5 shadow-sm">
                3
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Get Care & Prescription</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Attend your consultation, obtain verified digital prescriptions, and leave patient reviews directly on your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Chatbot Spotlight */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-700/60 border border-teal-500/40 text-teal-200 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                <span>Spring AI & Google Gemini Integration</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Healthcare Triage Powered By Conversational Intelligence
              </h2>
              <p className="text-sm sm:text-base text-teal-100/90 leading-relaxed">
                Unsure which doctor to see? Chat with Dr.Appoinment AI right from your screen. It handles natural language symptom queries, analyzes doctor schedules, and facilitates quick appointment bookings with medical guardrails.
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-teal-100">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-300 shrink-0" />
                  <span>Symptom triage matching to correct clinical specialties</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-300 shrink-0" />
                  <span>Live availability checks without manually clicking through schedules</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-300 shrink-0" />
                  <span>Multi-turn context memory with session persistence</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/doctors"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-900 hover:bg-teal-50 rounded-2xl text-sm font-bold shadow-md transition"
                >
                  <Search className="w-4 h-4" />
                  <span>Find Available Doctors</span>
                </Link>
              </div>
            </div>

            {/* Visual Chat Mockup */}
            <div className="bg-slate-950/70 border border-teal-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Dr.Appoinment Clinical Assistant</h4>
                  <p className="text-xs text-teal-300/80">Online • Ready to assist</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-white/10 p-3 rounded-2xl text-teal-100 max-w-[85%]">
                  "Hello! I have been having occasional chest tightness and shortness of breath after climbing stairs. Which doctor should I visit?"
                </div>
                <div className="bg-teal-700/80 p-3.5 rounded-2xl text-white ml-auto max-w-[90%] border border-teal-500/40">
                  "Based on your symptoms, I strongly recommend a consultation with a <strong>Cardiologist</strong> for a cardiovascular evaluation. Dr. Rajesh Sharma (Cardiology, AIIMS New Delhi, 14 yrs exp) has 2 open slots today at 2:00 PM and 3:30 PM (Fee: ₹1,200). Would you like me to reserve a slot for you?"
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO FAQ Section */}
      <section id="faqs" className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-bold text-teal-600 tracking-wider">
              Common Questions
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Everything you need to know about scheduling, AI assistance, and prescriptions.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <details
                key={idx}
                className="group border border-gray-200 rounded-2xl p-5 open:bg-teal-50/30 open:border-teal-200 transition"
              >
                <summary className="font-bold text-sm sm:text-base text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  <span>{faq.question}</span>
                  <span className="text-teal-600 font-bold text-lg group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100/80 pt-3">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
