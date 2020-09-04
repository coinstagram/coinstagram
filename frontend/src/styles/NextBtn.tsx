import React from 'react';
import styled from 'styled-components';
import spriteImg from '../resource/image/spriteImages.png';

const StyledButton = styled.button`
  position: absolute;
  top: 39px;
  right: 1px;
  width: 32px;
  height: 32px;
  transition: transform 0.2s;
  z-index: 1;

  span {
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-image: url(${spriteImg});
    background-position: 220px 215px;
    outline: none;
  }

  &:active {
    transform: scale(0.8);
  }
`;

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
