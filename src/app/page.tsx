'use client';

import { GameProvider } from '@/features/game/GameProvider';
import { GameContainer } from '@/features/game/components/GameContainer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <GameProvider>
          <GameContainer />
        </GameProvider>
      </div>
    </div>
  );
}
