import React from 'react';
import styled from 'styled-components';
import spriteImg from '../resource/image/spriteImages.png';

const StyledButton = styled.button`
  position: absolute;
  top: 39px;
  left: 1px;
  width: 32px;
  height: 32px;

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
  prev: () => void;
}

function PrevBtn({ prev }: PrevBtnProps) {
  return (
    <StyledButton onClick={prev}>
      <span tabIndex={-1}></span>
    </StyledButton>
  );
}

export default PrevBtn;
