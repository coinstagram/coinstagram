import React from 'react';

// styles
import { StyledButton } from './PrevBtnStyle';

interface PrevBtnProps {
  onClick?: () => void;
}

function PrevBtn({ onClick }: PrevBtnProps) {
  return (
    <StyledButton onClick={onClick} aria-label="이전 보기" className="prev-btn">
      <span tabIndex={-1}></span>
    </StyledButton>
  );
}

export default PrevBtn;
