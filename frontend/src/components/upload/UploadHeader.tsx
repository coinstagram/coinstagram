import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  line-height: 60px;
  font-size: 16px;
  font-weight: bold;
  padding-left: 15px;
  border-bottom: 1px solid rgb(219, 219, 219);
`;

function UploadHeader() {
  return <StyledDiv>새 게시물 작성</StyledDiv>;
}

export default UploadHeader;
