import React, { useState } from 'react';
import styled from 'styled-components';
import InputEmail from '../components/common_login,join/InputEmail';
import InputUserName from '../components/common_login,join/InputUserName';
import InputUserId from '../components/common_login,join/InputUserId';
import InputPassword from '../components/common_login,join/InputPassword';
import { useSelector, useDispatch } from 'react-redux';
import { SignupState } from '../type';
// import { signupRequestSaga, signupStart } from '../redux/modules/signup';

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

  // const dispatch = useDispatch();
  // const { loading, token, error, userData } = useSelector(
  //   (state: SignupState) => state,
  // );
  // const { user_email, user_name, user_id, user_password } = userData;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // dispatch(signupRequestSaga(userData));
    // dispatch(signupStart(userData));
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
    </StyledForm>
  );
}
