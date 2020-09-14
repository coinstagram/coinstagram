import React, { useState } from 'react';
import styled from 'styled-components';
import InputEmail from '../components/common_login,join/InputEmail';
import InputUserName from '../components/common_login,join/InputUserName';
import InputUserId from '../components/common_login,join/InputUserId';
import InputPassword from '../components/common_login,join/InputPassword';
import JoinLoginButton from '../components/common_login,join/JoinLoginButton';
import { useDispatch } from 'react-redux';
import { signupSagaActionCreator } from '../redux/modules/signup';

const StyledForm = styled.form``;

export default function JoinContainer() {
  const [user_email, setEmail] = useState('');
  const [user_id, setUserId] = useState('');
  const [user_password, setPassword] = useState('');
  const [user_name, setUserName] = useState('');

  const onInputEmail = (text: string): void => {
    setEmail(text);
  };
  const onInputUserId = (text: string): void => {
    setUserId(text);
  };
  const onInputPassword = (text: string): void => {
    setPassword(text);
  };
  const onInputUserName = (text: string): void => {
    setUserName(text);
  };
  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      signupSagaActionCreator(user_email, user_name, user_id, user_password),
    );
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <InputEmail userEmail={user_email} onInputEmail={onInputEmail} />
      <InputUserName userName={user_name} onInputUserName={onInputUserName} />
      <InputUserId userId={user_id} onInputUserId={onInputUserId} />
      <InputPassword
        userPassword={user_password}
        onInputPassword={onInputPassword}
      />
      <JoinLoginButton content="가입" />
    </StyledForm>
  );
}
