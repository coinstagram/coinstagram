import React from 'react';
import styled from 'styled-components';
import InputPhone from '../components/common_login,join/InputPhone';
import InputUserName from '../components/common_login,join/InputUserName';
import InputUserId from '../components/common_login,join/InputUserId';
import InputPassword from '../components/common_login,join/InputPassword';
import { useSelector, useDispatch } from 'react-redux';
import { SignupState } from '../type';
import { signupRequestSaga } from '../redux/modules/signup';

const StyledForm = styled.form``;

export default function JoinContainer() {
  const dispatch = useDispatch();
  const { loading, token, error } = useSelector((state: SignupState) => state);
  const { user_email, user_name, user_id, user_password } = userData;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signupRequestSaga(userData));
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <InputPhone />
      <InputUserName />
      <InputUserId />
      <InputPassword />
    </StyledForm>
  );
}
