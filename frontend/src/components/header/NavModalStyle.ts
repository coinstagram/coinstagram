import styled from 'styled-components';
import { NavModalProps } from './NavModal';

export const StyledDivBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const StyledModal = styled.div`
  position: absolute;
  color: rgb(50, 50, 50);
  top: ${({ top }: NavModalProps) => top + 13};
  left: ${({ left }: NavModalProps) => left - 200};
  width: 230px;
  height: 148px;
  border-radius: 6px;
  background: rgb(255, 255, 255);
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
  animation: dropDown ease-out 0.2s;

  @keyframes dropDown {
    from {
      transform: scale(0.99);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: -7px;
    left: 193px;
    width: 14px;
    height: 14px;
    transform: rotateZ(45deg);
    background: rgb(255, 255, 255);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
  }

  .modal-container {
    position: absolute;
    width: 100%;
    background-color: rgb(255, 255, 255);
    display: block;
    border-radius: 6px;

    li {
      width: 100%;
      height: 37px;
      a {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        line-height: 21px;
        padding: 8px 16px;

        svg {
          width: 20px;
          height: 20px;
          margin-right: 12px;
        }

        &:hover {
          background: rgb(248, 249, 250);
        }
        &:active {
          background: rgb(241, 243, 245);
        }
      }

      &:nth-child(4) {
        border-top: 1px solid rgb(219, 219, 219);
        font-size: 15px;
      }
    }

    li + li {
      margin-left: 0;
    }
  }
`;

export const StyledReadyDiv = styled.div`
  font-size: 16px;
  padding: 50px;
  text-align: center;
`;
