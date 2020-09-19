import styled, { css } from 'styled-components';
export const Header = styled.div`
  height: 120px;
  margin-bottom: 20px;
  ${props =>
    props.width <= 750 &&
    css`
      display: flex;
      justify-content: center;
      height: 70px;
      padding-top: 40px;
      margin-bottom: 0;
    `}
`;

export const StyledH2 = styled.h2`
  color: #828282;
  font-size: 1.2rem;
  text-align: center;
  margin: 10px 0;
`;
