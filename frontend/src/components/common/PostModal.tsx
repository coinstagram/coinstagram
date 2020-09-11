import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RootState from '../../type';

// styles
import { StyledBg, StyledModal, StyledSpan } from './PostModalStyle';

interface PostModalProps {
  popPostModal: () => void;
  popFollowModal: () => void;
  postId: number;
  userId: string | null;
}

function PostModal({
  popPostModal,
  popFollowModal,
  postId,
  userId,
}: PostModalProps) {
  const user = useSelector((state: RootState) => state.userInfo.user);
  const user_id = user && user.user_id;
  const urlPost = +useLocation().pathname.split('/')[2];

  return (
    <StyledBg onClick={popPostModal}>
      <StyledModal>
        <ul>
          {user_id === userId && (
            <>
              <li>
                <button>
                  <span tabIndex={-1}>수정</span>
                </button>
              </li>
              <li>
                <button>
                  <span tabIndex={-1}>삭제</span>
                </button>
              </li>
            </>
          )}
          {user_id !== userId && (
            <li>
              <button onClick={popCancelFollowModal}>
                <StyledSpan tabIndex={-1}>팔로우 취소</StyledSpan>
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

  function popCancelFollowModal(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    popFollowModal();
  }
}

export default PostModal;
