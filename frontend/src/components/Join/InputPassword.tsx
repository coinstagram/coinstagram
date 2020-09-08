import React, { useState } from 'react';
import InputStyle from '../../styles/InputStyle';

interface passwordProps {
  style?: { marginBottom: string };
}

export default function InputPassword({ style }: passwordProps) {
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
      <InputStyle
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
      </InputStyle>
    </>
  );
}
