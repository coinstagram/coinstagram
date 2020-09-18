import React from 'react';

// styles
import { StyledBg, StyledSpan } from './PostModalStyle';
import { StyledDiv, StyledFollowModal } from './FollowCancelModalStyle';

// components
import Thumbnail from './Thumbnail';

interface FollowCancelModalProps {
  user_id: string;
  user_profile: null | string;
  targetEl?: HTMLSpanElement;
  cancelFollow: () => void;
  popFollowModal: () => void;
}

function FollowCancelModal({
  user_id,
  user_profile,
  targetEl,
  cancelFollow,
  popFollowModal,
}: FollowCancelModalProps) {
  return (
    <StyledBg className="modal-container" onClick={toggleFollowModal}>
      <StyledFollowModal>
        <StyledDiv>
          <Thumbnail size={90} imageUrl={user_profile} />
          <p>@{user_id}님의 팔로우를 취소하시겠어요?</p>
        </StyledDiv>
        <ul>
          <li>
            <button onClick={click}>
              <StyledSpan tabIndex={-1}>팔로우 취소</StyledSpan>
            </button>
          </li>
          <li>
            <button>
              <span tabIndex={-1}>취소</span>
            </button>
          </li>
        </ul>
      </StyledFollowModal>
    </StyledBg>
  );

  function toggleFollowModal({
    target,
  }: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const clickEl = target as Element;
    if (
      !clickEl.matches('.modal-container') &&
      !clickEl.matches('.modal-container li button > span')
    )
      return;
    popFollowModal();
  }

  function click() {
    cancelFollow();

    if (!targetEl) return;
    targetEl.className = 'active';
  }
}

FollowCancelModal.defaultProps = {
  target: null,
};

export default FollowCancelModal;
