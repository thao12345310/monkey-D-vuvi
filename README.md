# Vietnam Travel & Culture Website

## Introduction

Welcome to our Vietnam Travel & Culture website! This platform is designed to provide an immersive experience for users who want to explore the beauty of Vietnam, from breathtaking landscapes to rich cultural heritage. Our website offers travel guides and an easy-to-use booking system for yachts, hotels, and plane tickets to help visitors plan their trips efficiently.

This project is developed as part of the **Software Engineering** course at our university, following best practices in software development, teamwork, and project management.

## Features

- **User Authentication**: Sign up, log in, and manage user accounts.
- **Yacht, Hotel, and Plane Ticket Booking**: Users can search, book, and manage reservations.
- **Interactive Travel Guides**: Comprehensive travel information on different regions of Vietnam.
- **Image & Media Support**: Display images of destinations and accommodations.
- **User Engagement**: Review and rate hotels, yachts, and flights.
- **Responsive Design**: Optimized for mobile and desktop viewing.

## Tech Stack

- **Frontend**: React.js with Tailwind CSS for styling.
- **Backend**: Java Spring Boot (MVC architecture).
- **Database**: PostgreSQL for storing user data, bookings, and reviews.
- **Authentication**: JWT-based authentication for secure user login.

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- Node.js
- Java (JDK 17 or later)
- PostgreSQL

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/thao12345310/monkey-D-luffy.git
   cd monkey-D-luffy/backend
   ```
2. Configure PostgreSQL in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/your_db_name
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```
3. Run database migrations (if applicable):
   ```sh
   ./mvnw flyway:migrate
   ```
4. Build and run the backend:
   ```sh
   ./mvnw spring-boot:run
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Deployment

- Frontend: Deployed using Vercel/Netlify.
- Backend: Hosted on a cloud service like AWS, Render, or Railway.
- Database: Managed PostgreSQL instance.

## Contribution

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch (`feature/your-feature`).
3. Commit changes and push to GitHub.
4. Create a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, please contact us at [duongphuongthao08102004@gmail.com].
