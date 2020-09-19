import styled, { css } from 'styled-components';

export const StyledSection = styled.section`
  li {
    display: inline-block;
    box-sizing: border-box;
    ${props =>
      props.width >= 750
        ? css`
            width: 18%;
            margin-top: 2.5%;
            margin-left: 2.5%;
            box-shadow: 5px 5px 10px rgb(219, 219, 219);
          `
        : css`
            width: 33%;
            margin-top: 0.5%;
            margin-left: 0.5%;
          `}
  }

  li:nth-of-type(17n + 1) {
    margin-left: 0;
  }

  li:nth-of-type(17n + 5) {
    margin-left: 0;
  }

  li:nth-of-type(17n + 8) {
    margin-left: 0;
  }

  li:nth-of-type(17n + 13) {
    margin-left: 0;
  }

  li:nth-of-type(17n + 4) {
    float: right;
    width: ${props => (props.width >= 750 ? 38.48 : 66.48)}%;
  }
`;

export const StyledDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const StyledErrorDiv = styled.div`
  margin-top: 30%;
  p {
    text-align: center;
    font-size: 30px;
  }
`;
