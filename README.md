# Shivam Automobiles

A single-project Next.js 15 full-stack application for Shivam Automobiles, an authorized Mahindra spare parts and specialized Mahindra car workshop business in Ranchi.

## Tech Stack

- Next.js 15 App Router, React, TypeScript
- Tailwind CSS, ShadCN-style UI, Framer Motion-ready structure, React Icons, Lucide icons
- MongoDB Atlas with Mongoose models
- JWT admin authentication
- Cloudinary-ready image uploads
- React Hook Form, Zod validation, Sonner toasts, Recharts dashboard charts

## Run Locally

```bash
npm install
cp .env.example .env.local
npm run seed
npm run dev
```

Open `http://localhost:3000`.

Admin panel: `http://localhost:3000/admin`

Username defaults to `admin`. Password is read from `ADMIN_PASSWORD`.

## Project Structure

- `app/`: public pages, admin page, API routes, SEO files
- `components/`: layout, forms, admin UI, ShadCN-style primitives
- `lib/`: MongoDB, auth, Cloudinary, constants, validators, utilities
- `models/`: Admin, Customer, Part, Inventory, Booking, Enquiry, Review, Gallery, Settings
- `hooks/`: browser hooks
- `types/`: shared TypeScript types
- `scripts/`: seed data

## Production Notes

Use strong values for `JWT_SECRET` and `ADMIN_PASSWORD`. Configure MongoDB Atlas in `MONGODB_URI`. Add Cloudinary credentials for production image uploads.
"# ShivamAutomobile" 
