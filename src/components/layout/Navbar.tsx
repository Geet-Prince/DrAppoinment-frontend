'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import {
  Stethoscope,
  Calendar,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  Sparkles,
  Search,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout, initialize } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const navLinks = [
    { label: 'Find Doctors', href: '/doctors', icon: Search },
    { label: 'Specialties', href: '/#specialties' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'FAQs', href: '/#faqs' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/20 group-hover:bg-teal-700 transition">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-teal-600 transition">
                Dr.<span className="text-teal-600">Appoinment</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] bg-teal-100 text-teal-800 font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                AI Powered
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    active
                      ? 'text-teal-600 bg-teal-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* User actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                {user.role === 'PATIENT' && (
                  <Link
                    href="/patient"
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-teal-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    <Calendar className="w-4 h-4 text-teal-600" />
                    My Appointments
                  </Link>
                )}

                {user.role === 'DOCTOR' && (
                  <Link
                    href="/doctor"
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-teal-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    <Stethoscope className="w-4 h-4 text-teal-600" />
                    Doctor Portal
                  </Link>
                )}

                <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                  <div className="text-right">
                    <p className="text-xs font-semibold text-gray-900 truncate max-w-[120px]">
                      {user.email}
                    </p>
                    <span className="text-[10px] uppercase font-bold text-teal-600 tracking-wider">
                      {user.role}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    title="Log out"
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 transition"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm hover:shadow transition"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-teal-600 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 bg-white px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-600"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 space-y-2">
            {isAuthenticated && user ? (
              <>
                {user.role === 'PATIENT' && (
                  <Link
                    href="/patient"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-teal-600"
                  >
                    My Appointments
                  </Link>
                )}
                {user.role === 'DOCTOR' && (
                  <Link
                    href="/doctor"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-teal-600"
                  >
                    Doctor Portal
                  </Link>
                )}
                <div className="px-3 py-2 text-sm text-gray-500">
                  Signed in as <span className="font-semibold text-gray-800">{user.email}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"
                >
                  Log out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
