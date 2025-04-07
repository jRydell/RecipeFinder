├── src\
│ ├── server.ts # Main server file
│ │
│ ├── db.ts # Database connection
│ │
│ ├── config.ts # Configuration and environment variables
│ │
│ ├── types\ # TypeScript interfaces/types
│ │ ├── user.types.ts # User-related types
│ │ ├── recipe.types.ts # Recipe-related types
│ │ ├── rating.types.ts # Rating-related types
│ │ └── comment.types.ts # Comment-related types
│ │
│ ├── middleware\
│ │ └── auth.ts # Authentication middleware
│ │
│ ├── controllers\
│ │ ├── authController.ts # User registration and login
│ │ ├── savedRecipeController.ts # Saved recipes management
│ │ ├── ratingController.ts # Recipe ratings
│ │ └── commentController.ts # Recipe comments
│ │
│ ├── routes\
│ │ ├── auth.routes.ts # Auth routes
│ │ ├── savedRecipe.routes.ts # Saved recipe routes
│ │ ├── rating.routes.ts # Rating routes
│ │ └── comment.routes.ts # Comment routes
│ │
│ └── queries\ # Database queries
│ ├── user.queries.ts # User-related queries
│ ├── savedRecipe.queries.ts # Saved recipe queries
│ ├── rating.queries.ts # Rating queries
│ └── comment.queries.ts # Comment queries
│
├── sql\ # SQL files
│ └── schema.sql # Database schema
│
├── node_modules\ # Dependencies (auto-generated)
│
├── .env # Environment variables
├── package.json # Project metadata and dependencies
├── package-lock.json # Dependency lock file
└── tsconfig.json # TypeScript configuration
