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
  display: none;

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

interface userNameState {
  // phoneOrEmail: string;
  userNameEntered: string;
  // userId: string;
  // password: string | number;
  isUserNameFocused: boolean;
  isUserNameValid: boolean;
}

export default function JoinInputBox() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  // 이름_입력
  const [phoneOrEmail, setPhoneOrEmail] = useState<string | number>('');
  const [userName, setUserName] = useState<userNameState>({
    userNameEntered: '',
    isUserNameFocused: true,
    isUserNameValid: false,
  });
  const { userNameEntered, isUserNameFocused, isUserNameValid } = userName;
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const InputUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName({
      ...userName,
      userNameEntered: e.target.value,
      isUserNameValid: true,
    });
  };
  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName({
      ...userName,
      isUserNameValid: userNameEntered !== '' ? true : false,
      isUserNameFocused: false,
    });
  };
  const onFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName({
      ...userName,
      isUserNameFocused: true,
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledDiv>
        <label>
          {/* <span>휴대폰 번호 또는 이메일 주소</span> */}
          <input
            type="text"
            name="phoneOrEmail"
            value={phoneOrEmail}
            placeholder="휴대폰 번호 또는 이메일 주소"
            required
          ></input>
        </label>
        <IconWrapper>
          {/* <BiCheckCircle className="icon check" /> */}
        </IconWrapper>
      </StyledDiv>
      <StyledDiv>
        <label>
          {/* <span>성명</span> */}
          <input
            type="text"
            name="userName"
            value={userNameEntered}
            onChange={InputUserName}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder="성명"
            required
          ></input>
        </label>
        <IconWrapper style={{ display: isUserNameFocused ? 'none' : 'block' }}>
          {isUserNameValid ? (
            <BiCheckCircle className="icon check" />
          ) : (
            <RiCloseCircleLine className="icon close" />
          )}
        </IconWrapper>
      </StyledDiv>
      <StyledDiv>
        <label>
          {/* <span>사용자 이름</span> */}
          <input
            type="text"
            name="userId"
            value={userId}
            placeholder="사용자 이름"
            required
          />
        </label>
        <IconWrapper>
          {/* <AiOutlineReload className="icon reload" /> */}
        </IconWrapper>
      </StyledDiv>
      <StyledDiv>
        <label>
          {/* <span>비밀번호</span> */}
          <input
            type="password"
            name="password"
            value={password}
            placeholder="비밀번호"
            required
          />
        </label>
        <IconWrapper>
          {/* <AiOutlineReload className="icon reload" /> */}
        </IconWrapper>
      </StyledDiv>
    </StyledForm>
  );
}
