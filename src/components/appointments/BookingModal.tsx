'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { appointmentApi } from '@/api/appointments';
import { useAuthStore } from '@/store/useAuthStore';
import { Doctor, Slot } from '@/types';
import {
  X,
  Calendar,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  FileText,
  DollarSign,
  ShieldCheck,
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor;
  slot: Slot | null;
  date: string;
}

export function BookingModal({
  isOpen,
  onClose,
  doctor,
  slot,
  date,
}: BookingModalProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [patientId, setPatientId] = useState<string>('1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !slot) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      setError('Please provide a brief reason for consultation');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await appointmentApi.book({
        patientId: Number(patientId) || 1,
        doctorId: doctor.id,
        appointmentDate: date,
        startTime: slot.startTime.length === 5 ? `${slot.startTime}:00` : slot.startTime,
        reason: reason.trim(),
        notes: notes.trim() || undefined,
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
        router.push('/patient');
      }, 1500);
    } catch (err: any) {
      if (err.response?.status === 409) {
        setError(
          err.response?.data?.message ||
            'This time slot has just been reserved by another patient. Please choose an alternate slot.'
        );
      } else if (err.response?.data?.errors) {
        const errorMap = err.response.data.errors;
        const msg = Object.values(errorMap).join(', ');
        setError(msg || 'Validation failed. Please verify your details.');
      } else {
        setError(err.response?.data?.message || 'Failed to book appointment. Please check your network.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-6 flex justify-between items-start">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-bold bg-teal-800/60 px-2 py-0.5 rounded-full text-teal-100">
              Confirm Consultation
            </span>
            <h2 className="text-xl font-bold mt-1">Book Dr. {doctor.fullName}</h2>
            <p className="text-xs text-teal-100 mt-0.5">{doctor.specialization}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-teal-100 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Appointment Summary Chip */}
        <div className="bg-teal-50/60 px-6 py-4 border-b border-teal-100/60 flex items-center justify-between text-xs sm:text-sm text-teal-900">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-teal-600" />
            <span className="font-semibold">{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-600" />
            <span className="font-semibold">{slot.startTime.substring(0, 5)}</span>
          </div>
          <div className="flex items-center gap-1 font-bold text-teal-800">
            <span>Fee: ₹{doctor.consultationFee}</span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs sm:text-sm text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-800 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Appointment successfully booked! Redirecting to your dashboard...</span>
            </div>
          )}

          {/* Patient ID */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Patient Record ID
            </label>
            <input
              type="number"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-600"
              placeholder="Enter patient ID (e.g. 1)"
              required
            />
          </div>

          {/* Primary Reason */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Reason for Visit <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g., Routine checkup, chronic back pain, skin rash"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-600"
              required
            />
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Clinical Notes or Allergies (Optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any previous medications, relevant symptoms, or questions for the doctor..."
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-600"
            ></textarea>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || success}
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-sm font-semibold shadow-md transition flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Confirming...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Book Appointment</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
