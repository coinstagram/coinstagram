import React from 'react';
import styled, { css } from 'styled-components';
import facebook from '../../resource/image/facebook.png';
import useWindowWidth from '../../hooks/useWindowWidth';

export interface ContentProps {
  content?: string;
  className?: string;
  disabled?: boolean;
}
export const StyledButton = styled.button`
  display: block;
  background: #0095f6;
  color: white;
  font-weight: bold;
  text-align: center;
  border-radius: 3px;
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
  cursor: pointer;
  img {
    width: 17px;
    margin-right: 10px;
    vertical-align: sub;
  }
  ${props =>
    props.width < 750
      ? css`
          height: 40px;
          font-size: 1.2rem;
          max-width: 400px;
        `
      : css`
          height: 30px;
        `}
`;
export default function FacebookLogin() {
  const width = useWindowWidth();
  return (
    <StyledButton width={width}>
      <img src={facebook} alt="facebook" />
      Facebook으로 로그인
    </StyledButton>
  );
}
