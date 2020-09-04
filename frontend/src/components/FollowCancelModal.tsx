import React from 'react';
import { StyledBg, StyledModal } from './post/PostModal';
import styled from 'styled-components';

function FollowCancelModal() {
  return (
    <StyledBg>
      <StyledModal>
        <div></div>
        <ul>
          <li>
            <button>
              <span tabIndex={-1}>팔로우 취소</span>
            </button>
          </li>
          <li>
            <button>
              <span tabIndex={-1}>취소</span>
            </button>
          </li>
        </ul>
      </StyledModal>
    </StyledBg>
  );
}

export default FollowCancelModal;
