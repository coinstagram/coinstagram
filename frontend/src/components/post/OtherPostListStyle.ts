import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  position: relative;
  min-height: 162px;
  & li {
    display: inline-block;
    
    ${props =>
      props.width > 1000
        ? css`
            width: 22%;
            margin-left: 4%;
            margin-top: 4%;
            box-shadow: 5px 5px 10px rgb(219, 219, 219);
            &:nth-of-type(1) {
              margin-top: 0;
            }
            &:nth-of-type(2) {
              margin-top: 0;
            }
            &:nth-of-type(3) {
              margin-top: 0;
            }
            &:nth-of-type(4) {
              margin-top: 0;
            }
            &:nth-of-type(4n + 1) {
              margin-left: 0;
            }
          `
        : css`
            width: 33%;
            margin-left: 0.5%;
            margin-top: 0.5%;
            &:nth-of-type(3n + 1) {
              margin-left: 0;
            }
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
}
`;

export const StyledSpinnerDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;
