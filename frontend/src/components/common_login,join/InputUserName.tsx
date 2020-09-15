import React from 'react';
import InputCommon from './InputCommon';

interface userNameProps {
  userName: string;
  toggleIcon: boolean;
  onInputUserName: (text: string) => void;
}
export default function InputUserName({
  userName,
  onInputUserName,
  toggleIcon,
}: userNameProps) {
  return (
    <>
      <InputCommon
        type="text"
        name="user_name"
        value={userName}
        onInput={onInputUserName}
        placeholder="성명"
        toggleIcon={toggleIcon}
        display="block"
      ></InputCommon>
    </>
  );
}
