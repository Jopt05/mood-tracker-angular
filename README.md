# Mood Tracker Angular

A full-featured mood tracking application built with Angular 19 to practice modern Angular concepts and patterns.

## Features

- **Mood Tracking**: Log daily moods with timestamps and notes
- **Visual Calendar**: Interactive calendar view showing mood history
- **Analytics Dashboard**: Charts and visualizations powered by ApexCharts
- **User Authentication**: Complete auth flow with login, registration, and password reset
- **User Profiles**: Manage user information and preferences
- **Advice System**: Get personalized advice based on mood patterns
- **Theme Support**: Light/dark theme switching
- **Responsive Design**: Built with Tailwind CSS for mobile-first experience
- **Real-time Notifications**: Toast notifications for user feedback

## Tech Stack

- **Framework**: Angular 19.2
- **Styling**: Tailwind CSS 4.1
- **Charts**: ApexCharts with ng-apexcharts
- **State Management**: RxJS
- **HTTP Client**: Angular HttpClient with interceptors
- **Routing**: Angular Router with guards

## Project Structure

```
src/app/
├── auth/              # Authentication module
│   ├── guards/        # Route guards
│   ├── pages/         # Login, profile, password reset
│   └── services/      # Auth service, interceptors, validators
├── mood/              # Mood tracking module
│   ├── components/    # Calendar, charts, modals
│   ├── pages/         # Home page
│   └── services/      # Mood and advice services
└── shared/            # Shared components and utilities
    ├── components/    # Header, footer, loaders, notifications
    ├── pipes/         # Custom pipes for mood display
    └── services/      # Theme, loading, notifications
```

## Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up the backend environment**
   - Configure your backend API endpoint in `src/environment/`
   - Ensure the backend server is running

3. **Start the development server**
   ```bash
   npm start
   ```
   The app will automatically open in your browser at `http://localhost:4200`

## Available Scripts

- `npm start` - Start development server with auto-open
- `npm run build` - Build for production
- `npm run watch` - Build in watch mode
- `npm test` - Run unit tests with Karma

## Key Concepts Practiced

- **Modular Architecture**: Feature modules (auth, mood) with lazy loading
- **Reactive Forms**: Form validation and custom validators
- **HTTP Interceptors**: Token management and request/response handling
- **Route Guards**: Protected routes with authentication
- **Component Communication**: Parent-child interaction and services
- **RxJS Operators**: Observable patterns and state management
- **Custom Pipes**: Data transformation for display
- **Dependency Injection**: Service-based architecture
- **TypeScript**: Strong typing with interfaces

## Requirements

- Node.js (LTS version recommended)
- npm or yarn
- Angular CLI 19.2+
