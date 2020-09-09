import React from 'react';
import { Link } from 'react-router-dom';

// styles
import { StyledBg, StyledModal, StyledSpan } from './PostModalStyle';

interface PostModalProps {
  popPostModal: () => void;
  popFollowModal: () => void;
  postId: number;
}

function PostModal({ popPostModal, popFollowModal, postId }: PostModalProps) {
  return (
    <StyledBg onClick={popPostModal}>
      <StyledModal>
        <ul>
          <li>
            <button onClick={popCancelFollowModal}>
              <StyledSpan tabIndex={-1}>팔로우 취소</StyledSpan>
            </button>
          </li>
          <li>
            <Link to={`/post/${postId}`}>
              <span tabIndex={-1}>게시물로 이동</span>
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
