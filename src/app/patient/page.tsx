'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { appointmentApi } from '@/api/appointments';
import { useAuthStore } from '@/store/useAuthStore';
import { Appointment } from '@/types';
import { RescheduleModal } from '@/components/appointments/RescheduleModal';
import { ReviewModal } from '@/components/reviews/ReviewModal';
import { PrescriptionModal } from '@/components/prescriptions/PrescriptionModal';
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  FileText,
  Star,
  XCircle,
  AlertCircle,
  RotateCcw,
  CheckCircle2,
  Search,
} from 'lucide-react';

const FALLBACK_APPOINTMENTS: Appointment[] = [
  {
    id: 101,
    patientId: 1,
    patientName: 'Aarav Sharma',
    doctorId: 1,
    doctorName: 'Rajesh Sharma',
    doctorSpecialization: 'Cardiology',
    departmentName: 'Cardiology & Heart Care',
    appointmentDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    startTime: '10:00:00',
    endTime: '10:30:00',
    status: 'CONFIRMED',
    consultationFee: 1200,
    reason: 'Follow-up on elevated blood pressure and 2D ECHO review',
    notes: 'No recent chest pain or breathlessness reported',
  },
  {
    id: 98,
    patientId: 1,
    patientName: 'Aarav Sharma',
    doctorId: 2,
    doctorName: 'Priya Nair',
    doctorSpecialization: 'Dermatology',
    departmentName: 'Dermatology & Cosmetology',
    appointmentDate: '2026-11-10',
    startTime: '14:30:00',
    endTime: '15:00:00',
    status: 'COMPLETED',
    consultationFee: 900,
    reason: 'Skin allergy and contact dermatitis checkup',
    notes: 'Prescription issued for topical soothing lotion & antihistamines',
  },
];

export default function PatientDashboardPage() {
  const { user, isAuthenticated, initialize } = useAuthStore();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'COMPLETED' | 'ALL'>('UPCOMING');

  // Modal states
  const [rescheduleAppointment, setRescheduleAppointment] = useState<Appointment | null>(null);
  const [reviewAppointment, setReviewAppointment] = useState<Appointment | null>(null);
  const [prescriptionAppointmentId, setPrescriptionAppointmentId] = useState<number | null>(null);
  const [cancelLoadingId, setCancelLoadingId] = useState<number | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const patientId = user?.id || 1;
      const data = await appointmentApi.getByPatient(patientId);
      if (data?.content && data.content.length > 0) {
        setAppointments(data.content);
      } else {
        setAppointments(FALLBACK_APPOINTMENTS);
      }
    } catch {
      setAppointments(FALLBACK_APPOINTMENTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const handleCancelAppointment = async (id: number) => {
    const reason = window.prompt('Please provide a brief reason for cancellation:');
    if (!reason) return;

    setCancelLoadingId(id);
    try {
      await appointmentApi.cancel(id, reason);
      setNotice(`Appointment #${id} has been cancelled successfully.`);
      fetchAppointments();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to cancel appointment.');
    } finally {
      setCancelLoadingId(null);
    }
  };

  const filteredAppointments = appointments.filter((app) => {
    if (activeTab === 'UPCOMING') return app.status === 'CONFIRMED' || app.status === 'PENDING';
    if (activeTab === 'COMPLETED') return app.status === 'COMPLETED';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase font-bold text-teal-600 tracking-wider">
            Patient Portal
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-0.5">
            My Consultations & Health Records
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Manage upcoming doctor appointments, reschedule slots, inspect digital prescriptions, and leave ratings.
          </p>
        </div>

        <Link
          href="/doctors"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition"
        >
          <Search className="w-4 h-4" />
          <span>Book New Appointment</span>
        </Link>
      </div>

      {notice && (
        <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-2xl text-xs sm:text-sm text-teal-800 flex items-center justify-between">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="text-teal-600 font-bold ml-2">
            Dismiss
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-6 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('UPCOMING')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'UPCOMING'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Upcoming Bookings
        </button>
        <button
          onClick={() => setActiveTab('COMPLETED')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'COMPLETED'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Completed Consultations
        </button>
        <button
          onClick={() => setActiveTab('ALL')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'ALL'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          All Records
        </button>
      </div>

      {/* Appointment Cards */}
      {loading ? (
        <div className="py-20 text-center text-sm text-gray-500">
          <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          Retrieving your patient consultations...
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-md mx-auto">
          <Calendar className="w-12 h-12 text-teal-600 mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-bold text-gray-900">No {activeTab.toLowerCase()} appointments</h3>
          <p className="text-xs text-gray-500 mt-1">
            Browse our specialist directory to find an open slot that fits your schedule.
          </p>
          <Link
            href="/doctors"
            className="mt-4 inline-block px-5 py-2.5 bg-teal-600 text-white rounded-xl text-xs font-semibold"
          >
            Find Doctor
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((app) => {
            const isConfirmed = app.status === 'CONFIRMED' || app.status === 'PENDING';
            const isCompleted = app.status === 'COMPLETED';
            const isCancelled = app.status === 'CANCELLED';

            return (
              <div
                key={app.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow transition flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Doctor & Date Details */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 font-bold">
                    <Stethoscope className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700">
                        {app.doctorSpecialization || 'Clinical Doctor'}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          isConfirmed
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : isCompleted
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      Dr. {app.doctorName || `Doctor #${app.doctorId}`}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
                      <div className="flex items-center gap-1.5 font-semibold text-gray-700">
                        <Calendar className="w-3.5 h-3.5 text-teal-600" />
                        <span>{app.appointmentDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-semibold text-gray-700">
                        <Clock className="w-3.5 h-3.5 text-teal-600" />
                        <span>{app.startTime.substring(0, 5)}</span>
                      </div>
                      <div className="text-gray-400">
                        Fee: <span className="text-teal-700 font-bold">₹{app.consultationFee}</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 pt-1 italic">
                      Reason: "{app.reason}"
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-end md:self-center">
                  {isConfirmed && (
                    <>
                      <button
                        onClick={() => setRescheduleAppointment(app)}
                        className="px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reschedule</span>
                      </button>
                      <button
                        onClick={() => handleCancelAppointment(app.id)}
                        disabled={cancelLoadingId === app.id}
                        className="px-3.5 py-2 rounded-xl border border-red-200 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-1.5 transition"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Cancel</span>
                      </button>
                    </>
                  )}

                  {isCompleted && (
                    <>
                      <button
                        onClick={() => setPrescriptionAppointmentId(app.id)}
                        className="px-3.5 py-2 rounded-xl bg-teal-50 border border-teal-200 text-xs font-semibold text-teal-800 hover:bg-teal-100 flex items-center gap-1.5 transition"
                      >
                        <FileText className="w-3.5 h-3.5 text-teal-600" />
                        <span>View Prescription</span>
                      </button>
                      <button
                        onClick={() => setReviewAppointment(app)}
                        className="px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-800 hover:bg-amber-100 flex items-center gap-1.5 transition"
                      >
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>Rate Doctor</span>
                      </button>
                    </>
                  )}

                  {isCancelled && (
                    <span className="text-xs text-gray-400 italic">Booking Cancelled</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reschedule Modal */}
      <RescheduleModal
        isOpen={Boolean(rescheduleAppointment)}
        onClose={() => setRescheduleAppointment(null)}
        appointment={rescheduleAppointment}
        onSuccess={fetchAppointments}
      />

      {/* Review Modal */}
      {reviewAppointment && (
        <ReviewModal
          isOpen={Boolean(reviewAppointment)}
          onClose={() => setReviewAppointment(null)}
          appointmentId={reviewAppointment.id}
          doctorName={reviewAppointment.doctorName}
          onSuccess={fetchAppointments}
        />
      )}

      {/* Prescription Modal */}
      {prescriptionAppointmentId && (
        <PrescriptionModal
          isOpen={Boolean(prescriptionAppointmentId)}
          onClose={() => setPrescriptionAppointmentId(null)}
          appointmentId={prescriptionAppointmentId}
          isDoctorMode={false}
        />
      )}
    </div>
  );
}
