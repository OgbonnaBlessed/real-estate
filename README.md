![Terra_haven](https://github.com/user-attachments/assets/641903e4-9ec1-441a-a764-4f5bcaf0555e)

# TERRA HAVEN

## Project Overview
**Terra Haven** is a modern real estate web application that allows users to explore, manage, and interact with property listings through a real-time geospatial interface. It delivers an immersive, map-based browsing experience powered by responsive design, advanced geolocation, and a high-performance backend, ensuring both aesthetics and functionality.

## Problem Statement

### 1. Fragmented Real Estate Experiences
- **Challenge**: Traditional platforms lack intuitive geospatial interaction and efficient data filtering, resulting in poor user experience and wasted time.
- **Solution**: Terra Haven integrates dynamic maps with rich geolocation features to allow users to browse properties visually and filter listings seamlessly.

### 2. Poor Data Responsiveness and Integration
- **Challenge**: Real estate users need fast, reliable data and real-time filtering options to make timely decisions.
- **Solution**: By leveraging modern frontend and backend stacks including Redux Toolkit Query and PostGIS, Terra Haven ensures high responsiveness, real-time interactivity, and spatially-aware data handling.

## Project Goals
- **Geospatial Discovery**: Provide a map-first approach for intuitive property browsing.
- **Real-Time Data Flow**: Ensure smooth, responsive interactions through Redux and spatial queries.
- **Robust Infrastructure**: Build a scalable, cloud-hosted platform using AWS services.

## Key Features
- **Interactive Map Search**: Browse listings using a live, zoomable map interface.
- **Property Listings**: View detailed property information, images, and location data.
- **Advanced Filters**: Narrow down listings based on user-selected criteria.
- **User Authentication**: Secure signup/login via AWS Cognito.
- **Real-Time Feedback**: Live notifications and alerts using Shadcn Sonner.

## Tech Stack
### Frontend:
- **Next.js & TypeScript**: Dynamic routing and strongly typed UI development.
- **Mapbox & Mapbox React GL**: High-performance geospatial rendering.
- **Shadcn UI + Sonner**: Elegant and responsive component styling and user feedback.
- **React Hook Form + Zod**: Form handling and validation.
- **Redux Toolkit + RTK Query**: State and API management.

### Backend:
- **PostgreSQL + PostGIS**: Relational database with geospatial extensions.
- **Prisma ORM**: Database abstraction and modeling.
- **AWS Cognito**: Scalable and secure authentication.
- **AWS CLI & EC2**: Cloud infrastructure deployment and management.
- **Postman**: API testing.

## Website Pages
- **Home Page**: Showcases featured listings and introduces the platform.
- **Map Interface**: Core of the platform for geospatial property discovery.
- **Property Detail Page**: Provides comprehensive details, images, and location maps.
- **User Dashboard**: Manage listings, saved searches, and profile information.
- **Auth Pages**: Secure and user-friendly registration and login.

## Target Users & Personas
- **Homebuyers & Renters**: Individuals looking for intuitive, real-time property search.
- **Real Estate Agents**: Professionals seeking to list and manage multiple properties efficiently.
- **Urban Planners & Developers**: Users exploring properties with spatial insights for planning.

## Git Setup and Version Control Workflow
### Repository Structure
Organized for clear separation of concerns between frontend, backend, and shared resources.

### Branching Strategy:
- **main**: Stable production-ready code.
- **develop**: Integration of new features before merging into main.
- **feature/branch-name**: Dedicated branches for individual feature development.

### Workflow:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo.git
2. Create a new feature branch:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/branch-name
3. Commit your changes:
   ```bash
   git add .
   git commit -m "Added feature description"
4. Push your changes:
   ```bash
   git push origin feature/branch-name
5. Open a pull request (PR) for review before merging into develop

[Project Documentation](https://docs.google.com/document/d/1CHLGt1O6PQtdmJkHuu-Z6pnZvGybBC-BOU-U0NsacKc/edit?usp=sharing)
