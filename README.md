# Campsite 🏕

A social network for camping enthusiasts to share experiences, connect with fellow campers, and discover new camping locations. Built using the MERN stack (MongoDB, Express.js, React, Node.js).

![Campsite Preview](https://via.placeholder.com/800x400.png?text=Campsite+Screenshot) <!-- Add your screenshot here -->

## Features

### 🔒 Authentication & Security
- JWT-based user authentication
- Email confirmation flow using Nodemailer
- Protected routes and authorization

### 📝 Post Management
- Create/Edit posts with title and description
- Select network availability from predefined list
- Upload multiple photos using React Dropzone
- Cloudinary integration for image storage
- Delete posts functionality

### 🖼 Media Handling
- Image carousel using slick-carousel
- Drag & drop image uploads
- Cloud storage for optimized performance

### 🕑 Time Display
- Post timestamps using Moment.js
- Relative time display (e.g., "2 hours ago")

### 👤 User Profile
- Profile page with user information
- View personal posts history
- Search functionality across posts

### 🎨 UI/UX Features
- Toast notifications with React Toastify
- Interactive user interface
- Loading states using react-loader-spinner and error handling

## Technologies Used

### Frontend
- React.js
- React Router
- React Toastify
- React Dropzone
- Slick-carousel
- Moment.js
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- Nodemailer
- Cloudinary SDK
- CORS

### Development Tools
- Postman (API testing)
- Git & GitHub

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account
- Cloudinary account
- NPM/Yarn

### Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/your-username/campsite.git
cd campsite
