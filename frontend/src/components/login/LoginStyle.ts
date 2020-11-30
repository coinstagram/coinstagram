import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  margin: ${props => (props.width > 750 ? '10vh auto' : '0 auto')};
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => props.width < 750 && '100%'};
`;
export const LoginWrapper = styled.div`
  width: ${props => (props.width > 750 ? '350px' : '100%')};
  height: ${props => (props.width > 750 ? '606px' : '100%')};
`;
export const StyledLogin = styled.div`
  box-sizing: border-box;

  ${props =>
    props.width > 750
      ? css`
          background: #ffffff;
          height: 400px;
          border: 1px solid #dbdbdb;
          margin: 0 0 10px 0;
          padding: 0 40px;
        `
      : css`
          background: white;
          height: 100%;
          border: none;
          margin: 0;
          padding: 10vh 10vw;
        `}
`;

export const StyledForm = styled.form`
  position: relative;
  margin-bottom: 0;
  margin-top: 20px;
  padding-bottom: 10px;
  ${props =>
    props.width <= 750 &&
    css`
      margin: auto;
      max-width: 400px;
    `}
`;
