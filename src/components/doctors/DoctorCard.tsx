'use client';

import React from 'react';
import Link from 'next/link';
import { Doctor } from '@/types';
import {
  Star,
  Award,
  Clock,
  DollarSign,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Building,
} from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
  onSelectSlot?: (doctor: Doctor) => void;
}

export function DoctorCard({ doctor, onSelectSlot }: DoctorCardProps) {
  const rating = doctor.averageRating || 4.9;
  const reviewCount = doctor.totalReviews || 18;

  return (
    <article
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
      itemScope
      itemType="https://schema.org/Physician"
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          {/* Avatar or fallback */}
          <div className="relative shrink-0">
            {doctor.profileImageUrl ? (
              <img
                src={doctor.profileImageUrl}
                alt={`Photo of Dr. ${doctor.fullName}`}
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border border-teal-100 shadow-sm"
                itemProp="image"
              />
            ) : (
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-white font-bold text-2xl flex items-center justify-center shadow-inner">
                {doctor.fullName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .substring(0, 2)
                  .toUpperCase()}
              </div>
            )}
            <span
              title="Verified Medical Practitioner"
              className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow"
            >
              <ShieldCheck className="w-5 h-5 text-teal-600 fill-teal-50" />
            </span>
          </div>

          {/* Core Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700">
                {doctor.specialization}
              </span>
              {doctor.departmentName && (
                <span className="text-[11px] text-gray-500 flex items-center gap-1">
                  <Building className="w-3 h-3" />
                  {doctor.departmentName}
                </span>
              )}
            </div>

            <h3
              className="mt-1 text-base sm:text-lg font-bold text-gray-900 truncate hover:text-teal-600 transition"
              itemProp="name"
            >
              <Link href={`/doctors/${doctor.id}`}>Dr. {doctor.fullName}</Link>
            </h3>

            <p className="text-xs text-gray-500 mt-0.5 font-medium" itemProp="qualifications">
              {doctor.qualification} • {doctor.experienceYears} Years Exp.
            </p>

            {/* Rating badge */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-500 text-xs font-bold gap-1 bg-amber-50 px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-gray-400">({reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Short Bio */}
        {doctor.about && (
          <p
            className="mt-3.5 text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed"
            itemProp="description"
          >
            {doctor.about}
          </p>
        )}

        {/* Highlights */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>Next Available Today</span>
          </div>
          <div className="font-semibold text-gray-900 text-sm">
            <span className="text-xs text-gray-500 font-normal">Fee: </span>
            <span className="text-teal-700 font-bold">₹{doctor.consultationFee}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="bg-gray-50/70 p-4 border-t border-gray-100 flex items-center gap-2">
        <Link
          href={`/doctors/${doctor.id}`}
          className="flex-1 text-center py-2 px-3 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
        >
          View Profile
        </Link>
        <Link
          href={`/doctors/${doctor.id}#slots`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-xs sm:text-sm font-semibold text-white shadow-sm transition"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Slot</span>
        </Link>
      </div>
    </article>
  );
}
