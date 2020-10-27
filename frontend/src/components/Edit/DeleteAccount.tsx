import React from 'react';
import { StyledArticle } from './DeleteAccountStyle';

interface DeleteAccountProps {
  deleteAccount: (e: React.FormEvent<HTMLFormElement>) => void;
}
export default function DeleteAccount({ deleteAccount }: DeleteAccountProps) {
  return (
    <StyledArticle>
      <h3>계정 삭제</h3>
      <form onSubmit={deleteAccount}>
        <p>계정을 삭제하면 다시 복구할 수 없습니다.</p>
        <p>정말 삭제하시겠습니까?</p>
        <button type="submit">내 계정 영구 삭제</button>
      </form>
    </StyledArticle>
  );
}
