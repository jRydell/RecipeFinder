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
│ │ ├── errorHandler.ts # Global error handling middleware
│ │ └── logging.ts # Request logging middleware
│ │
│ ├── services\ # Business logic layer
│ │ ├── authService.ts # Authentication business logic
│ │ ├── reviewService.ts # Review operations (ratings and comments)
│ │ └── savedRecipeService.ts # Saved recipe opre logic
│ │
│ ├── controllers\
│ │ ├── authController.ts # User registration and login
│ │ ├── reviewController.ts # Review management (ratings and comments)
│ │ └── savedRecipeController.ts # Saved recipes management
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
│ │ └── savedRecipe.queries.ts # Saved recipe database queries
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
