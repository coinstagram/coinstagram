import React, { useState } from 'react';
import InputCommon from './InputCommon';

export interface passwordProps {
  userPassword?: string | null;
  onInputPassword?: (text: string) => void;
  style?: { marginBottom: string };
}

export default function InputPassword({
  userPassword,
  onInputPassword,
  style,
}: passwordProps) {
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
        placeholder="비밀번호"
        toggleIcon={userPassword.length >= 6}
        display="flex"
        style={style}
      >
        {' '}
        {userPassword !== '' && (
          <div>
            <button
              className="toggleBtn"
              type="button"
              onClick={toggleShowPassword}
            >
              {isPasswordShown ? '숨기기' : '비밀번호 표시'}
            </button>
          </div>
        )}
      </InputCommon>
    </>
  );
}
