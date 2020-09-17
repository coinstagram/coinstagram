import React, { useContext } from 'react';
import { AnotherUserState } from '../../type';
import { followContext } from '../../App';
import { ModalContext } from '../../App';

// styles
import { StyledButton } from './FollowBtnStyle';

// components;
import Spinner from '../common/Spinner';

export interface FollowBtnProps {
  top?: number;
  right?: number;
  userId: string | null;
  userName: string | null;
  userProfile: string | null;
  followers?: AnotherUserState[];
  isRecommend?: boolean;
}

function FollowBtn({
  top,
  right,
  userId,
  userName,
  userProfile,
  followers = [],
  isRecommend,
}: FollowBtnProps) {
  const value = useContext(followContext);
  const { popFollowModal } = useContext(ModalContext);

  return (
    <>
      <StyledButton top={top} right={right} isRecommend={isRecommend}>
        {followers.some(follower => follower.user_id === userId) ? (
          <span tabIndex={-1} className="follow-cancel" onClick={cancelFollow}>
            <Spinner isRecommend={isRecommend} />
            <span>팔로잉</span>
          </span>
        ) : (
          <span tabIndex={-1} className="follow" onClick={postFollow}>
            <Spinner isRecommend={isRecommend} />
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
  isheader: false,
};

export default React.memo(FollowBtn);
