import styled, { css } from 'styled-components';

export const StyledNav = styled.nav`
  ul {
    display: flex;
    align-items: center;
  }

  ${props =>
    props.width < 655
      ? css`
          li + li {
            margin-left: 17px;
          }
        `
      : css`
          li + li {
            margin-left: 22px;
          }
        `}
  li {
    height: 27px;
  }

  svg {
    font-size: 27px;
    width: 27px;
    height: 27px;
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
        border: 1px solid rgb(50, 50, 50);
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
        background: rgb(255, 255, 255);
      }
    `}
`;
