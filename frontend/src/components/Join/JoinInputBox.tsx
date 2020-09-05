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

  /* span {
    color: #828282;
    padding-left: 10px;
    width: 250px;
    height: 36px;
    font-size: 12px;
  } */

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

  const [phoneOrEmail, setPhoneOrEmail] = useState<string | number>('');
  // userName 상태
  // 1) userNmeEntered : 사용자 입력값
  // 2) isUserNameFocused : blur인 상태일 때만 오른쪽 v,x아이콘이 떠야하므로 그 상태 조절을 위한 불리언 값 필요
  // 3) isUserNameValid : 유효성 검사(빈 문자열만 아니면 OK)->불리언 값
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
  const [isSpanVisible, setIsSpanVisible] = useState(false);
  const onKeyDown = () => {
    setIsSpanVisible(true);
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
          <span style={{ display: isSpanVisible ? 'inline-block' : 'none' }}>
            성명
          </span>

          <input
            type="text"
            name="userName"
            value={userNameEntered}
            onChange={InputUserName}
            onBlur={onBlur}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            // placeholder="성명"
            required
          ></input>
        </label>
        {/* v,x아이콘 display 상태: focus일 경우 none으로 안 보여지게, blur일 경우 block으로 보여지게  */}
        <IconWrapper style={{ display: isUserNameFocused ? 'none' : 'block' }}>
          {/* valid일 경우 check아이콘, 아닐 경우 x아이콘 */}
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
