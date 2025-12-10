# Weight Loss Tracker

A full-featured weight loss tracking application with social features, built with TypeScript, Express, and PostgreSQL.

## Features

- **Weight Tracking** - Log weight entries with body composition metrics
- **Progress Photos** - Upload and track visual progress
- **Social Features** - Teams, posts, comments, and likes
- **Challenges** - Team and global weight loss challenges
- **Achievements** - Milestone tracking and badges
- **Charts & Analytics** - Visual progress tracking with Chart.js
- **Dark Mode** - Built-in theme support
- **Authentication** - JWT-based auth with refresh tokens
- **File Uploads** - Profile avatars and progress photos
- **Responsive Design** - TailwindCSS 4 with mobile support

## Project Structure

```
src/
├── controllers/       # Request handlers (business logic)
│   ├── HomeController.ts
│   ├── UserController.ts
│   └── ProductController.ts
├── models/           # Data models and database operations
│   ├── User.ts
│   └── Product.ts
├── routes/           # Route definitions
│   ├── index.ts
│   ├── homeRoutes.ts
│   ├── userRoutes.ts
│   ├── productRoutes.ts
│   └── apiRoutes.ts
├── views/            # EJS templates
│   ├── layout.ejs
│   ├── home/
│   ├── users/
│   ├── products/
│   └── errors/
├── middleware/       # Custom middleware
│   ├── logger.ts
│   └── errorHandler.ts
└── server.ts         # Application entry point
```

## Quick Start

See [QUICKSTART.md](./QUICKSTART.md) for detailed setup instructions.

### Prerequisites

- Node.js 20.x or higher
- Docker (for PostgreSQL in development)
- Git

### Installation

```bash
# 1. Clone repository
git clone https://github.com/yourusername/wlt.git
cd wlt

# 2. Install dependencies
npm install

# 3. Copy environment file
cp .env.example .env

# 4. Start PostgreSQL (Docker)
npm run db:start

# 5. Run database migrations
npm run db:migrate

# 6. Seed database (optional)
npm run db:seed

# 7. Start development server
npm run dev
```

Visit **http://localhost:3000** in your browser!

### Test Login (After Seeding)

- Email: john@example.com
- Password: Password123

## Tech Stack

- **Backend**: TypeScript, Express.js, EJS templates
- **Database**: PostgreSQL 16, Prisma ORM 7
- **Frontend**: TailwindCSS 4, Alpine.js, Chart.js
- **Authentication**: JWT tokens with refresh tokens
- **File Uploads**: Multer
- **Testing**: Jest, Supertest
- **Process Management**: PM2 (production)
- **CI/CD**: GitHub Actions

## Deployment

### For Production Deployment

**Complete step-by-step guide**: [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)

**Quick deployment checklist**: [docs/DEPLOYMENT_CHECKLIST.md](./docs/DEPLOYMENT_CHECKLIST.md)

### Deployment Overview

1. **Database**: PostgreSQL at 192.168.149.42 (see deployment docs)
2. **Application**: Node.js 20.x with PM2 process manager
3. **Web Server**: Nginx with SSL
4. **CI/CD**: GitHub Actions for automatic deployment

### Quick Deployment Steps

```bash
# On production server
npm ci --only=production
npx prisma generate
npx prisma migrate deploy
npm run css:build
npx tsc
pm2 start ecosystem.config.js
```

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for complete instructions including:
- Server setup
- Database configuration
- SSL certificates
- GitHub Actions setup
- Troubleshooting

## Development Commands

### Database
```bash
npm run db:start       # Start PostgreSQL container
npm run db:stop        # Stop PostgreSQL container
npm run db:migrate     # Create and run migration
npm run db:push        # Push schema changes (dev only)
npm run db:studio      # Open Prisma Studio (GUI)
npm run db:seed        # Seed with test data
```

### Application
```bash
npm run dev            # Start with hot reload + CSS watch
npm run dev:server     # Start server only (no CSS watch)
npm run css:watch      # Watch Tailwind CSS changes
npm run css:build      # Build CSS once
```

### Testing
```bash
npm test               # Run all tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Generate coverage report
```

### Code Quality
```bash
npm run lint           # Run ESLint
npm run format         # Format with Prettier
```

### Build
```bash
npm run build          # Build for production
npm start              # Run production build
```

## Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Quick setup guide
- **[CLAUDE.md](./CLAUDE.md)** - Development patterns and architecture
- **[TESTING.md](./TESTING.md)** - Testing guide
- **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Production deployment guide
- **[DEPLOYMENT_CHECKLIST.md](./docs/DEPLOYMENT_CHECKLIST.md)** - Deployment checklist
- **[DATA_PERSISTENCE.md](./docs/DATA_PERSISTENCE.md)** - Data storage configuration
- **[SERVER_CONFIG.md](./docs/SERVER_CONFIG.md)** - Server-specific configuration

## Project Structure

```
src/
├── controllers/       # Request handlers
├── routes/            # Route definitions
├── views/             # EJS templates
├── middleware/        # Custom middleware
├── services/          # Business logic
├── config/            # Configuration
└── server.ts          # Application entry

prisma/
├── schema.prisma      # Database schema
├── migrations/        # Database migrations
└── seed.ts            # Seed data

tests/
├── unit/              # Unit tests
├── integration/       # Integration tests
└── helpers/           # Test utilities

public/
├── dist/              # Built CSS
└── uploads/           # User uploads
    ├── avatars/
    └── progress/
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Run linter: `npm run lint`
6. Submit a pull request

## License

ISC

## Support

For issues or questions:
- Check documentation in `/docs`
- Review [CLAUDE.md](./CLAUDE.md) for development patterns
- Check [TESTING.md](./TESTING.md) for testing guidance
- See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for deployment help

---

**Built with ❤️ using TypeScript, Express, and PostgreSQL**
