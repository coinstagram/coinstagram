import React, { useState } from 'react';
import InputCommon from './InputCommon';

export default function InputPhone() {
  const [userName, setUserName] = useState('');
  const inputUserName = (text: string): void => {
    setUserName(text);
  };

  return (
    <>
      <InputCommon
        type="text"
        name="userName"
        value={userName}
        onInput={inputUserName}
        placeholder="성명"
        toggleIcon={userName.length >= 6}
        display="block"
      ></InputCommon>
    </>
  );
}
