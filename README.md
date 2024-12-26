# Core skills

## Overview

Core skills is a web-based platform designed to help lecturers monitor and manage teaching progress in core skills for engineering students. The platform provides an intuitive interface to store, view, and analyze data related to courses, activities, lecturers, and skills, empowering educators to track and enhance student outcomes.

## Features

### Core Features

- **Dynamic Skills-Activities Graph**: Visualize relationships between skills and activities using a nodes-edges graph.
- **User Authentication**: Secure user login with Firebase authentication.
- **Search Functionality**: Quickly find information on courses, skills, and activities.
- **Activity Management**: Create, update, and manage teaching activities.
- **Questionnaire Management**: Support for storing and analyzing activity-related reflections and feedback.
- **Course and Skill Information Display**: Access detailed views of courses, skills, and their properties.

### Non-Functional Requirements

- **Usability**: Intuitive and user-friendly design.
- **Performance**: Optimized to handle multiple concurrent users efficiently.
- **Reliability**: Ensures accurate data storage and retrieval.
- **Scalability**: Supports growth in user base and data volume.
- **Maintainability**: Designed for easy updates and modifications.
- **Interoperability**: Seamless integration with Firebase and other relevant tools.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Framer Motion, D3.js
- **Backend**: Firebase
- **Database**: Firebase Firestore

## Installation

### Prerequisites

- Node.js (version 16 or later)
- Firebase project set up with authentication and database rules

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/FinalProject19994/finalProject.git
   cd finalProject
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   - Create a `.env.local` file in the project root.
   - Add Firebase configuration keys and MongoDB connection string.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. **Login**: Use your credentials to log into the system.
2. **Navigate**: Explore the dashboard for course, activity, and skills management.
3. **Visualize**: Use the graph view to see the relationships between skills and activities.
4. **Manage Data**: Add or update courses, activities, and skills through intuitive forms.

## Project Objectives

- Provide a clear and organized platform for lecturers to manage teaching data.
- Ensure the system is maintainable and extendable for future use.
- Enable real-time updates and visualization for enhanced decision-making.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`feature/new-feature-name`).
3. Commit your changes.
4. Push the branch and create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

Special thanks to our academic mentors and peers for their support and guidance throughout this project.

