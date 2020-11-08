import styled, { css } from 'styled-components';

export const StyledSection = styled.section`
  border-top: 1px solid rgb(219, 219, 219);

  .active {
    color: rgb(50, 50, 50);

    ${props =>
      props.width >= 750 &&
      css`
        &::before {
          content: '';
          display: block;
          height: 1.5px;
          background-color: rgb(50, 50, 50);
        }
      `}
  }
`;

export const StyledNavDiv = styled.div`
  text-align: center;
  ul {
    margin: 0 auto;
    display: flex;
    width: ${props => (props.width < 750 ? 100 : 50)}%;
    justify-content: space-around;
    a {
      line-height: 52px;
      color: rgb(142, 142, 142);

      svg {
        height: 52px;
        font-size: 30px;
      }

      &.active svg {
        color: rgb(34, 139, 230);
      }
    }
  }
`;

export const StyledSpinnerDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const StyledNocontentDiv = styled.div`
  margin-top: 50px;
  text-align: center;
  font-size: 18px;
`;
