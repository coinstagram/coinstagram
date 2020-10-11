import styled from 'styled-components';
import { StyledDivBg } from '../header/NavModalStyle';

export const StyledBg = styled(StyledDivBg)`
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 20;
`;

export const StyledModal = styled.div`
  position: absolute;
  /* z-index: -1; */
  top: calc(50% - 108px);
  left: ${props => (props.width < 400 ? 'calc(50% - 175px)' : 'calc(50% - 200px)')};
  background-color: rgb(255, 255, 255);
  border-radius: 12px;
  animation: smaller 0.2s;
  width: ${props => (props.width < 350 ? 300 : 350)};
  p {
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem;
  }
  .btns {
    display: flex;
    border-top: 1px solid rgb(219, 219, 219);
    button {
      &:nth-of-type(1) {
        border-right: 1px solid rgb(219, 219, 219);
        border-radius: 0 0 0 12px;
      }
      &:nth-of-type(2) {
        border-radius: 0 0 12px 0;
      }
      &:hover {
        color: #ffffff;
        background-color: #0095f6;
      }
      width: 50%;
      display: block;
      box-sizing: border-box;
      padding: 4px 8px;
      line-height: 40px;
      text-align: center;

      outline: none;
    }
  }
`;
