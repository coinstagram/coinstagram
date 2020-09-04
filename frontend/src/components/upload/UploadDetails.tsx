import React from 'react';
import styled from 'styled-components';

const StyledText = styled.textarea`
  position: relative;
  border: none;
  width: 100%;
  height: 120px;
  padding: 10px;
  resize: none;
  outline: none;

  &::placeholder {
    font-size: 15px;
  }
`;

const StyledDiv = styled.div`
  display: flex;

  input {
    height: 50px;
    padding: 10px;
    flex-grow: 1;
    outline: none;
    border: none;
    border-top: 1px solid rgb(219, 219, 219);
  }

  label {
    display: flex;
    align-items: center;
    padding: 0 10px;
    border-top: 1px solid rgb(219, 219, 219);
    font-weight: bolder;
    font-size: 16px;
    background-color: rgb(255, 255, 255);
  }
`;

function UploadDetails() {
  return (
    <div>
      <StyledText placeholder="문구를 입력 해 주세요." />
      <StyledDiv>
        <label htmlFor="people">사람 태그하기</label>
        <input id="people" type="text" />
      </StyledDiv>
      <StyledDiv>
        <label htmlFor="location">위치 추가</label>
        <input id="location" type="text" />
      </StyledDiv>
    </div>
  );
}

export default UploadDetails;
