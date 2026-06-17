StayVista – Full-Stack Rental Listing Platform

StayVista is a full-stack rental marketplace inspired by Airbnb, built with Node.js, Express, and MongoDB. Hosts can list properties, guests can browse, book, and review stays, and all media is handled through Cloudinary.

Live Demo: https://hotelllisting-major-project.onrender.com/listings

Features


User authentication with session-based login (host and guest roles)
Create, read, update, and delete property listings
Booking flow for guests to reserve listings
Review and rating system for completed stays
Image upload and storage via Cloudinary (Multer middleware)
Centralized error-handling middleware across all routes
Server-side validation on all form submissions
Responsive UI built with EJS templating and CSS


Tech Stack

Layer : Technology
Backend : Node.js, Express.js
Database: MongoDB (Mongoose)
Templating :  EJS
Auth:  Passport.js (session-based)
File Storage:  Cloudinary, Multer
Styling:  CSS, Bootstrap

Project Structure

├── controllers/    # Route logic for listings, reviews, users
├── init/           # Database seed scripts
├── models/         # Mongoose schemas (Listing, Review, User)
├── public/         # Static assets (CSS, JS, images)
├── routes/         # Express route definitions
├── utils/          # Helper functions, custom error classes
├── views/          # EJS templates
├── app.js          # Application entry point
├── cloudConfig.js  # Cloudinary configuration
├── middleware.js   # Auth and validation middleware
└── schema.js       # Joi validation schemas

Getting Started
Prerequisites

Node.js (v16+)
MongoDB Atlas account (or local MongoDB instance)
Cloudinary account (for image uploads)


Installation
Clone the repository

bash   git clone https://github.com/Abhishek200559/hotellListing-major-project.git
   cd hotellListing-major-project

Install dependencies
bash   npm install
Create a .env file in the root directory with the following variables:


   ATLASDB_URL=mongodb_connection_string
   CLOUD_NAME=cloudinary_cloud_name
   CLOUD_API_KEY=cloudinary_api_key
   CLOUD_API_SECRET=cloudinary_api_secret
   SECRET=session_secret


Start the server
bash   node app.js


Visit http://localhost:8080/listings in your browser


Future Improvements


Add payment gateway integration for bookings
Implement search and filter functionality for listings
Add wishlist/favorites feature for guests
Migrate the frontend to a component-based framework
