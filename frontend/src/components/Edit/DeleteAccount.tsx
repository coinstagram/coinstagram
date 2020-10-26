import React from 'react';
import { useDispatch } from 'react-redux';
import { StyledArticle } from './DeleteAccountStyle';
import { deleteSagaActionCreator } from '../../redux/modules/edit';

interface DeleteAccountProps {
  userId: string;
}
export default function DeleteAccount({ userId }: DeleteAccountProps) {
  const dispatch = useDispatch();
  const deleteAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(deleteSagaActionCreator(userId));
  };
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
