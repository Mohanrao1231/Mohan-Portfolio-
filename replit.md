# Portfolio Application

## Overview

This is a full-stack portfolio web application built for Chokkaku Mohan Rao, showcasing his skills, experience, and certifications in AI/ML and Cloud Computing. The application features a modern React frontend with a Node.js/Express backend, designed for both development and production deployment.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: TanStack Query for server state management
- **Routing**: React Router for client-side navigation
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: Hot reload with Vite middleware integration

### Build System
- **Development**: Vite dev server with Express middleware
- **Production**: ESBuild for server bundling, Vite for client bundling
- **TypeScript**: Strict mode with path mapping for clean imports

## Key Components

### Frontend Components
- **Header**: Fixed navigation with smooth scrolling and active section tracking
- **Hero**: Animated introduction with floating tech icons
- **About**: Personal information and education details
- **Skills**: Interactive skill cards with technology icons
- **Experience**: Timeline-based experience and certifications display
- **Contact**: Contact form with validation and toast notifications
- **Footer**: Simple footer with scroll-to-top functionality

### Backend Services
- **Storage Interface**: Abstracted storage layer with in-memory implementation
- **Route Registration**: Modular route setup for API endpoints
- **Error Handling**: Centralized error handling middleware
- **Logging**: Request/response logging for API calls

### UI System
- **Design Tokens**: CSS custom properties for consistent theming
- **Component Library**: Complete set of reusable UI components
- **Accessibility**: ARIA compliant components with keyboard navigation
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

## Data Flow

### Client-Server Communication
1. React components use TanStack Query for API calls
2. Express server handles requests with middleware chain
3. Storage layer abstracts data operations
4. Response data flows back through React Query cache

### State Management
- **Server State**: Managed by TanStack Query with caching
- **Client State**: Local component state with React hooks
- **Form State**: React Hook Form with validation
- **UI State**: Context providers for toasts and tooltips

### Database Operations
- **Schema**: Defined in shared TypeScript files using Drizzle
- **Migrations**: Managed through Drizzle Kit
- **Queries**: Type-safe queries with Drizzle ORM
- **Connections**: Serverless connections via Neon Database

## External Dependencies

### Core Technologies
- **React**: Frontend framework with hooks and context
- **Express**: Backend web framework
- **Drizzle**: Type-safe database ORM
- **Vite**: Build tool and development server
- **Tailwind**: Utility-first CSS framework

### UI Libraries
- **Radix UI**: Headless component primitives
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel functionality
- **React Hook Form**: Form management
- **Zod**: Schema validation

### Development Tools
- **TypeScript**: Static type checking
- **ESLint**: Code linting (implied)
- **PostCSS**: CSS processing with Tailwind

## Deployment Strategy

### Build Process
1. **Client Build**: Vite builds React app to `dist/public`
2. **Server Build**: ESBuild bundles Express server to `dist/index.js`
3. **Static Assets**: Client build includes all static assets
4. **Environment**: Production mode uses built assets

### Environment Configuration
- **Database**: PostgreSQL connection via DATABASE_URL
- **Sessions**: PostgreSQL-backed session storage
- **Static Files**: Served from build directory in production
- **Error Handling**: Production-safe error responses

### Development vs Production
- **Development**: Vite dev server with hot reload
- **Production**: Express serves static files and API routes
- **Database**: Same PostgreSQL setup for both environments
- **Logging**: Enhanced logging in development mode

## Changelog

Changelog:
- June 28, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.