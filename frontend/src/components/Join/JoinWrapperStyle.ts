import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  width: ${props => (props.width > 750 ? '350px' : '100%')};
  ${props =>
    props.width > 750 &&
    css`
      margin: 10vh auto 0;
      margin-top: 100px;
    `}
`;
export const StyledJoinWrapper = styled.div`
  width: 100%;
  height: 542px;
  background: #ffffff;
  border: 1px solid #dbdbdb;
  margin: 30px 0 10px 0;
  padding: 0 40px;
  box-sizing: border-box;

  ${props =>
    props.width <= 750 &&
    css`
      border: none;
      margin: 0;
      height: 100%;
    `}
`;

export const StyledForm = styled.form`
  position: relative;
  padding-bottom: 10px;
  ${props =>
    props.width <= 750 &&
    css`
      max-width: 400;
      margin: auto;
      margin-top: 50px;
    `}
`;
