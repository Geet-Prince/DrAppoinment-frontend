'use client';

import React from 'react';
import { Department, DoctorSearchParams } from '@/types';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';

interface DoctorFilterBarProps {
  departments: Department[];
  specializations: string[];
  filters: DoctorSearchParams;
  onFilterChange: (filters: DoctorSearchParams) => void;
  onReset: () => void;
}

export function DoctorFilterBar({
  departments,
  specializations,
  filters,
  onFilterChange,
  onReset,
}: DoctorFilterBarProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={filters.query || ''}
          onChange={(e) => onFilterChange({ ...filters, query: e.target.value })}
          placeholder="Search by doctor name, specialty, or clinical symptom..."
          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition"
        />
        {filters.query && (
          <button
            onClick={() => onFilterChange({ ...filters, query: '' })}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
        {/* Department */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Department</label>
          <select
            value={filters.departmentId || ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                departmentId: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-gray-700 focus:outline-none focus:border-teal-600"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        {/* Specialization */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Specialization</label>
          <select
            value={filters.specialization || ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                specialization: e.target.value || undefined,
              })
            }
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-gray-700 focus:outline-none focus:border-teal-600"
          >
            <option value="">All Specialties</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Min. Experience ({filters.minExperience || 0}+ Years)
          </label>
          <select
            value={filters.minExperience || 0}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                minExperience: Number(e.target.value) || undefined,
              })
            }
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-gray-700 focus:outline-none focus:border-teal-600"
          >
            <option value="0">Any Experience</option>
            <option value="3">3+ Years</option>
            <option value="5">5+ Years</option>
            <option value="10">10+ Years</option>
            <option value="15">15+ Years</option>
          </select>
        </div>

        {/* Max Fee */}
        <div>
          <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
            <span>Max Fee</span>
            <span className="text-teal-700 font-bold">₹{filters.maxFee || 2500}</span>
          </div>
          <input
            type="range"
            min="200"
            max="2500"
            step="100"
            value={filters.maxFee || 2500}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                maxFee: Number(e.target.value),
              })
            }
            className="w-full accent-teal-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Active filters and reset */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
        <span className="text-gray-500">
          Tip: Filter by department or symptoms to quickly connect with the right clinical specialist.
        </span>
        <button
          onClick={onReset}
          className="text-gray-500 hover:text-red-600 font-semibold flex items-center gap-1 transition"
        >
          <X className="w-3.5 h-3.5" />
          Reset Filters
        </button>
      </div>
    </div>
  );
}
