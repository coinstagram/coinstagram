import React from 'react';
import styled, { css } from 'styled-components';
import { rotate } from '../../styles/ThumbnailBorderStyle';
import borderStyle from '../../styles/ThumbnailBorderStyle';

// components
import Thumbnail from '../Thumbnail';
import FollowBtn from './FollowBtn';
import { AnotherUserState } from '../../type';

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
  userId: null | string;
  userName: null | string;
  userProfile: null | string;
  followers?: AnotherUserState[];
}

function RecommendUsersInfo({
  size,
  isAnother,
  userId,
  userName,
  userProfile,
  followers,
}: RecommendUserInfoProps) {
  return (
    <StyledDiv
      size={size}
      isAnother={isAnother}
      userId={userId}
      userName={userName}
      userProfile={userProfile}
      followers={followers}
    >
      <button onClick={rotate}>
        <Thumbnail size={size} imageUrl={userProfile} />
        <div tabIndex={-1}>
          <dt className="a11y-hidden">user id</dt>
          <dd>{userId}</dd>
        </div>
      </button>
      <StyledDivUsername
        size={size}
        isAnother={isAnother}
        userId={userId}
        userName={userName}
        userProfile={userProfile}
        followers={followers}
      >
        <dt className="a11y-hidden">user name</dt>
        <dd>{userName}</dd>
      </StyledDivUsername>
      {isAnother && (
        <FollowBtn
          size={size}
          userId={userId}
          userName={userName}
          userProfile={userProfile}
          followers={followers}
        />
      )}
    </StyledDiv>
  );
}

RecommendUsersInfo.defaultProps = {
  isAnother: false,
  followers: [],
};

export default React.memo(RecommendUsersInfo);
