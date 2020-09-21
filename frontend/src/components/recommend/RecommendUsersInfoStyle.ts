import styled, { css } from 'styled-components';
import borderStyle from '../common/ThumbnailBorderStyle';
import { RecommendUserInfoProps } from './RecommendUsersInfo';

export const StyledDiv = styled.div`
  position: relative;

  button {
    display: flex;
    border-radius: 50%;
    ${({ isAnother }: RecommendUserInfoProps) => isAnother && borderStyle(4)}

    div {
      outline: none;

      dd {
        position: absolute;
        font-weight: bold;
        ${({ size }: RecommendUserInfoProps) => css`
          left: ${(size * 4) / 3};
          top: ${(size * 1) / 5};
        `}

        &:active {
          color: rgb(142, 142, 142);
        }
      }
    }
  }
`;

export const StyledDivUsername = styled.div`
  dd {
    position: absolute;
    width: 65%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 12px;
    color: rgb(142, 142, 142);
    ${({ size }: RecommendUserInfoProps) => css`
      left: ${(size * 4) / 3};
      top: ${(size * 3) / 5};
    `};
  }
`;
