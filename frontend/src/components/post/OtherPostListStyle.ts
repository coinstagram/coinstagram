import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  position: relative;
  min-height: 162px;
  & li {
    display: inline-block;

    ${props =>
      props.width > 1000
        ? css`
            width: 30%;
            margin-left: 3.5%;
            margin-top: 3.5%;
          `
        : css`
            width: 33%;
            margin-left: 0.5%;
            margin-top: 0.5%;
          `}

    a {
      display: inline-block;
      position: relative;
      width: 100%;
      padding-bottom: 100%;
    }

    img {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }

  & li:nth-of-type(3n + 1) {
    margin-left: 0;
  }
`;

export const StyledSpinnerDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;
