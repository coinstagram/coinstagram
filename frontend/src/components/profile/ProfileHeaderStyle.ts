import styled, { css } from 'styled-components';

export const StyledSection = styled.section`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  padding-bottom: 45px;

  .info-container {
    margin-left: 30px;

    ${props =>
      props.width < 750 &&
      css`
        flex-basis: calc(100% - 107px);
        & > a {
          display: block;
          font-weight: bold;
          border: 1px solid rgb(219, 219, 219);
          border-radius: 5px;
          background-color: rgb(248, 249, 250);

          span {
            outline: none;
            box-sizing: border-box;
            display: block;
            text-align: center;
            padding: 5px 9px;
            &:active {
              color: rgb(134, 142, 150);
            }
          }
        }
      `}
    .id-container {
      display: flex;
      align-items: center;
      margin-bottom: ${props => (props.width < 750 ? 10 : 20)};

      dd {
        font-size: 28px;
        font-weight: 100;
      }

      ${props =>
        props.width >= 750 &&
        css`
          a {
            font-weight: bold;
            margin-left: 20px;
            border: 1px solid rgb(219, 219, 219);
            border-radius: 5px;
            background-color: rgb(248, 249, 250);

            span {
              outline: none;
              display: block;
              padding: 5px 9px;
              &:active {
                color: rgb(134, 142, 150);
              }
            }
          }
        `}

      button {
        margin-left: 10px;
        font-size: 30px;

        span {
          outline: none;
        }
      }
    }
  }
`;
