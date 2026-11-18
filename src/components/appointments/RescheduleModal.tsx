'use client';

import React, { useState } from 'react';
import { appointmentApi } from '@/api/appointments';
import { Appointment } from '@/types';
import { X, Calendar, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  onSuccess: () => void;
}

export function RescheduleModal({
  isOpen,
  onClose,
  appointment,
  onSuccess,
}: RescheduleModalProps) {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [startTime, setStartTime] = useState('10:00:00');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !appointment) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointmentDate || !startTime || !reason.trim()) {
      setError('Please provide date, time, and reason for rescheduling.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await appointmentApi.reschedule(appointment.id, {
        appointmentDate,
        startTime: startTime.length === 5 ? `${startTime}:00` : startTime,
        reason: reason.trim(),
      });

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1200);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          'Failed to reschedule appointment. The doctor may not be available at this new time slot.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100">
        <div className="bg-teal-600 text-white p-5 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg">Reschedule Appointment #{appointment.id}</h3>
            <p className="text-xs text-teal-100">Pick a new date and time slot</p>
          </div>
          <button onClick={onClose} className="text-teal-100 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Appointment rescheduled successfully!</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">New Date</label>
            <input
              type="date"
              value={appointmentDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">New Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Reason for Reschedule
            </label>
            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Schedule conflict, personal emergency"
              className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-600"
              required
            ></textarea>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || success}
              className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold"
            >
              {loading ? 'Rescheduling...' : 'Confirm New Slot'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
