├── src\
│ ├── server.ts # Main server file
│ │
│ ├── db.ts # Database connection
│ │
│ ├── types\ # TypeScript interfaces/types
│ │ ├── user.types.ts # User-related types
│ │ ├── recipe.types.ts # Recipe-related types
│ │ └── review.types.ts # Review-related types (includes ratings and comments)
│ │
│ ├── middleware\
│ │ ├── auth.ts # Authentication middleware
│ │ ├── error.handler.ts # Global error handling middleware
│ │ └── logging.ts # Request logging middleware
│ │
│ ├── services\ # Business logic layer
│ │ ├── auth.service.ts # Authentication business logic
│ │ ├── review.service.ts # Review operations (ratings and comments)
│ │ └── saved-recipe.service.ts # Saved recipe operations
│ │
│ ├── controllers\
│ │ ├── auth.controller.ts # User registration and login
│ │ ├── review.controller.ts # Review management (ratings and comments)
│ │ └── saved-recipe.controller.ts # Saved recipes management
│ │
│ ├── routes\
│ │ ├── auth.routes.ts # Auth routes
│ │ ├── review.routes.ts # Review routes (ratings and comments)
│ │ ├── savedRecipe.routes.ts # Saved recipe routes
│ │ └── health.routes.ts # Health check routes
│ │
│ ├── queries\ # Database operations layer
│ │ ├── user.queries.ts # User-related database queries
│ │ ├── review.queries.ts # Review-related database queries
│ │ └── saved-recipe.queries.ts # Saved recipe database queries
│ │
│ └── validation\ # Input validation schemas
│
├── sql\ # SQL files
│ └── schema.sql # Database schema
│
├── node_modules\ # Dependencies
│
├── .env # Environment variables
├── package.json # Project metadata and dependencies
├── package-lock.json # Dependency lock file
└── tsconfig.json # TypeScript configuration

---

### Naming Conventions & DTOs

- **API & DTOs:** Use camelCase (e.g., `mealId`, `userId`) for all API endpoints, request/response DTOs, and route parameters.
- **Database & SQL:** Use snake_case (e.g., `meal_id`, `user_id`) for all database fields and SQL queries.
- **Backend Types:** Types representing DB rows use snake_case; DTOs for API use camelCase.
- **Frontend:** Expects and uses snake_case for review and saved recipe objects, matching backend responses directly.

> **Note:** DTOs are used for API requests and responses to ensure consistent property naming and data transfer between frontend and backend.

TODO: FIX DTO/TYPES AND THEY ARE EVERYWHERE
TODO: REFACTOR REVIEWS, FRONTEND VALIDATION, MOBILE MENU STYLING, HEADER POSITIONING.
TODO: CHECK STRUCTURE IN useREVIEWS
TODO: BACKEND VALIDATION, ZOD?
