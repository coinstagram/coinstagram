import React from 'react';
import { useSelector } from 'react-redux';
import RootState from '../../type';
import { StyledDiv, StyledBackground } from './FollowListModalStyle';

// components
import RecommendUsersInfo from '../recommend/RecommendUsersInfo';

interface FollowListModalProps {
  modal: boolean;
  content: string;
  toggleModal: (content?: string) => void;
}

function FollowListModal({
  modal,
  content,
  toggleModal,
}: FollowListModalProps) {
  const { followers, followees } = useSelector(
    (state: RootState) => state.anotherUserInfo,
  );
  const { userInfo } = useSelector((state: RootState) => state);
  const myFollowers = userInfo.followers.users;
  const myFollowees = userInfo.followees;

  return (
    <StyledBackground modal={modal} onClick={e => toggleModal('')}>
      <StyledDiv>
        <div className="list-header">{content}</div>
        <div className="list-body">
          {content === '팔로우' &&
            followers.map(follower => (
              <div key={follower.user_id}>
                <RecommendUsersInfo
                  size={40}
                  isAnother={true}
                  userId={follower.user_id}
                  userName={follower.user_name}
                  userProfile={follower.user_profile}
                  followers={myFollowers}
                />
              </div>
            ))}
          {content === '팔로워' &&
            followees.map(followees => (
              <div key={followees.user_id}>
                <RecommendUsersInfo
                  size={40}
                  isAnother={true}
                  userId={followees.user_id}
                  userName={followees.user_name}
                  userProfile={followees.user_profile}
                  followers={myFollowees}
                />
              </div>
            ))}
        </div>
      </StyledDiv>
    </StyledBackground>
  );
}

export default FollowListModal;
