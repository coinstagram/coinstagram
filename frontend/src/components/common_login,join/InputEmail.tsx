import React from 'react';
import InputCommon from './InputCommon';

interface emailProps {
  userEmail: string;
  onInputEmail: (text: string) => void;
}
export default function InputEmail({ userEmail, onInputEmail }: emailProps) {
  const emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const phoneRegExp = /^\d{3}-\d{3,4}-\d{4}$/;

  return (
    <>
      <InputCommon
        type="text"
        name="user_email"
        value={userEmail}
        onInput={onInputEmail}
        placeholder="휴대폰 번호 또는 이메일 주소"
        toggleIcon={phoneRegExp.test(userEmail) || emailRegExp.test(userEmail)}
        display="block"
      ></InputCommon>
    </>
  );
}
