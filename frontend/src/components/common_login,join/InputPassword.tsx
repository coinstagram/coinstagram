import React, { useState } from 'react';
import InputCommon from './InputCommon';
import StyledPassword from './InputPasswordStyle';

export interface passwordProps {
  userPassword?: string | null;
  onInputPassword?: (text: string) => void;
  style?: { marginBottom: string };
  toggleShowPassword?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isPasswordShown?: boolean;
  toggleIcon: boolean;
}

export default function InputPassword({ userPassword, onInputPassword, style, toggleIcon }: passwordProps) {
  const [isPasswordShown, setPasswordShown] = useState(false);

  const toggleShowPassword = () => {
    setPasswordShown(!isPasswordShown);
  };
  return (
    <>
      <InputCommon
        type={isPasswordShown ? 'text' : 'password'}
        name="user_password"
        value={userPassword}
        onInput={onInputPassword}
        placeholder="비밀번호 (6 글자 이상)"
        toggleIcon={toggleIcon}
        display="flex"
        style={style}
      >
        {' '}
        {userPassword.length >= 1 && (
          <StyledPassword>
            <button className="toggleBtn" type="button" onClick={toggleShowPassword}>
              {isPasswordShown ? '숨기기' : '비밀번호 표시'}
            </button>
          </StyledPassword>
        )}
      </InputCommon>
    </>
  );
}
