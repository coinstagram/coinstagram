import React from 'react';
import { rotate } from '../common/ThumbnailBorderStyle';
import { AnotherUserState } from '../../type';
import { useHistory } from 'react-router-dom';

// styles
import { StyledDiv, StyledDivUsername } from './RecommendUsersInfoStyle';

// components
import Thumbnail from '../common/Thumbnail';
import FollowBtn from './FollowBtn';

export interface RecommendUserInfoProps {
  size: number;
  isAnother?: boolean;
  userId: null | string;
  userName: null | string;
  userProfile: null | string;
  followers?: AnotherUserState[];
  isRecommend?: boolean;
}

function RecommendUsersInfo({
  size,
  isAnother,
  userId,
  userName,
  userProfile,
  followers,
  isRecommend,
}: RecommendUserInfoProps) {
  const history = useHistory();

  return (
    <StyledDiv
      size={size}
      isAnother={isAnother}
      userId={userId}
      userName={userName}
      userProfile={userProfile}
      followers={followers}
    >
      <button onClick={e => click(e, userId)}>
        <Thumbnail size={size} imageUrl={userProfile} />
        <div tabIndex={-1}>
          <dt className="a11y-hidden">user id</dt>
          <dd className="thumbnail-click">{userId}</dd>
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
          top={10}
          right={10}
          userId={userId}
          userName={userName}
          userProfile={userProfile}
          followers={followers}
          isRecommend={isRecommend}
        />
      )}
    </StyledDiv>
  );

  function click(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    user_id: string,
  ) {
    rotate(e);
    setTimeout(() => {
      history.push(`/account/${user_id}`);
    }, 1500);
  }
}

RecommendUsersInfo.defaultProps = {
  isAnother: false,
  followers: [],
  isRecommend: false,
};

export default React.memo(RecommendUsersInfo);
