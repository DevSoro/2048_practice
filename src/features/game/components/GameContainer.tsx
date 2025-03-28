'use client';

import { ScoreBoard } from './ScoreBoard';
import { ControlPanel } from './ControlPanel';
import { GameBoard } from './GameBoard';

export const GameContainer = () => {
  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">2048</h1>
      
      <div className="w-full max-w-md">
        <ScoreBoard />
        <ControlPanel />
        <GameBoard />
      </div>
    </div>
  );
}; 