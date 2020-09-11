import React, { useContext } from 'react';
import { AnotherUserState } from '../../type';
import { followContext } from '../HomeMain';
import { ModalContext } from '../../App';

// styles
import { StyledButton } from './FollowBtnStyle';

// components;
import Spinner from '../common/Spinner';

export interface FollowBtnProps {
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
  const { popFollowModal } = useContext(ModalContext);

  return (
    <>
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
    </>
  );

  function postFollow(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    if (value === null) return;
    if (userId === null || userName === null) return;
    (e.currentTarget as Element).className = 'active';
    value.follow(userId, userName, userProfile);
  }

  function cancelFollow(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    if (value === null || userId === null) return;
    popFollowModal();
    value.setFollowInfo(userId, userProfile, e.currentTarget);
  }
}

FollowBtn.defaultProps = {
  followers: [],
};

export default React.memo(FollowBtn);
