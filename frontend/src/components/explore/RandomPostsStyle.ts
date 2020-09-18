import styled, { css } from 'styled-components';

export const StyledSection = styled.section`
  li {
    display: inline-block;
    box-sizing: border-box;
    ${props =>
      props.width >= 750
        ? css`
            width: 30%;
            margin-top: 5%;
            margin-left: 5%;
          `
        : css`
            width: 33%;
            margin-top: 0.5%;
            margin-left: 0.5%;
          `}
  }

  li:nth-of-type(12n + 1) {
    margin-left: 0;
  }

  li:nth-of-type(12n + 3) {
    margin-left: 0;
  }

  li:nth-of-type(12n + 4) {
    margin-left: 0;
  }

  li:nth-of-type(12n + 7) {
    margin-left: 0;
  }

  li:nth-of-type(12n + 10) {
    margin-left: 0;
  }

  li:nth-of-type(12n + 2) {
    float: right;
    width: ${props => (props.width >= 750 ? 65 : 66.5)}%;
  }
`;
