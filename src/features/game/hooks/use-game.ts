'use client';

import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';

// 게임보드 타입 정의
type Board = number[][];
type Direction = 'up' | 'down' | 'left' | 'right';

export const useGame = () => {
  // 보드 상태 관리
  const [board, setBoard] = useState<Board>([]);
  // 현재 점수 관리
  const [score, setScore] = useState(0);
  // 최대 점수 관리 (로컬 스토리지 사용)
  const [bestScore, setBestScore] = useLocalStorage<number>('2048-best-score', 0);
  // 게임 오버 상태 관리
  const [isGameOver, setIsGameOver] = useState(false);

  // 게임 초기화 함수
  const initGame = () => {
    const newBoard = Array(4).fill(0).map(() => Array(4).fill(0));
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    setBoard(newBoard);
    setScore(0);
    setIsGameOver(false);
  };

  // 컴포넌트 마운트시 게임 초기화
  useEffect(() => {
    initGame();
  }, []);

  // 점수 업데이트 시 최대 점수 갱신
  useEffect(() => {
    if (score > (bestScore || 0)) {
      setBestScore(score);
    }
  }, [score, bestScore, setBestScore]);

  // 랜덤한 위치에 타일 추가
  const addRandomTile = (gameBoard: Board) => {
    const emptyTiles: [number, number][] = [];
    
    // 빈 타일 위치 찾기
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (gameBoard[i][j] === 0) {
          emptyTiles.push([i, j]);
        }
      }
    }
    
    // 빈 타일이 없으면 반환
    if (emptyTiles.length === 0) return;
    
    // 랜덤한 빈 타일 선택
    const [randX, randY] = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    // 90% 확률로 2, 10% 확률로 4 생성
    gameBoard[randX][randY] = Math.random() < 0.9 ? 2 : 4;
  };

  // 게임오버 체크
  const checkGameOver = (gameBoard: Board) => {
    // 빈 칸이 있는지 체크
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (gameBoard[i][j] === 0) return false;
      }
    }
    
    // 인접한 같은 숫자 타일이 있는지 체크
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        // 위쪽 확인
        if (i > 0 && gameBoard[i][j] === gameBoard[i-1][j]) return false;
        // 아래쪽 확인
        if (i < 3 && gameBoard[i][j] === gameBoard[i+1][j]) return false;
        // 왼쪽 확인
        if (j > 0 && gameBoard[i][j] === gameBoard[i][j-1]) return false;
        // 오른쪽 확인
        if (j < 3 && gameBoard[i][j] === gameBoard[i][j+1]) return false;
      }
    }
    
    // 빈 칸도 없고 합칠 수 있는 타일도 없으면 게임 오버
    return true;
  };

  // 배열을 이동하고 합치는 함수 (한 행 또는 열)
  const moveAndMerge = (line: number[]): [number[], number] => {
    // 0이 아닌 값들만 필터링
    let filteredLine = line.filter(cell => cell !== 0);
    let scoreGain = 0;
    
    // 인접한 같은 숫자 합치기
    for (let i = 0; i < filteredLine.length - 1; i++) {
      if (filteredLine[i] === filteredLine[i + 1]) {
        filteredLine[i] *= 2;
        scoreGain += filteredLine[i];
        filteredLine[i + 1] = 0;
        i++; // 합쳐진 다음 숫자는 스킵
      }
    }
    
    // 다시 0이 아닌 값들만 필터링 + 나머지는 0으로 채우기
    filteredLine = filteredLine.filter(cell => cell !== 0);
    while (filteredLine.length < 4) {
      filteredLine.push(0);
    }
    
    return [filteredLine, scoreGain];
  };

  // 게임 보드를 이동시키는 함수
  const move = (direction: Direction): boolean => {
    if (isGameOver) return false;
    
    const newBoard = JSON.parse(JSON.stringify(board)) as Board;
    let boardChanged = false;
    let scoreGain = 0;
    
    switch (direction) {
      case 'up':
        // 각 열에 대해 위로 이동
        for (let col = 0; col < 4; col++) {
          const currentCol = [
            newBoard[0][col],
            newBoard[1][col],
            newBoard[2][col],
            newBoard[3][col]
          ];
          
          const [mergedCol, gain] = moveAndMerge(currentCol);
          scoreGain += gain;
          
          // 변경사항 적용
          for (let row = 0; row < 4; row++) {
            if (newBoard[row][col] !== mergedCol[row]) {
              boardChanged = true;
              newBoard[row][col] = mergedCol[row];
            }
          }
        }
        break;
        
      case 'down':
        // 각 열에 대해 아래로 이동
        for (let col = 0; col < 4; col++) {
          const currentCol = [
            newBoard[3][col],
            newBoard[2][col],
            newBoard[1][col],
            newBoard[0][col]
          ];
          
          const [mergedCol, gain] = moveAndMerge(currentCol);
          scoreGain += gain;
          
          // 변경사항 적용
          for (let row = 0; row < 4; row++) {
            if (newBoard[3-row][col] !== mergedCol[row]) {
              boardChanged = true;
              newBoard[3-row][col] = mergedCol[row];
            }
          }
        }
        break;
        
      case 'left':
        // 각 행에 대해 왼쪽으로 이동
        for (let row = 0; row < 4; row++) {
          const [mergedRow, gain] = moveAndMerge([...newBoard[row]]);
          scoreGain += gain;
          
          // 변경사항 적용
          for (let col = 0; col < 4; col++) {
            if (newBoard[row][col] !== mergedRow[col]) {
              boardChanged = true;
              newBoard[row][col] = mergedRow[col];
            }
          }
        }
        break;
        
      case 'right':
        // 각 행에 대해 오른쪽으로 이동
        for (let row = 0; row < 4; row++) {
          const currentRow = [...newBoard[row]].reverse();
          const [mergedRow, gain] = moveAndMerge(currentRow);
          scoreGain += gain;
          
          // 변경사항 적용
          for (let col = 0; col < 4; col++) {
            if (newBoard[row][3-col] !== mergedRow[col]) {
              boardChanged = true;
              newBoard[row][3-col] = mergedRow[col];
            }
          }
        }
        break;
    }
    
    if (boardChanged) {
      // 점수 갱신
      setScore(prevScore => prevScore + scoreGain);
      
      // 새 타일 추가
      addRandomTile(newBoard);
      
      // 보드 업데이트
      setBoard(newBoard);
      
      // 게임 오버 체크
      const gameOver = checkGameOver(newBoard);
      if (gameOver) {
        setIsGameOver(true);
      }
      
      return true;
    }
    
    return false;
  };

  // 키보드 이벤트 핸들러
  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();
    
    switch (e.key) {
      case 'ArrowUp':
        move('up');
        break;
      case 'ArrowDown':
        move('down');
        break;
      case 'ArrowLeft':
        move('left');
        break;
      case 'ArrowRight':
        move('right');
        break;
    }
  };

  return {
    board,
    score,
    bestScore,
    isGameOver,
    initGame,
    move,
    handleKeyDown
  };
}; 