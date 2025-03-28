'use client';

import { useEffect } from 'react';
import { Tile } from './Tile';
import { useGame } from '../GameProvider';

export const GameBoard = () => {
  const { board, handleKeyDown } = useGame();

  // 키보드 이벤트 리스너 등록
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault(); // 브라우저 스크롤 방지
        handleKeyDown(e as unknown as React.KeyboardEvent);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyDown]);

  return (
    <div className="grid grid-cols-4 gap-2 bg-gray-300 p-4 rounded-md w-full max-w-md shadow-lg">
      {board.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`} className="aspect-square">
            <Tile value={value} />
          </div>
        ))
      )}
    </div>
  );
}; 