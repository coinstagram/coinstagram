import React, { useState } from 'react';
import InputCommon from './InputCommon';

export default function InputPhone() {
  const [userId, setUserId] = useState('');
  const idRegExp = /^[a-zA-Z0-9]{4,12}$/;
  const inputUserId = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserId(e.target.value);
  };

  return (
    <>
      <InputCommon
        type="text"
        name="userId"
        value={userId}
        onChange={() => inputUserId}
        placeholder="사용자 이름"
        toggleIcon={idRegExp.test(userId)}
        display="block"
      ></InputCommon>
    </>
  );
}
