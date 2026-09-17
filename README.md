# CDA Theater Alliance

A Next.js web portal for the CDA Theater Alliance - a consortium of arts organizations (theater groups) in North Idaho.

## Tech Stack

- **Next.js 14+** with App Router
- **TypeScript** with strict mode
- **Tailwind CSS** for styling
- **ESLint + Prettier** for code quality
- **Framer Motion** for animations
- **date-fns** for date formatting
- **Lucide React** for icons

## Project Structure

```
src/
├── app/                    # App Router pages
│   ├── page.tsx           # Animated splashpage
│   ├── home/              # Landing page
│   ├── events/            # Events list/calendar
│   ├── organizations/     # Arts org directory
│   ├── rentals/          # Rentals placeholder
│   ├── spaces/           # Theater spaces directory
│   └── directory/        # Member directory
├── components/
│   ├── ui/               # Reusable UI components
│   └── features/         # Feature-specific components
└── lib/
    ├── types.ts          # TypeScript interfaces
    ├── db.ts             # Database abstraction layer
    └── data/             # JSON mock data
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local
```

### Development

```bash
# Run development server
npm run dev

# Open http://localhost:3000
```

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Check types
npx tsc --noEmit
```

## Data Layer

The app currently uses mock JSON data in `/src/lib/data/`. The data access layer in `/src/lib/db.ts` provides async functions that can be easily swapped for Prisma + PostgreSQL queries when a database is added.

To add a database:
1. Install Prisma: `npm install prisma @prisma/client`
2. Initialize: `npx prisma init`
3. Replace functions in `db.ts` with Prisma queries

## Deployment

### Vercel (Recommended)

1. Push your code to a Git repository
2. Import the project in Vercel
3. Add any required environment variables
4. Deploy

```bash
# Deploy via CLI
npm i -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Features

- Animated splashpage with auto-redirect
- Landing page with organization showcase
- Events with list and calendar views
- Filter by organization
- Organizations directory with links
- Rentals placeholder (skeleton layout)
- Theater/rehearsal spaces directory
- Member directory

## License

MIT