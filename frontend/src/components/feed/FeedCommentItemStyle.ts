import styled, { css } from 'styled-components';

export const StyledLi = styled.li`
  display: flex;

  span {
    font-weight: bold;
    outline: none;
    align-self: end;

    &:hover {
      color: rgb(142, 142, 142);
    }
  }

  p {
    line-height: 15px;
    margin: 0 0 0 5px;
  }

  & + & {
    margin-top: 5px;
  }

  [class^='like-'] {
    flex-grow: 2;
    text-align: right;
    margin-right: 5px;

    span {
      ${props =>
        props.like &&
        css`
          color: rgb(250, 82, 82);
          &:hover {
            color: rgb(255, 107, 107);
          }
        `};
    }
  }
`;
