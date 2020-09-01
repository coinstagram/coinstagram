import React from 'react';
import styled, { css } from 'styled-components';
import { loading } from '../styles/ThumbnailBorderStyle';
import borderStyle from '../styles/ThumbnailBorderStyle';

// components
import Thumbnail from './Thumbnail';
import FollowBtn from './FollowBtn';

const StyledDiv = styled.div`
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

const StyledDivUsername = styled.div`
  dd {
    position: absolute;
    font-size: 12px;
    color: rgb(142, 142, 142);
    ${({ size }: RecommendUserInfoProps) => css`
      left: ${(size * 4) / 3};
      top: ${(size * 3) / 5};
    `};
  }
`;

interface RecommendUserInfoProps {
  size: number;
  isAnother?: boolean;
}

function RecommendUsersInfo({ size, isAnother }: RecommendUserInfoProps) {
  return (
    <StyledDiv size={size} isAnother={isAnother}>
      <button onClick={loading}>
        <Thumbnail size={size} />
        <div tabIndex={-1}>
          <dt className="a11y-hidden">user id</dt>
          <dd>user_id</dd>
        </div>
      </button>
      <StyledDivUsername size={size}>
        <dt className="a11y-hidden">user name</dt>
        <dd>user name</dd>
      </StyledDivUsername>
      {isAnother && <FollowBtn size={size} />}
    </StyledDiv>
  );
}

RecommendUsersInfo.defaultProps = {
  isAnother: false,
};

export default RecommendUsersInfo;
