import React from 'react';
import InputCommon from './InputCommon';

interface emailProps {
  userEmail: string;
  toggleIcon: boolean;
  onInputEmail: (text: string) => void;
}
export default function InputEmail({
  userEmail,
  onInputEmail,
  toggleIcon,
}: emailProps) {
  // const emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  // const phoneRegExp = /^\d{3}-\d{3,4}-\d{4}$/;

  return (
    <>
      <InputCommon
        type="text"
        name="user_email"
        value={userEmail}
        onInput={onInputEmail}
        placeholder="이메일 주소"
        toggleIcon={toggleIcon}
        display="block"
      ></InputCommon>
    </>
  );
}
