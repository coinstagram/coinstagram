import React, { useContext } from 'react';
import styled from 'styled-components';
import { AnotherUserState } from '../../type';
import { followContext } from '../../containers/MainContainer';

// components;
import Spinner from '../Spinner';

const StyledButton = styled.button`
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

interface FollowBtnProps {
  size: number;
  userId: string | null;
  userName: string | null;
  userProfile: string | null;
  followers?: AnotherUserState[];
}

function FollowBtn({
  size,
  userId,
  userName,
  userProfile,
  followers = [],
}: FollowBtnProps) {
  const value = useContext(followContext);
  return (
    <StyledButton
      size={size}
      followers={followers}
      userId={userId}
      userName={userName}
      userProfile={userProfile}
    >
      {followers.some(follower => follower.user_id === userId) ? (
        <span tabIndex={-1} className="follow-cancel" onClick={cancelFollow}>
          <Spinner />
          <span>팔로잉</span>
        </span>
      ) : (
        <span tabIndex={-1} className="follow" onClick={postFollow}>
          <Spinner />
          <span>팔로우</span>
        </span>
      )}
    </StyledButton>
  );

  function postFollow(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    if (value === null) return;
    if (userId === null || userName === null) return;
    (e.currentTarget as Element).className = 'active';
    value.follow(userId, userName, userProfile);
  }

  function cancelFollow(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    if (value === null || userId === null) return;
    (e.currentTarget as Element).className = 'active';
    value.cancelFollow(userId);
  }
}

FollowBtn.defaultProps = {
  followers: [],
};

export default React.memo(FollowBtn);
