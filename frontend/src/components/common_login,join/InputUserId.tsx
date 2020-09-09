import React, { useState } from 'react';
import InputCommon from './InputCommon';

export default function InputPhone() {
  const [userId, setUserId] = useState('');
  const idRegExp = /^[a-zA-Z0-9]{4,12}$/;
  const inputUserId = (text: string): void => {
    setUserId(text);
  };

  return (
    <>
      <InputCommon
        type="text"
        name="userId"
        value={userId}
        onInput={inputUserId}
        placeholder="사용자 이름"
        toggleIcon={idRegExp.test(userId)}
        display="block"
      ></InputCommon>
    </>
  );
}
