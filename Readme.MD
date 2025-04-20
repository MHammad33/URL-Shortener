# URL Shortener

## Description

A simple URL shortening service that allows users to shorten long URLs and track the access count. Built with **Node.js**, **Express**, and **MongoDB**.

## Features

- Shorten long URLs.
- Copy short URL to clipboard.
- View all shortened URLs with their access count.
- Delete a shortened URL.
- Toggle between Light and Dark mode.

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or above)
- [MongoDB](https://www.mongodb.com/try/download/community) (Running locally or use MongoDB Atlas)

### Getting Started

1. **Clone the repository:**

   ```bash
   git clone -b dev https://github.com/MHammad33/MuhammadHammad-innovaxel-Afzal.git
   ```

2. **Install dependencies:**
   Navigate to the project directory and install the required packages:

   ```bash
   cd MuhammadHammad-innovaxel-Afzal
   cd backend
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:

   ```
   MONGODB_URL=<your_mongodb_connection_string>
   PORT=3000
   ```

4. **Run the application:**
   To start the development server:

   ```bash
   npm run dev
   ```

   The app should now be running at `http://localhost:3000`.

### Routes

- **POST /api/urls/shorten** - Create a short URL.
  - **Body**: `{ "originalUrl": "<your-original-url>" }`
  - **Response**:
  ```json
  {
  	"id": "6804b2c59cfab173a40a13be",
  	"originalUrl": "https://drive.google.com/file/d/1_Cg2gjDgmzE7FBEdcZTQ0Uknfiu6c9Le/view1121",
  	"shortUrl": "56c5e120-1",
  	"accessCount": 0,
  	"createdAt": "2025-04-20T08:39:33.050Z",
  	"updatedAt": "2025-04-20T08:39:33.050Z"
  }
  ```
- **GET /api/urls** - Get a list of all shortened URLs.
- **DELETE /api/urls/\*\***:id\*\* - Delete a URL by its ID.

### Frontend

1. **Frontend setup**:

   ```bash
   cd frontend
   npm install
   ```

2. **Run frontend development server**:

   ```bash
   npm run dev
   ```

   The frontend app should now be running at `http://localhost:5173`.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new Pull Request.

> 🛠 **Note:** All application code is on the `dev` branch. The `main` branch only contains this README.
