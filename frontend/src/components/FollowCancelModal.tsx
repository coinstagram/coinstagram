import React, { useContext } from 'react';
import { StyledBg, StyledModal, StyledSpan } from './PostModal';
import styled from 'styled-components';
import { followContext } from '../containers/Main';

// components
import Thumbnail from './Thumbnail';
import { ModalContext } from '../App';

const StyledFollowModal = styled(StyledModal)`
  padding-top: 20px;

  ul > li:nth-child(1) {
    border-top: 1px solid rgb(219, 219, 219);
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface FollowCancelModalProps {
  user_id: string;
  user_profile: null | string;
  targetEl?: HTMLSpanElement;
  cancelFollow: () => void;
}

function FollowCancelModal({
  user_id,
  user_profile,
  targetEl,
  cancelFollow,
}: FollowCancelModalProps) {
  const value = useContext(followContext);
  const { popFollowModal } = useContext(ModalContext);

  return (
    <StyledBg onClick={popFollowModal}>
      <StyledFollowModal>
        <StyledDiv>
          <Thumbnail size={90} imageUrl={user_profile} />
          <p>{user_id}님의 팔로우를 취소하시겠어요?</p>
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

  function click() {
    if (!targetEl) return;
    targetEl.className = 'active';
    cancelFollow();
  }
}

FollowCancelModal.defaultProps = {
  target: null,
};

export default FollowCancelModal;
