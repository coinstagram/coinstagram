import styled, { css } from 'styled-components';

export interface ContentProps {
  askContent?: string;
  content?: string;
}
export const StyledAskLogin = styled.div`
  background: #ffffff;
  border: 1px solid #dbdbdb;
  text-align: center;
  box-sizing: border-box;
  ${props =>
    props.width < 750
      ? css`
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          margin: 0;
          padding: 1vh;
          height: 7vh;
          border: none;
          border-top: 1px solid #dbdbdb;
        `
      : css`
          margin: 0 0 10px;
          padding: 10px 0;
          height: 70px;
        `};
  p {
    margin-top: ${props => props.width <= 750 && '5px'};
    .login {
      color: #0095f6;
    }
  }
`;
