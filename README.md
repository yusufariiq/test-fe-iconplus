# Sistem Pemesanan Ruang Meeting

Aplikasi web berbasis React untuk memesan ruang rapat yang dibuat dengan TypeScript, Vite, dan Tailwind CSS.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn or pnpm package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yusufariiq/test-fe-iconplus
cd test-fe-iconplus
```

2. Install dependencies:

```bash
npm install
```

## Environment Setup

Create a `.env` file in the root directory and add the following environment variables:

```env
VITE_UNIT=<your-unit-api-endpoint>
VITE_MEETING_ROOM=<your-meeting-room-api-endpoint>
VITE_JENIS_KONSUMSI=<your-consumption-type-api-endpoint>
```

Replace the placeholder URLs with your actual API endpoints.

## Running the Project

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src
├── App.css
├── App.tsx
├── assets
│   └── react.svg
├── components
│   ├── common
│   │   ├── booking-form.tsx
│   │   ├── breadcrumbs.tsx
│   │   ├── loading.tsx
│   │   ├── navbar.tsx
│   │   └── sidebar.tsx
│   └── ui
│       └── button.tsx
├── constants
│   ├── timeRules.ts
│   └── timeSlots.ts
├── hooks
│   ├── useBookingData.ts
│   └── useBookingForm.ts
├── main.tsx
├── pages
│   └── meeting-room.tsx
├── services
│   └── bookingServices.ts
├── types
│   └── booking.ts
├── utils
│   └── utils.ts
└── vite-env.d.ts
```

## Features

- Pemilihan unit dan ruang rapat
- Pemesanan tanggal dan waktu dengan validasi
- Manajemen jumlah peserta
- Pemilihan jenis konsumsi otomatis berdasarkan waktu rapat
- Perhitungan total biaya secara otomatis berdasarkan jumlah partisipan
- Validasi formulir

## Technologies Used

- **React** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icons
