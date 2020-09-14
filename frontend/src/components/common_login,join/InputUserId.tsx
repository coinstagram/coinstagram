import React from 'react';
import InputCommon from './InputCommon';

export interface userIdProps {
  userId?: string | null;
  onInputUserId?: (text: string) => void;
}
export default function InputUserId({ userId, onInputUserId }: userIdProps) {
  const idRegExp = /^[a-zA-Z0-9]{4,12}$/;

  return (
    <>
      <InputCommon
        type="text"
        name="user_id"
        value={userId}
        onInput={onInputUserId}
        placeholder="사용자 이름"
        toggleIcon={idRegExp.test(userId)}
        display="block"
      ></InputCommon>
    </>
  );
}
