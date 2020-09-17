import styled, { css } from 'styled-components';

interface StyledNavProps {
  width: number;
}

export const StyledNav = styled.nav`
  ul {
    display: flex;
    align-items: center;
  }
  li + li {
    margin-left: 22px;
  }
  li {
    height: 25px;
  }
  svg {
    font-size: 23px;
    width: 25px;
    height: 25px;
    outline: none;
    vertical-align: bottom;

    &:active {
      color: rgb(120, 120, 120);
    }
  }
`;

export const StyledButton = styled.button`
  ${props =>
    props.clicked &&
    css`
      & > span {
        position: relative;
        border: 1px solid rgb(255, 255, 255);
      }
      & > span::after {
        content: '';
        position: absolute;
        top: ${-2}px;
        bottom: ${-2}px;
        left: ${-2}px;
        right: ${-2}px;
        z-index: -1;
        border-radius: 50%;
        background: rgb(0, 0, 0);
      }
    `}
`;
