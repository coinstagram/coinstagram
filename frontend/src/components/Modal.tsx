import React from 'react';
import styled from 'styled-components';

const StyledDivBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledModal = styled.div`
  position: absolute;
  top: ${({ top }: ModalProps) => top + 10};
  left: ${({ left }: ModalProps) => left - 100};
  width: 100px;
  height: 100px;
  border: 1px solid black;
`;

interface ModalProps {
  top: number;
  left: number;
}

function Modal({ top, left }: ModalProps) {
  return (
    <StyledDivBg>
      <StyledModal top={top} left={left}>
        모달모달
      </StyledModal>
    </StyledDivBg>
  );
}

export default Modal;
