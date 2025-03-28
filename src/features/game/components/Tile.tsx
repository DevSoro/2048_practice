'use client';

import { cva } from 'class-variance-authority';
import { motion } from 'framer-motion';

type TileProps = {
  value: number;
};

type TileValue = 0 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 'default';
type FontSize = 1 | 2 | 3 | 4 | 'default';

// 타일 색상 스타일 정의
const tileVariants = cva('flex items-center justify-center font-bold rounded-md select-none w-full h-full', {
  variants: {
    value: {
      0: 'bg-gray-200',
      2: 'bg-gray-100 text-gray-800',
      4: 'bg-yellow-100 text-gray-800',
      8: 'bg-orange-200 text-white',
      16: 'bg-orange-300 text-white',
      32: 'bg-orange-400 text-white',
      64: 'bg-orange-500 text-white',
      128: 'bg-yellow-300 text-white',
      256: 'bg-yellow-400 text-white',
      512: 'bg-yellow-500 text-white',
      1024: 'bg-yellow-600 text-white',
      2048: 'bg-yellow-700 text-white',
      default: 'bg-gray-700 text-white',
    },
    fontSize: {
      // 자릿수에 따라 글자 크기 조절
      1: 'text-4xl',
      2: 'text-3xl',
      3: 'text-2xl',
      4: 'text-xl',
      default: 'text-lg',
    },
  },
  defaultVariants: {
    value: 0,
    fontSize: 'default',
  },
});

// 글자 크기를 자릿수에 따라 결정하는 함수
const getFontSizeVariant = (value: number): FontSize => {
  if (value === 0) return 'default';
  const digits = Math.floor(Math.log10(value)) + 1;
  return digits <= 4 ? (digits as 1 | 2 | 3 | 4) : 'default';
};

// 타일 값에 맞는 스타일 variant를 반환하는 함수
const getValueVariant = (value: number): TileValue => {
  if ([0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048].includes(value)) {
    return value as TileValue;
  }
  return 'default';
};

export const Tile = ({ value }: TileProps) => {
  // 값이 0인 타일은 빈 타일로 표시
  if (value === 0) {
    return <div className={tileVariants({ value: 0 })} />;
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2 }}
      className={tileVariants({
        value: getValueVariant(value),
        fontSize: getFontSizeVariant(value),
      })}
    >
      {value}
    </motion.div>
  );
}; 