import React from 'react';

// styles
import { StyledButton } from './NextBtnStyle';

interface NextBtnProps {
  onClick?: () => void;
}

function NextBtn({ onClick }: NextBtnProps) {
  return (
    <StyledButton onClick={onClick} aria-label="다음 보기" className="next-btn">
      <span tabIndex={-1}></span>
    </StyledButton>
  );
}

export default NextBtn;
