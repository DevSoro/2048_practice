'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useGame } from '../GameProvider';

export const ControlPanel = () => {
  const { initGame, isGameOver } = useGame();

  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={initGame}
        >
          <RefreshCw className="w-4 h-4" /> 새 게임
        </Button>
      </div>
      
      {isGameOver && (
        <div className="bg-red-100 text-red-800 px-3 py-1 rounded font-medium">
          게임 오버!
        </div>
      )}
    </div>
  );
}; 