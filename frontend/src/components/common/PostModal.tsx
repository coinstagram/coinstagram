import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RootState, { AnotherUserState } from '../../type';

// styles
import { StyledBg, StyledModal, StyledSpan } from './PostModalStyle';

interface PostModalProps {
  popPostModal: () => void;
  popFollowModal: () => void;
  postId: number;
  userId: string | null;
  userName?: string;
  userProfile: null | string;
  followers: AnotherUserState[];
  follow: (user_id: string, user_name: string, user_profile: null | string) => void;
  deletePost: (post_id: number) => void;
  deleteBookmark: (post_id: number) => void;
}

function PostModal({
  popPostModal,
  popFollowModal,
  postId,
  userId,
  userName,
  userProfile,
  followers,
  follow,
  deletePost,
  deleteBookmark,
}: PostModalProps) {
  const user = useSelector((state: RootState) => state.userInfo.user);
  const user_id = user && user.user_id;
  const history = useHistory();
  const urlPost = +useLocation().pathname.split('/')[2];

  return (
    <StyledBg onClick={popPostModal}>
      <StyledModal>
        <ul>
          {user_id === userId && (
            <>
              <li>
                <button>
                  <span tabIndex={-1}>
                    <Link to={`/change/${postId}`}>
                      <span tabIndex={-1}>수정하기</span>
                    </Link>
                  </span>
                </button>
              </li>
              <li>
                <button onClick={postDelete}>
                  <span tabIndex={-1}>삭제</span>
                </button>
              </li>
            </>
          )}
          {followers.some(follower => follower.user_id === userId) && user_id !== userId && (
            <li>
              <button onClick={popCancelFollowModal}>
                <StyledSpan tabIndex={-1}>팔로우 취소</StyledSpan>
              </button>
            </li>
          )}
          {followers.every(follower => follower.user_id !== userId) && user_id !== userId && (
            <li>
              <button onClick={() => follow(userId, userName, userProfile)}>
                <StyledSpan tabIndex={-1}>팔로우 </StyledSpan>
              </button>
            </li>
          )}
          {!urlPost && (
            <li>
              <Link to={`/post/${postId}`}>
                <span tabIndex={-1}>게시물로 이동</span>
              </Link>
            </li>
          )}
          <li>
            <button>
              <span tabIndex={-1}>닫기</span>
            </button>
          </li>
        </ul>
      </StyledModal>
    </StyledBg>
  );

  function postDelete() {
    deletePost(postId);
    deleteBookmark(postId);
    history.push('/');
  }

  function popCancelFollowModal(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    popFollowModal();
  }
}

PostModal.defaultProps = {
  userName: null,
};

export default PostModal;
