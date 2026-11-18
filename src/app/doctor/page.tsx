'use client';

import React, { useState, useEffect } from 'react';
import { appointmentApi } from '@/api/appointments';
import { useAuthStore } from '@/store/useAuthStore';
import { Appointment } from '@/types';
import { PrescriptionModal } from '@/components/prescriptions/PrescriptionModal';
import {
  Stethoscope,
  Calendar,
  Clock,
  User,
  CheckCircle,
  FilePlus,
  AlertCircle,
  ShieldCheck,
  FileText,
} from 'lucide-react';

const FALLBACK_DOCTOR_APPOINTMENTS: Appointment[] = [
  {
    id: 201,
    patientId: 1,
    patientName: 'Aarav Sharma',
    doctorId: 1,
    doctorName: 'Rajesh Sharma',
    doctorSpecialization: 'Cardiology',
    appointmentDate: new Date().toISOString().split('T')[0],
    startTime: '09:00:00',
    endTime: '09:30:00',
    status: 'CONFIRMED',
    consultationFee: 1200,
    reason: 'Routine ECG and blood pressure check',
    notes: 'Patient reports occasional palpitations',
  },
  {
    id: 202,
    patientId: 2,
    patientName: 'Sunita Rao',
    doctorId: 1,
    doctorName: 'Rajesh Sharma',
    doctorSpecialization: 'Cardiology',
    appointmentDate: new Date().toISOString().split('T')[0],
    startTime: '10:00:00',
    endTime: '10:30:00',
    status: 'CONFIRMED',
    consultationFee: 1200,
    reason: 'Post-angiography follow-up and lipid check',
    notes: 'Vital signs stable',
  },
];

export default function DoctorPortalPage() {
  const { user, initialize } = useAuthStore();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppForRx, setSelectedAppForRx] = useState<Appointment | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const fetchDoctorSchedule = async () => {
    setLoading(true);
    try {
      const docId = user?.id || 1;
      const res = await appointmentApi.getByDoctor(docId);
      if (res?.content && res.content.length > 0) {
        setAppointments(res.content);
      } else {
        setAppointments(FALLBACK_DOCTOR_APPOINTMENTS);
      }
    } catch {
      setAppointments(FALLBACK_DOCTOR_APPOINTMENTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorSchedule();
  }, [user]);

  const handleCompleteAppointment = async (id: number) => {
    setUpdatingId(id);
    try {
      await appointmentApi.updateStatus(id, 'COMPLETED', 'Consultation finished');
      fetchDoctorSchedule();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update appointment status.');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <span className="text-xs uppercase font-bold text-teal-600 tracking-wider">
          Physician Practice Portal
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-0.5">
          Doctor Consultation Schedule
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          Review daily appointments, manage patient attendance, and generate official electronic prescriptions.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-sm text-gray-500">
          <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          Loading daily schedule...
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700">
                    Slot: {app.startTime.substring(0, 5)} - {app.endTime?.substring(0, 5) || '30m'}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      app.status === 'CONFIRMED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : app.status === 'COMPLETED'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  Patient: {app.patientName || `Patient #${app.patientId}`}
                </h3>

                <p className="text-xs text-gray-600">
                  <strong>Reason:</strong> {app.reason}
                </p>

                {app.notes && (
                  <p className="text-xs text-gray-500 italic">Notes: {app.notes}</p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {app.status === 'CONFIRMED' && (
                  <button
                    onClick={() => handleCompleteAppointment(app.id)}
                    disabled={updatingId === app.id}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Complete Session</span>
                  </button>
                )}

                <button
                  onClick={() => setSelectedAppForRx(app)}
                  className="px-4 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-800 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <FilePlus className="w-4 h-4 text-teal-600" />
                  <span>Issue / View Prescription</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedAppForRx && (
        <PrescriptionModal
          isOpen={Boolean(selectedAppForRx)}
          onClose={() => setSelectedAppForRx(null)}
          appointmentId={selectedAppForRx.id}
          doctorName={selectedAppForRx.doctorName || 'Attending Physician'}
          patientName={selectedAppForRx.patientName}
          isDoctorMode={true}
          onSuccess={fetchDoctorSchedule}
        />
      )}
    </div>
  );
}
