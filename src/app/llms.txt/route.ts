import { NextResponse } from 'next/server';

export async function GET() {
  const content = `# Dr.Appoinment — Healthcare Booking & Clinical AI Assistant

> Dr.Appoinment is a modern digital health platform facilitating immediate verified medical appointment scheduling, real-time doctor availability checks, electronic prescriptions, and multi-turn AI healthcare assistance.

## Key Capabilities
- **Doctor Search & Filtering**: Multi-criteria matching across Medical Specialties (Cardiology, Dermatology, Neurology, Orthopedics, Pediatrics, etc.), experience years, and consultation fee.
- **Dynamic Slot Generator**: Live calculation of open 30-minute consultation slots per doctor per day.
- **Automated AI Assistant**: Powered by Spring AI & Google Gemini to assist patients in triaging symptoms, discovering fitting specialists, and scheduling appointments conversationally.
- **Role-Based Portals**: Tailored interfaces for Patients, Doctors, Receptionists, and Administrators.

## Important Endpoints & Public Access
- Home & Search: /
- Doctor Directory: /doctors
- Doctor Slot Scheduling: /doctors/[id]
- Patient Dashboard: /patient
- Doctor Dashboard: /doctor

## Backend REST API
- Base URL: http://localhost:8080/api
- Endpoints:
  - Auth: POST /api/auth/login, POST /api/auth/register, GET /api/auth/me
  - Doctors: GET /api/doctors, GET /api/doctors/{id}, GET /api/doctors/{id}/slots?date=YYYY-MM-DD
  - Appointments: POST /api/appointments, PATCH /api/appointments/{id}/cancel, PATCH /api/appointments/{id}/reschedule
  - Prescriptions: GET /api/prescriptions/patient/{id}, POST /api/prescriptions
  - Reviews: GET /api/reviews/doctor/{id}/summary, POST /api/reviews
  - AI Chat: POST /api/chat { "message": "...", "conversationId": "..." }
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
