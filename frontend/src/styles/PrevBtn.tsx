import React from 'react';
import styled from 'styled-components';
import spriteImg from '../resource/image/spriteImages.png';

const StyledButton = styled.button`
  position: absolute;
  top: 39px;
  left: 1px;
  width: 32px;
  height: 32px;
  z-index: 1;

  span {
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-image: url(${spriteImg});
    background-position: 270px 215px;
    outline: none;
  }

  transition: transform 0.2s;
  &:active {
    transform: scale(0.85);
  }
`;

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
