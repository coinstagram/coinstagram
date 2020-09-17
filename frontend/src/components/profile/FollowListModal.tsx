import React from 'react';
import { useSelector } from 'react-redux';
import RootState from '../../type';

// styles
import { StyledDiv, StyledBackground, StyledBtn } from './FollowListModalStyle';

// icons
import { ImCancelCircle } from 'react-icons/im';

// components
import RecommendUsersInfo from '../recommend/RecommendUsersInfo';

interface FollowListModalProps {
  modal: boolean;
  content: string;
  toggleModal: (
    content?: string,
    target?: EventTarget,
    curTarget?: EventTarget,
  ) => void;
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
  const myId = userInfo.user && userInfo.user.user_id;
  const myFollowers = userInfo.followers.users;

  return (
    <StyledBackground
      modal={modal}
      onClick={e => toggleModal('', e.target, e.currentTarget)}
    >
      <StyledDiv onClick={click} className="followList-modal">
        <div className="list-header">{content}</div>
        <div className="list-body">
          {content === '팔로우' &&
            followers.map(follower => (
              <div key={follower.user_id}>
                <RecommendUsersInfo
                  size={40}
                  isAnother={follower.user_id !== myId}
                  userId={follower.user_id}
                  userName={follower.user_name}
                  userProfile={follower.user_profile}
                  followers={myFollowers}
                />
              </div>
            ))}
          {content === '팔로워' &&
            followees.map(followee => (
              <div key={followee.user_id}>
                <RecommendUsersInfo
                  size={40}
                  isAnother={followee.user_id !== myId}
                  userId={followee.user_id}
                  userName={followee.user_name}
                  userProfile={followee.user_profile}
                  followers={myFollowers}
                />
              </div>
            ))}
        </div>
        <StyledBtn onClick={e => toggleModal('', e.target, e.currentTarget)}>
          <span tabIndex={-1}>
            <ImCancelCircle />
          </span>
        </StyledBtn>
      </StyledDiv>
    </StyledBackground>
  );

  function click(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    toggleModal('', e.target, e.currentTarget);
  }
}

export default FollowListModal;
