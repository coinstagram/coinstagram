import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  font-size: 16px;
  margin-bottom: 20px;

  button {
    margin-left: 40px;

    &:active {
      color: rgb(134, 142, 150);
    }

    span {
      outline: none;
      display: inline-block;
    }
  }

  & > button > span > span,
  & > span > span {
    font-size: 16px;
    color: rgb(50, 50, 50);
  }

  ${props =>
    props.width < 750 &&
    css`
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 45px;
      align-items: center;
      margin-bottom: 0;
      font-size: 14px;
      color: rgb(142, 142, 142);

      display: flex;
      justify-content: space-around;
      border-top: 1px solid rgb(219, 219, 219);

      & button:active {
        color: rgb(173, 181, 189);
      }
    `}
`;
