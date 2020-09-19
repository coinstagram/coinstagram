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
