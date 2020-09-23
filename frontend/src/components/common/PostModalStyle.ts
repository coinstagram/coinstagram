import styled from 'styled-components';
import { StyledDivBg } from '../header/NavModalStyle';

export const StyledBg = styled(StyledDivBg)`
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 20;
`;

export const StyledModal = styled.div`
  position: absolute;
  z-index: -1;
  top: calc(50% - 180px);
  left: ${props => (props.width < 400 ? 'calc(50% - 175px)' : 'calc(50% - 200px)')};
  background-color: rgb(255, 255, 255);
  border-radius: 12px;
  animation: smaller 0.2s;

  @keyframes smaller {
    0% {
      transform: scale(1.1);
    }

    100% {
      transform: scale(1);
    }
  }

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
      width: ${props => (props.width < 400 ? 350 : 400)};
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
