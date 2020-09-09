import styled from 'styled-components';
import { StyledDivBg } from '../header/NavModalStyle';

export const StyledBg = styled(StyledDivBg)`
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 20;
`;

export const StyledModal = styled.div`
  position: absolute;
  top: calc(50% - 150px);
  left: calc(50% - 200px);
  background-color: rgb(255, 255, 255);
  border-radius: 12px;

  li + li {
    border-top: 1px solid rgb(219, 219, 219);
  }

  li {
    a {
      display: block;
    }

    a > span,
    button > span {
      display: block;
      box-sizing: border-box;
      padding: 4px 8px;
      width: 400px;
      line-height: 40px;
      text-align: center;
      border-radius: 12px;
      outline: none;

      &:hover {
        background: rgb(248, 249, 250);
      }
      &:active {
        background: rgb(241, 243, 245);
      }
    }
  }
`;

export const StyledSpan = styled.span`
  color: rgb(237, 73, 86);
  font-weight: bold;
`;
