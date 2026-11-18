'use client';

import React, { useState, useEffect } from 'react';
import { prescriptionApi } from '@/api/prescriptions';
import { Prescription } from '@/types';
import { X, FileText, Pill, Stethoscope, Printer, AlertCircle } from 'lucide-react';

interface PrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentId: number;
  doctorName?: string;
  patientName?: string;
  isDoctorMode?: boolean;
  onSuccess?: () => void;
}

export function PrescriptionModal({
  isOpen,
  onClose,
  appointmentId,
  doctorName,
  patientName,
  isDoctorMode = false,
  onSuccess,
}: PrescriptionModalProps) {
  const [prescription, setPrescription] = useState<Prescription | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state for Doctor Mode
  const [diagnosis, setDiagnosis] = useState('');
  const [medicines, setMedicines] = useState('');
  const [instructions, setInstructions] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen && appointmentId) {
      fetchPrescription();
    }
  }, [isOpen, appointmentId]);

  const fetchPrescription = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await prescriptionApi.getByAppointment(appointmentId);
      setPrescription(data);
      if (data) {
        setDiagnosis(data.diagnosis);
        setMedicines(data.medicines);
        setInstructions(data.instructions);
      }
    } catch (err: any) {
      if (!isDoctorMode) {
        setError('No digital prescription found for this consultation yet.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleIssuePrescription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!diagnosis.trim() || !medicines.trim()) {
      setError('Diagnosis and medicines are required.');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await prescriptionApi.issue({
        appointmentId,
        diagnosis: diagnosis.trim(),
        medicines: medicines.trim(),
        instructions: instructions.trim(),
      });
      if (onSuccess) onSuccess();
      fetchPrescription();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to issue prescription.');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-gray-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-teal-600 text-white p-5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-xl">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Electronic Medical Prescription</h3>
              <p className="text-xs text-teal-100">Consultation #{appointmentId}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-teal-100 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {isDoctorMode && !prescription ? (
            /* Doctor issuance form */
            <form onSubmit={handleIssuePrescription} className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-800">
                You are issuing an official electronic prescription for this consultation.
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Clinical Diagnosis <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="e.g. Acute Pharyngitis, Stage 1 Hypertension"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Prescribed Medicines & Dosage <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={medicines}
                  onChange={(e) => setMedicines(e.target.value)}
                  placeholder="e.g. Tab. Dolo 650mg (1 tablet thrice daily after food for 3 days)&#10;Tab. Pantocid 40mg (1 tablet once daily morning before breakfast)&#10;Tab. Telma 40mg (1 tablet daily morning)"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-600 font-mono text-xs"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Instructions & Follow-Up
                </label>
                <textarea
                  rows={2}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Stay hydrated, avoid cold beverages, follow up in 7 days if symptoms persist."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-600"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border rounded-xl text-xs font-semibold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold"
                >
                  {saving ? 'Issuing Prescription...' : 'Issue Prescription'}
                </button>
              </div>
            </form>
          ) : prescription ? (
            /* Prescription View */
            <div className="space-y-4 print:p-0">
              <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/50 space-y-4">
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">
                      Dr. {doctorName || prescription.doctorName || 'Attending Physician'}
                    </h4>
                    <p className="text-xs text-teal-700 font-medium">Licensed Medical Practitioner</p>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <p>Rx ID: #{prescription.id}</p>
                    <p>{prescription.issuedAt || new Date().toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-gray-500">
                    Diagnosis
                  </span>
                  <p className="text-sm font-semibold text-gray-900 mt-0.5">
                    {prescription.diagnosis}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-gray-500 flex items-center gap-1">
                    <Pill className="w-3.5 h-3.5 text-teal-600" />
                    Rx / Medications
                  </span>
                  <div className="mt-1 bg-white p-3.5 rounded-xl border border-gray-200 text-xs text-gray-800 whitespace-pre-wrap font-mono">
                    {prescription.medicines}
                  </div>
                </div>

                {prescription.instructions && (
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-gray-500">
                      Dietary & Clinical Instructions
                    </span>
                    <p className="text-xs text-gray-700 mt-0.5 bg-teal-50/60 p-3 rounded-xl border border-teal-100">
                      {prescription.instructions}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-[11px] text-gray-400">
                  Digitally signed under National Medical Commission (NMC) & Ayushman Bharat Digital Mission (ABDM) standards
                </span>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Rx
                </button>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-gray-400">
              Loading prescription data...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
