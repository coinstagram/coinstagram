import React, { useState } from 'react';
import InputStyle from '../../styles/InputStyle';

export default function InputPhone() {
  const [userName, setUserName] = useState('');
  const inputUserName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserName(e.target.value);
  };

  return (
    <>
      <InputStyle
        type="text"
        name="userName"
        value={userName}
        onChange={() => inputUserName}
        placeholder="성명"
        toggleIcon={userName.length >= 6}
        display="block"
      ></InputStyle>
    </>
  );
}
