import React, { useState, useEffect } from 'react';
import InputEmail from '../components/common_login,join/InputEmail';
import InputUserName from '../components/common_login,join/InputUserName';
import InputUserId from '../components/common_login,join/InputUserId';
import InputPassword from '../components/common_login,join/InputPassword';
import JoinLoginButton from '../components/common_login,join/JoinLoginButton';
import { useDispatch, useSelector } from 'react-redux';
import { signupSagaActionCreator } from '../redux/modules/signup';
import ErrorMessage from '../components/common_login,join/ErrorMessage';
import { StyledForm } from '../components/Join/JoinWrapperStyle';
import LoadingSpinner from '../components/common_login,join/LoadingSpinner';
import useWindowWidth from '../hooks/useWindowWidth';

const emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const phoneRegExp = /^\d{3}-\d{3,4}-\d{4}$/;
const idRegExp = /^[a-zA-Z0-9]{4,12}$/;

function JoinContainer() {
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
  const phoneEmailCheck = phoneRegExp.test(user_email) || emailRegExp.test(user_email);
  const nameCheck = user_name.length >= 2;
  const idCheck = idRegExp.test(user_id);
  const passwordCheck = user_password.length >= 6;

  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (phoneEmailCheck && nameCheck && idCheck && passwordCheck) dispatch(signupSagaActionCreator(user_email, user_name, user_id, user_password));
  };

  // 회원가입 실패 시

  const { signup } = useSelector((state: any) => state);
  const { error, loading } = signup;

  useEffect(() => {}, [error]);
  const width = useWindowWidth();
  return (
    <>
      <StyledForm onSubmit={handleSubmit} width={width}>
        <InputEmail userEmail={user_email} onInputEmail={onInputEmail} toggleIcon={phoneEmailCheck} />
        <InputUserName userName={user_name} onInputUserName={onInputUserName} toggleIcon={nameCheck} />
        <InputUserId userId={user_id} onInputUserId={onInputUserId} toggleIcon={idCheck} />
        <InputPassword userPassword={user_password} onInputPassword={onInputPassword} toggleIcon={passwordCheck} />
        <JoinLoginButton
          content="가입"
          disabled={!phoneEmailCheck && !nameCheck && !idCheck && !passwordCheck}
          className={['button', phoneEmailCheck && nameCheck && idCheck && passwordCheck && 'active'].join(' ')}
        />

        {loading && <LoadingSpinner />}
      </StyledForm>

      <ErrorMessage error={error}>
        기존에 있는 사용자 ID입니다.
        <p>다른 ID를 입력해주세요</p>
      </ErrorMessage>
    </>
  );
}
export default React.memo(JoinContainer);
