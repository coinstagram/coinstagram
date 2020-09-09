import styled from 'styled-components';
import { FollowBtnProps } from './FollowBtn';

export const StyledButton = styled.button`
  position: absolute;
  right: 10px;
  top: ${({ size }: FollowBtnProps) => `${size / 5}`};

  color: rgb(0, 149, 246);
  font-weight: bold;
  font-size: 12px;

  span {
    outline: none;
    &:active {
      filter: brightness(1.2);
    }

    &.follow-cancel {
      color: rgb(0, 0, 0);
      &:active {
        color: rgb(50, 50, 50);
      }
    }
  }

  .active > span {
    display: none;
  }

  .follow > div {
    display: none;
  }
  .follow-cancel > div {
    display: none;
  }

  .active > div {
    display: block;
  }
`;
