# React Dashboard Application

This is a React-based dashboard application featuring a responsive design, CRUD operations for products, and a user profile management system.

## Features

- Dashboard with dynamic date-filtered graph
- Products management with CRUD operations
- User profile management
- Responsive design (down to 1280px width)
- Modern UI with SCSS styling

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be available in the `dist` directory.

## Project Structure

```
src/
├── components/
│   └── Layout/
│       ├── Layout.tsx
│       └── Layout.scss
├── pages/
│   ├── Dashboard/
│   │   ├── Dashboard.tsx
│   │   └── Dashboard.scss
│   ├── Products/
│   │   ├── Products.tsx
│   │   └── Products.scss
│   └── Profile/
│       ├── Profile.tsx
│       └── Profile.scss
├── App.tsx
└── App.scss
```

## Technologies Used

- React
- TypeScript
- Vite
- React Router
- Recharts
- SCSS

## Notes

- The application uses mock data for demonstration purposes
- All styling is done using SCSS without any external UI libraries
- The application is responsive down to 1280px width
# ringover-assignment
