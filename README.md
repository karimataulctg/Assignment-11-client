# Book Management System

## Project Overview
A web-based Library Management System for a well-renowned school. The system allows the addition, categorization, and updating of books. It supports tracking of borrowed and returned books, ensuring efficient management of transactions.

## Live URL
[https://library-management-syste-fae30.web.app/](https://library-management-syste-fae30.web.app/)

## Depository URL
[https://github.com/programming-hero-web-course2/b10a11-client-side-karimataulctg](https://github.com/programming-hero-web-course2/b10a11-client-side-karimataulctg)

## Key Features
- User Authentication: Login/Register with Email/Password or Google
- Book Management: Dynamic categorization, details display, and updates
- Borrow/Return System: Track book transactions with due dates
- Protected Routes: Secure access for authorized users only
- Responsive Design: Optimized for all device sizes
- Dynamic UI: Animated components with Framer Motion and Swiper JS
- Notifications: Interactive alerts with SweetAlert2
- Form Handling: Efficient form validation with React Hook Form

## Tech Stack

 ## Frontend
- React + React Router
- Tailwind CSS + DaisyUI
- Axios for API communication
- Swiper JS, Framer Motion, React Rating Stars

## Backend & Auth

- Firebase Authentication
- Firebase Hosting

## Utilities

- React Hook Form
- SweetAlert2

## Setup Instructions

1. Clone the repository:
git clone https://github.com/programming-hero-web-course2/b10a11-client-side-karimataulctg.git

2. Install dependencies:
cd b10a11-client-side-karimataulctg && npm install

3. Create .env file with your Firebase config:
VITE_API_KEY=your_key
VITE_AUTH_DOMAIN=your_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_bucket
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id

4. Start development server:
npm run dev