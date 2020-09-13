import React, { useState } from 'react';
import InputCommon from './InputCommon';

export default function InputPhone() {
  const [user_id, setUserId] = useState('');
  const idRegExp = /^[a-zA-Z0-9]{4,12}$/;
  const inputUserId = (text: string): void => {
    setUserId(text);
  };

  return (
    <>
      <InputCommon
        type="text"
        name="user_id"
        value={user_id}
        onInput={inputUserId}
        placeholder="사용자 이름"
        toggleIcon={idRegExp.test(user_id)}
        display="block"
      ></InputCommon>
    </>
  );
}
