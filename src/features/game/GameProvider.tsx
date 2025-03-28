'use client';

import { ReactNode, createContext, useContext } from 'react';
import { useGame as useGameHook } from './hooks/use-game';

// 게임 컨텍스트 타입 정의
type GameContextType = {
  board: number[][];
  score: number;
  bestScore: number;
  isGameOver: boolean;
  initGame: () => void;
  move: (direction: 'up' | 'down' | 'left' | 'right') => boolean;
  handleKeyDown: (e: React.KeyboardEvent) => void;
};

// 컨텍스트 생성
const GameContext = createContext<GameContextType | null>(null);

// Provider 컴포넌트
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const gameState = useGameHook();

  return (
    <GameContext.Provider value={gameState}>
      {children}
    </GameContext.Provider>
  );
};

// 게임 상태를 사용하기 위한 커스텀 훅
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}; 