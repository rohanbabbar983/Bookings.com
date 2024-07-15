# Bookings.com

Welcome to the Bookings.com frontend repository! This project is designed to provide a user-friendly and engaging platform for hotel bookings and management.

## Live Demo
Check out the live site: https://bookings-com.onrender.com

## Features
- **React** with **TypeScript** for a robust and maintainable codebase
- **Vite** for fast and optimized development
- **Node.js** with **Express** for scalable server-side logic
- **MongoDB** for database management
- **Stripe** for payment processing
- **Cloudinary** for image handling
- **Tailwind CSS** for beautiful UI design
- **React Hook Form** for form management

## Installation

1. Clone the repository
    ```bash
    git clone https://github.com/rohanbabbar983/Bookings.com.git
    ```

2. Install dependencies (for both frontend and backend)
    ```bash
    npm install 
    ```

3. Create a `.env` file in the frontend and add the necessary environment variables:
    ```env
    VITE_API_BASE_URL=http://localhost:7000
    VITE_STRIPE_PUB_KEY=your_stripe_public_key
    ```
4. Create a `.env` file in the root directory and add the necessary environment variables:
     ```env
    MONGODB_CONNECTION_STRING=your_mongo_uri
    JWT_SECRET_KEY= your_secret_key
    STRIPE_API_KEY=your_stripe_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    FRONTEND_URL=http://localhost:5173
    ```


5. Start both frontend and backend 
    ```bash
    npm run dev
    ```

## Usage

Visit `http://localhost:5173` to see the application in action.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
