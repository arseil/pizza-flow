# ReactFlow Card Components

A modern React application featuring an interactive node-based interface using ReactFlow, with custom node types built using shadcn UI components and styled with TailwindCSS.

## Features

- Interactive node-based interface using ReactFlow
- Custom node types:
  - Carousel Card: Displays images in a carousel format
  - Rich Card: Displays actions and buttons
- Modern UI components from shadcn
- Responsive design with TailwindCSS
- TypeScript for type safety
- Automatic connection between nodes
- Autosave functionality using localStorage
- ESLint for code quality
- Vite for fast development and building

## Tech Stack

- React 19
- TypeScript
- Vite
- ReactFlow
- TailwindCSS
- shadcn UI components
- ESLint

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
  ├── api/          # API related code
  ├── assets/       # Static assets
  ├── components/   # React components
  │   └── nodes/    # Custom node components
  ├── config/       # Configuration files
  ├── data/         # Data files
  ├── handlers/     # Event handlers and business logic
  ├── hooks/        # Custom React hooks
  ├── lib/          # Utility libraries
  ├── types/        # TypeScript type definitions
  └── utils/        # Utility functions
```

## Development

- The project uses ESLint for code linting
- TypeScript for type checking
- TailwindCSS for styling
- Vite for development and building

## Configuration

- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - TailwindCSS configuration
- `tsconfig.json` - TypeScript configuration
- `tsconfig.node.json` - TypeScript configuration for Node.js
- `eslint.config.js` - ESLint configuration
- `components.json` - shadcn UI configuration
- `postcss.config.js` - PostCSS configuration

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Implementation Details

- Uses ReactFlow for node-based interface
- Custom node components:
  - CarouselCard: Displays images in a carousel format
  - RichCard: Displays actions and buttons
- Data is stored in `src/data/cards.json`
- Autosave functionality saves flow state to localStorage
- Event handlers are organized in `src/handlers` directory
- Utility functions are separated into `src/utils` directory
