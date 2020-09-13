import React, { useState } from 'react';
import InputCommon from './InputCommon';

export default function InputPhone() {
  const [user_name, setUserName] = useState('');
  const inputUserName = (text: string): void => {
    setUserName(text);
  };

  return (
    <>
      <InputCommon
        type="text"
        name="user_name"
        value={user_name}
        onInput={inputUserName}
        placeholder="성명"
        toggleIcon={user_name.length >= 6}
        display="block"
      ></InputCommon>
    </>
  );
}
