import React, { useState } from 'react';
import InputCommon from './InputCommon';

export default function InputPhone() {
  const [user_email, setPhoneEmail] = useState('');
  const emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const phoneRegExp = /^\d{3}-\d{3,4}-\d{4}$/;

  const inputPhoneEmail = (text: string): void => {
    setPhoneEmail(text);
  };

  return (
    <>
      <InputCommon
        type="text"
        name="user_email"
        value={user_email}
        onInput={inputPhoneEmail}
        placeholder="휴대폰 번호 또는 이메일 주소"
        toggleIcon={
          phoneRegExp.test(user_email) || emailRegExp.test(user_email)
        }
        display="block"
      ></InputCommon>
    </>
  );
}
