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

            &:nth-of-type(17n + 1) {
              margin-left: 0;
            }

            &:nth-of-type(17n + 5) {
              margin-left: 0;
            }

            &:nth-of-type(17n + 8) {
              margin-left: 0;
            }

            &:nth-of-type(17n + 13) {
              margin-left: 0;
            }

            &:nth-of-type(17n + 4) {
              float: right;
              width: 38.48%;
            }
          `
        : css`
            width: 33%;
            margin-top: 0.5%;
            margin-left: 0.5%;

            &:nth-of-type(30n + 1) {
              margin-left: 0;
            }

            &:nth-of-type(30n + 2) {
              float: right;
              width: 66.48%;
            }

            &:nth-of-type(30n + 3) {
              margin-left: 0;
            }

            &:nth-of-type(30n + 4) {
              margin-left: 0;
            }

            &:nth-of-type(30n + 7) {
              margin-left: 0;
            }

            &:nth-of-type(30n + 10) {
              margin-left: 0;
            }

            &:nth-of-type(30n + 13) {
              margin-left: 0;
            }

            &:nth-of-type(30n + 16) {
              margin-left: 0;
              float: left;
              width: 66.48%;
            }

            &:nth-of-type(30n + 19) {
              margin-left: 0;
            }

            &:nth-of-type(30n + 22) {
              margin-left: 0;
            }

            &:nth-of-type(30n + 25) {
              margin-left: 0;
            }

            &:nth-of-type(30n + 28) {
              margin-left: 0;
            }
          `}
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
    font-size: 20px;
  }
`;
