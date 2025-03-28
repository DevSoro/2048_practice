# 2048 Game Clone

A modern implementation of the classic 2048 puzzle game built with Next.js and React.

![2048 Game](https://picsum.photos/800/400)

## Features

- Classic 2048 gameplay with smooth animations
- Responsive design that works on both desktop and mobile devices
- Local storage to save best scores
- Keyboard controls (arrow keys) and touch/mouse swipe support
- Game state management with React Context API
- Clean, modern UI built with Tailwind CSS

## Technologies Used

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation
- [React Use](https://github.com/streamich/react-use) - React hooks collection
- [Shadcn UI](https://ui.shadcn.com/) - Component library
- [Lucide React](https://lucide.dev/) - Icon library

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/2048_clone.git
cd 2048_clone
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Play

- Use arrow keys (←, →, ↑, ↓) to move tiles
- When two tiles with the same number touch, they merge into one
- Create a tile with the number 2048 to win the game
- If the board fills up with no possible moves, the game is over

## Project Structure

```
src/
├── app/             # Next.js App Router
├── components/ui/   # Reusable UI components
├── features/
│   └── game/        # Game-specific feature code
│       ├── components/  # Game UI components
│       ├── hooks/       # Game logic hooks
│       └── GameProvider.tsx # Game state management
```

## Deployment

The easiest way to deploy this app is using the [Vercel Platform](https://vercel.com/new).

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Original 2048 game by [Gabriele Cirulli](https://github.com/gabrielecirulli/2048)
- Built with inspiration from various 2048 implementations
