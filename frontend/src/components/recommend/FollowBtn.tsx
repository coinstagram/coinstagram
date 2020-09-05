import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  position: absolute;
  right: 10px;
  top: ${({ size }: FollowBtnProps) => `${size / 5}`};

  color: rgb(0, 149, 246);
  font-weight: bold;
  font-size: 12px;

  & > span {
    outline: none;
  }

  & > span:active {
    filter: brightness(1.2);
  }
`;

interface FollowBtnProps {
  size: number;
}

function FollowBtn({ size }: FollowBtnProps) {
  return (
    <StyledButton size={size}>
      <span tabIndex={-1}>팔로우</span>
    </StyledButton>
  );
}

export default FollowBtn;
