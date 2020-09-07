import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { BiCheckCircle } from 'react-icons/bi';
import { RiCloseCircleLine } from 'react-icons/ri';
// import { AiOutlineReload } from 'react-icons/ai';

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
      width: 100%;
      height: 36px;
      outline: none;
    }
  }
`;
const IconWrapper = styled.div`
  transition: 1s;
  text-align: center;
  align-items: center;
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
  div {
    white-space: nowrap;
    .toggleBtn {
      font-weight: bold;
      font-size: 1rem;
      outline: none;
    }
  }
`;

export default function JoinInputBox() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // 인풋 상태
  const [phoneEmail, setPhoneEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShown, setPasswordShown] = useState(false);

  // 전화번호, 이메일
  const emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const phoneRegExp = /^\d{3}-\d{3,4}-\d{4}$/;
  const inputPhoneEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneEmail(e.target.value);
  };

  // 성명
  const inputUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  // useEffect(() => {
  //   if (userNameEntered.length >= 6) {
  //     setUserName(state => ({
  //       ...state,
  //       isUserNameValid: true,
  //     }));
  //   }
  // }, [userNameEntered]);
  // 사용자 이름
  const idRegExp = /^[a-zA-Z0-9]{4,12}$/;
  const inputUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  // 비밀번호
  const inputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setPasswordShown(!isPasswordShown);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledDiv>
        <label>
          <input
            type="text"
            name="phoneEmail"
            value={phoneEmail}
            onChange={inputPhoneEmail}
            placeholder="휴대폰 번호 또는 이메일 주소"
            required
          ></input>
        </label>
        <IconWrapper
          style={{
            display: phoneEmail ? 'block' : 'none',
          }}
        >
          {phoneRegExp.test(phoneEmail) || emailRegExp.test(phoneEmail) ? (
            <BiCheckCircle className="icon check" />
          ) : (
            <RiCloseCircleLine className="icon close" />
          )}
        </IconWrapper>
      </StyledDiv>
      <StyledDiv>
        <label>
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={inputUserName}
            placeholder="성명"
            required
          ></input>
        </label>

        <IconWrapper
          style={{
            display: userName ? 'block' : 'none',
          }}
        >
          {userName.length >= 6 ? (
            <BiCheckCircle className="icon check" />
          ) : (
            <RiCloseCircleLine className="icon close" />
          )}
        </IconWrapper>
      </StyledDiv>
      <StyledDiv>
        <label>
          <input
            type="text"
            name="userId"
            value={userId}
            onChange={inputUserId}
            placeholder="사용자 이름"
            required
          />
        </label>
        <IconWrapper
          style={{
            display: userId ? 'block' : 'none',
          }}
        >
          {idRegExp.test(userId) ? (
            <BiCheckCircle className="icon check" />
          ) : (
            <RiCloseCircleLine className="icon close" />
          )}
        </IconWrapper>
      </StyledDiv>
      <StyledDiv>
        <label>
          <input
            type={isPasswordShown ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={inputPassword}
            placeholder="비밀번호"
            required
          />
        </label>
        <IconWrapper
          style={{
            display: password ? 'flex' : 'none',
          }}
        >
          {password.length >= 6 ? (
            <BiCheckCircle className="icon check" />
          ) : (
            <RiCloseCircleLine className="icon close" />
          )}
          <div>
            <button
              className="toggleBtn"
              type="button"
              onClick={toggleShowPassword}
            >
              {isPasswordShown ? '숨기기' : '비밀번호 표시'}
            </button>
          </div>
        </IconWrapper>
      </StyledDiv>
    </StyledForm>
  );
}
