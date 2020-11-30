import React from 'react';
import { useSelector } from 'react-redux';
import RootState, { AnotherUserState } from '../../type';
// styles
import { StyledDiv, StyledBackground, StyledBtn } from './FollowListModalStyle';

// icons
import { ImCancelCircle } from 'react-icons/im';

// components
import RecommendUsersInfo from '../recommend/RecommendUsersInfo';
import useWindowWidth from '../../hooks/useWindowWidth';

interface FollowListModalProps {
  myId: string;
  followers: AnotherUserState[];
  followees: AnotherUserState[];
  modal: boolean;
  content: string;
  isList?: boolean;
  toggleModal: (content?: string, target?: EventTarget, curTarget?: EventTarget) => void;
  popModal: () => void;
  onLogout?: () => void;
  closeModal?: () => void;
}

function FollowListModal({ myId, followers, followees, modal, content, isList, toggleModal, popModal, onLogout, closeModal }: FollowListModalProps) {
  const myFollowers = useSelector((state: RootState) => state.userInfo.followers.users);
  const width = useWindowWidth();

  return (
    <StyledBackground modal={modal} onClick={e => toggleModal('', e.target, e.currentTarget)}>
      <StyledDiv isList={isList} onClick={click} className="followList-modal" width={width}>
        {isList && (
          <>
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
          </>
        )}
        {!isList && (
          <ul onClick={popModal}>
            <li>
              <button onClick={onLogout}>
                <span tabIndex={-1}>로그 아웃</span>
              </button>
            </li>
            <li>
              <button>
                <span tabIndex={-1}>닫기</span>
              </button>
            </li>
          </ul>
        )}
      </StyledDiv>
    </StyledBackground>
  );

  function click(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    toggleModal('', e.target, e.currentTarget);
  }
}

FollowListModal.defaultProps = {
  isList: false,
};

export default FollowListModal;
