import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { BiCheckCircle } from 'react-icons/bi';
import { RiCloseCircleLine } from 'react-icons/ri';
import { AiOutlineReload } from 'react-icons/ai';

const StyledForm = styled.form``;
const StyledDiv = styled.div`
  width: 268px;
  height: 38px;
  display: flex;
  margin-bottom: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  background: #fafafa;
  font-size: 0.9em;

  span {
    color: #828282;
  }
  input {
    background: #fafafa;
    color: #828282;
    padding: 10px;
    margin-top: 2px;
    border: none;
    width: 228px;
    height: 36px;
  }
`;
const IconWrapper = styled.div`
  width: 100%;
  text-align: center;
  .icon {
    font-size: 22px;
    padding: 10px 0;
    &.close {
      color: #ef3f4f;
    }
    &.reload {
      color: #4794d9;
    }
    &.check {
      color: #d5d6d7;
    }
  }
`;

interface State {
  nameEntered: string;
  isNameValid: boolean;
}

export default function JoinInputBox() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  // 이름_입력
  const [userName, setUserName] = useState<State>({
    nameEntered: '',
    isNameValid: false,
  });
  const { nameEntered, isNameValid } = userName;

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserName({
      ...userName,
      nameEntered: value,
    });
    validateName(value);
  };

  // 이름_유효성 검사
  const validateName = (nameEntered: string) => {
    if (nameEntered.length > 1) {
      setUserName({
        nameEntered,
        isNameValid: true,
      });
    }
  };
  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledDiv>
        <label>
          {/* <span>휴대폰 번호 또는 이메일 주소</span> */}
          <input
            type="text"
            name="phoneNumber"
            placeholder="휴대폰 번호 또는 이메일 주소"
            required
          ></input>
        </label>
        <IconWrapper>
          <BiCheckCircle className="icon check" />
        </IconWrapper>
      </StyledDiv>
      <StyledDiv>
        <label>
          {/* <span>성명</span> */}
          <input
            type="text"
            name="userName"
            placeholder="성명"
            value={nameEntered}
            onChange={handleUserName}
            required
          ></input>
        </label>
        <IconWrapper>
          {isNameValid ? (
            <BiCheckCircle className="icon check" />
          ) : (
            <RiCloseCircleLine className="icon close" />
          )}
        </IconWrapper>
      </StyledDiv>
      <StyledDiv>
        <label>
          {/* <span>사용자 이름</span> */}
          <input type="text" name="userId" placeholder="사용자 이름" required />
        </label>
        <IconWrapper>
          <AiOutlineReload className="icon reload" />
        </IconWrapper>
      </StyledDiv>
      <StyledDiv>
        <label>
          {/* <span>비밀번호</span> */}
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            required
          />
        </label>
        <IconWrapper>
          <AiOutlineReload className="icon reload" />
        </IconWrapper>
      </StyledDiv>
    </StyledForm>
  );
}
