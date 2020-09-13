import React from 'react';
import InputCommon from './InputCommon';

interface userNameProps {
  userName: string;
  onInputUserName: (text: string) => void;
}
export default function InputUserName({
  userName,
  onInputUserName,
}: userNameProps) {
  return (
    <>
      <InputCommon
        type="text"
        name="user_name"
        value={userName}
        onInput={onInputUserName}
        placeholder="성명"
        toggleIcon={userName.length >= 6}
        display="block"
      ></InputCommon>
    </>
  );
}
