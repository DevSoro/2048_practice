'use client';

import { useGame } from '../GameProvider';
import { Card, CardContent } from '@/components/ui/card';

export const ScoreBoard = () => {
  const { score, bestScore } = useGame();

  return (
    <div className="flex items-center gap-4 mb-4">
      <Card className="w-32">
        <CardContent className="p-4 flex flex-col items-center">
          <p className="text-sm text-muted-foreground">현재 점수</p>
          <p className="text-2xl font-bold">{score}</p>
        </CardContent>
      </Card>
      
      <Card className="w-32">
        <CardContent className="p-4 flex flex-col items-center">
          <p className="text-sm text-muted-foreground">최고 점수</p>
          <p className="text-2xl font-bold">{bestScore}</p>
        </CardContent>
      </Card>
    </div>
  );
}; 