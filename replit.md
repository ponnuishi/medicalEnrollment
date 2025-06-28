# Insurance Application System

## Overview

This is a comprehensive insurance application system built with a modern full-stack architecture. The application provides a multi-step form interface for collecting insurance application data, including personal information, insurance details, and medical information. The system uses React with TypeScript for the frontend, Express.js for the backend API, and includes both in-memory storage and PostgreSQL database support via Drizzle ORM.

## System Architecture

The application follows a clean separation of concerns with a client-server architecture:

- **Frontend**: React 18 with TypeScript, built using Vite
- **Backend**: Express.js server with RESTful API endpoints
- **Database**: PostgreSQL with Drizzle ORM for data persistence
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

## Key Components

### Frontend Architecture
- **Component Structure**: Modular React components with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with CSS variables for theming
- **Form Management**: Multi-step form with React Hook Form and Zod validation
- **UI Components**: shadcn/ui component library for consistent design

### Backend Architecture
- **API Server**: Express.js with TypeScript
- **Database Layer**: Drizzle ORM with PostgreSQL adapter
- **Storage Abstraction**: Interface-based storage system supporting both in-memory and database persistence
- **Validation**: Zod schemas for request/response validation
- **Development Tools**: Hot reload with Vite integration

### Database Schema
The application uses a single `insurance_applications` table with comprehensive fields for:
- Personal information (name, contact details, demographics)
- Insurance details (provider, policy, coverage, premiums)
- Medical information (physician details, conditions, medications, allergies)
- Application metadata (status, timestamps)

## Data Flow

1. **Form Submission**: Users complete a 4-step form (Personal Info → Insurance Details → Medical Info → Summary)
2. **Client Validation**: Form data is validated using Zod schemas on the frontend
3. **API Requests**: Validated data is sent to Express.js API endpoints
4. **Server Validation**: Backend re-validates data using shared Zod schemas
5. **Data Persistence**: Applications are stored in PostgreSQL via Drizzle ORM
6. **Response Handling**: Success/error states are managed through TanStack Query

## External Dependencies

### Core Framework Dependencies
- **React 18**: Modern React with hooks and concurrent features
- **Express.js**: Fast, minimalist web framework for Node.js
- **TypeScript**: Type safety across the entire application
- **Vite**: Fast build tool and development server

### Database & ORM
- **Drizzle ORM**: Type-safe SQL ORM with PostgreSQL support
- **@neondatabase/serverless**: Serverless PostgreSQL driver

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible UI primitives
- **shadcn/ui**: Pre-built component library built on Radix UI

### Form & Validation
- **React Hook Form**: Performant forms with minimal re-renders
- **Zod**: TypeScript-first schema validation library

### Development Tools
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with autoprefixer
- **Replit**: Development environment with hot reload support

## Deployment Strategy

The application is configured for deployment with the following approach:

1. **Build Process**: 
   - Frontend built with Vite to static assets
   - Backend bundled with ESBuild for Node.js runtime
   - TypeScript compilation with strict type checking

2. **Environment Configuration**:
   - Database connection via `DATABASE_URL` environment variable
   - Development/production mode switching
   - Replit-specific development features

3. **Database Migration**:
   - Drizzle Kit for database schema management
   - Migration files generated in `./migrations` directory
   - Schema defined in `./shared/schema.ts`

4. **Production Serving**:
   - Express server serves both API routes and static frontend assets
   - Single Node.js process for simplified deployment

## Changelog

```
Changelog:
- June 28, 2025. Initial setup
- June 28, 2025. Created static version for Vercel deployment:
  - Removed backend dependencies (Express, TanStack Query, database)
  - Implemented local storage for form data persistence
  - Created complete deployment package with Vercel configuration
  - Maintained all form functionality and validation
- June 28, 2025. Cleaned up project structure:
  - Removed server folder and all backend files
  - Consolidated to single vite.config.ts for static builds
  - Created final deployment package (insurance-form-final.tar.gz)
  - Simplified dependencies to frontend-only packages
```

## User Preferences

Preferred communication style: Simple, everyday language.