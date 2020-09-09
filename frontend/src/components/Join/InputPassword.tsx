import React, { useState } from 'react';
import InputCommon from './InputCommon';

export interface passwordProps {
  style?: { marginBottom: string };
}

export default function InputPassword({ style }: passwordProps) {
  // export default function InputPassword() {
  const [password, setPassword] = useState('');
  const [isPasswordShown, setPasswordShown] = useState(false);

  const inputPassword = (text: string): void => {
    setPassword(text);
  };

  const toggleShowPassword = () => {
    setPasswordShown(!isPasswordShown);
  };
  return (
    <>
      <InputCommon
        type={isPasswordShown ? 'text' : 'password'}
        name="password"
        value={password}
        onChange={inputPassword}
        placeholder="비밀번호"
        toggleIcon={password.length >= 6}
        display="flex"
        style={style}
      >
        {' '}
        <div>
          <button
            className="toggleBtn"
            type="button"
            onClick={toggleShowPassword}
          >
            {isPasswordShown ? '숨기기' : '비밀번호 표시'}
          </button>
        </div>
      </InputCommon>
    </>
  );
}
