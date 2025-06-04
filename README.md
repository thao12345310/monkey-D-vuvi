# 🐒D Luffy Website (Vietnam Travel & Culture Website)

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

## Contributors

This project was developed by the following team members. The member in bold is the team leader.

Name	Student ID	Contributions
Duong Phuong Thao	20226001	- Managed overall development process
- Designed Entity-Relationship Diagram and Relational Schema
- Implemented backend CRUD for company bookings
- Built frontend for company dashboard
- Finalized report and slides
Hoang Khai Manh	20225984	- Implemented authentication and authorization
- Developed backend CRUD for users and user bookings
- Dockerized the application
- Participated in testing and report writing
Trinh Thi Thuy Duong	20226034	- Researched and trained AI recommendation model
- Integrated Tavily/Google Search API
- Built LangGraph Agent
- Helped collect and preprocess restaurant data
- Participated in testing and report writing
Nguyen Cong Duy	20215188	- Crawled and preprocessed data
- Refined database schema
- Developed backend CRUD for hotels, cruises, rooms, and companies
- Participated in testing and report writing
Doan Thi Thu Quyen	20226063	- Built frontend for hotel/cruise search pages
- Created frontend for Home and Contact pages
- Designed overall page layout
- Participated in testing and report writing
Nguyen Thi Thu Huyen	20220073	- Developed frontend for hotel and cruise detail pages
- Built booking history page
- Prepared slides and presentation materials
- Participated in testing and report writing

## License



## Contact

For any inquiries, please contact us at [duongphuongthao08102004@gmail.com].
