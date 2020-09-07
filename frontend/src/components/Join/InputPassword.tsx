import React, { useState } from 'react';
import InputStyle from '../../styles/InputStyle';

export default function InputPhone() {
  const [password, setPassword] = useState('');
  const [isPasswordShown, setPasswordShown] = useState(false);

  const inputPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
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
        onChange={() => inputPassword}
        placeholder="비밀번호"
        toggleIcon={password.length >= 6}
        display="flex"
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
