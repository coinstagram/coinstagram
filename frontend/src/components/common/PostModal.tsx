import React from 'react';
import { Link } from 'react-router-dom';

// styles
import { StyledBg, StyledModal, StyledSpan } from './PostModalStyle';
import { useSelector } from 'react-redux';
import RootState from '../../type';

interface PostModalProps {
  popPostModal: () => void;
  popFollowModal: () => void;
  postId: number;
  userId: string | null;
  getAnotherUserInfo: () => void;
}

function PostModal({
  popPostModal,
  popFollowModal,
  postId,
  userId,
  getAnotherUserInfo,
}: PostModalProps) {
  const { user_id } = useSelector((state: RootState) => state.userInfo.user);

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
          <li onClick={getAnotherUserInfo} tabIndex={-1}>
            <Link to={`/post/${postId}`}>
              <span>게시물로 이동</span>
            </Link>
          </li>
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
