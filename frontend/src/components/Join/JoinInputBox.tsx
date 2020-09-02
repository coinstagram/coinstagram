import React from 'react';
import styled from 'styled-components';

export default function JoinInputBox() {
  const StyledInputBox = styled.form`
    input {
      background: #fafafa;
      color: #828282;
      border: 1px solid #dbdbdb;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 3px;
    }
  `;

  return (
    <StyledInputBox>
      <input
        type="text"
        name="phoneNumber"
        placeholder="휴대폰 또는 이메일 주소"
        size={34}
      />
      <input type="text" name="userName" placeholder="성명" size={34} />
      <input type="text" name="userId" placeholder="사용자 이름" size={34} />
      <input type="password" name="password" placeholder="비밀번호" size={34} />
    </StyledInputBox>
  );
}
