import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
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

  label {
    width: 100%;
    input {
      background: #fafafa;
      color: #828282;
      padding: 10px;
      margin-top: 2px;
      border: none;
      /* width: 228px; */
      width: 100%;
      height: 36px;
    }
  }
`;
const IconWrapper = styled.div`
  text-align: center;
  display: none;
  .icon {
    font-size: 22px;
    padding: 10px;
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
  .button {
    margin-left: 8px;
  }
`;

interface userNameState {
  userNameEntered: string;
  isUserNameFocused: boolean;
  isUserNameValid: boolean;
}
interface passwordState {
  passwordEntered: string;
  isPasswordValid: boolean;
  isPasswordFocused: boolean;
}

export default function JoinInputBox() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // 인풋 상태

  const [phoneOrEmail, setPhoneOrEmail] = useState<string | number>('');

  const [userName, setUserName] = useState<userNameState>({
    userNameEntered: '',
    isUserNameFocused: true,
    isUserNameValid: false,
  });
  const { userNameEntered, isUserNameFocused, isUserNameValid } = userName;

  const [userId, setUserId] = useState<string>('');

  const [password, setPassword] = useState<passwordState>({
    passwordEntered: '',
    isPasswordFocused: false,
    isPasswordValid: false,
  });
  const { passwordEntered, isPasswordFocused, isPasswordValid } = password;
  const [isPasswordShown, setPasswordShown] = useState(false);

  // 성명
  const inputUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName({
      ...userName,
      userNameEntered: e.target.value,
      isUserNameValid: userNameEntered.length > 6 ? true : false,
    });
  };
  const onNameBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName({
      ...userName,
      isUserNameValid: userNameEntered.length > 6 ? true : false,
      isUserNameFocused: false,
    });
  };
  const onNameFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName({
      ...userName,
      isUserNameFocused: true,
    });
  };
  // 비밀번호

  const inputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({
      ...password,
      passwordEntered: e.target.value,
      isPasswordValid: passwordEntered.length >= 6 ? true : false,
    });
  };
  const onPasswordBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({
      ...password,
      isPasswordFocused: false,
    });
  };
  const onPasswordFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({
      ...password,
      isPasswordFocused: true,
    });
  };

  const toggleShowPassword = () => {
    setPasswordShown(!isPasswordShown);
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
          <input
            type="text"
            name="userName"
            value={userNameEntered}
            onChange={inputUserName}
            onBlur={onNameBlur}
            onFocus={onNameFocus}
            placeholder="성명"
            required
          ></input>
        </label>

        <IconWrapper
          style={{
            display: isUserNameFocused ? 'none' : 'block',
          }}
        >
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
          <input
            type={isPasswordShown ? 'text' : 'password'}
            name="password"
            value={passwordEntered}
            onChange={inputPassword}
            onBlur={onPasswordBlur}
            onFocus={onPasswordFocus}
            placeholder="비밀번호"
            required
          />
        </label>
        <IconWrapper
          style={{
            display: isPasswordFocused ? 'none' : 'flex',
            alignItems: 'center',
          }}
        >
          {isPasswordValid ? (
            <BiCheckCircle className="icon check" />
          ) : (
            <RiCloseCircleLine className="icon close" />
          )}
          <div style={{ whiteSpace: 'nowrap' }}>
            <button
              type="button"
              onClick={toggleShowPassword}
              style={{ fontWeight: 'bold', fontSize: '1rem' }}
            >
              비밀번호 표시
            </button>
          </div>
        </IconWrapper>
      </StyledDiv>
    </StyledForm>
  );
}
