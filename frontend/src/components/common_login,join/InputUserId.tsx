import React from 'react';
import InputCommon from './InputCommon';

export interface userIdProps {
  userId?: string | null;
  onInputUserId?: (text: string) => void;
  toggleIcon: boolean;
}
export default function InputUserId({ userId, onInputUserId, toggleIcon }: userIdProps) {
  return (
    <>
      <InputCommon
        type="text"
        name="user_id"
        value={userId}
        onInput={onInputUserId}
        placeholder="사용자 ID (4~12 글자)"
        toggleIcon={toggleIcon}
        display="block"
      ></InputCommon>
    </>
  );
}
