import styled, { css } from 'styled-components';

export interface ContentProps {
  content?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
}
export const StyledButton = styled.button`
  display: block;
  background: #b2dffc;
  color: white;
  font-weight: bold;
  text-align: center;
  width: 100%;
  height: 30px;
  border-radius: 3px;
  margin-bottom: 10px;
  cursor: default;
  position: relative;
  &.active {
    background: #0095f6;
    cursor: pointer;
  }
  ${props =>
    props.width < 750 &&
    css`
      height: 40px;
      font-size: 1.2rem;
      max-width: 400px;
    `}
`;
