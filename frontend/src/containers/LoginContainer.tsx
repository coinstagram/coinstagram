import React, { useState } from 'react';
import RootState from '../type';
import InputUserId from '../components/common_login,join/InputUserId';
import InputPassword from '../components/common_login,join/InputPassword';
import { StyledLogin, StyledForm } from '../components/login/LoginStyle';
import JoinLoginButton from '../components/common_login,join/JoinLoginButton';
import ImageLogo from '../components/common_login,join/ImageLogo';
import { useDispatch, useSelector } from 'react-redux';
import { signInSagaActionCreator } from '../redux/modules/auth';
import ErrorMessage from '../components/common_login,join/ErrorMessage';
import useWindowWidth from '../hooks/useWindowWidth';
import FacebookLogin from '../components/common_login,join/FacebookLogin';
// import Facebook from '../components/login/Facebook';
import OrLine from '../components/common_login,join/OrLine';

const idRegExp = /^[a-zA-Z0-9]{4,12}$/;

function LoginContainer() {
  const [user_password, setPassword] = useState('');
  const [user_id, setUserId] = useState('');

  const onInputPassword = (text: string): void => {
    setPassword(text);
  };
  const onInputUserId = (text: string): void => {
    setUserId(text);
  };

  const idCheck = idRegExp.test(user_id);
  const passwordCheck = user_password.length >= 6;

  const dispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(idCheck && passwordCheck)) return;
    dispatch(signInSagaActionCreator(user_id, user_password));
  };
  // 로그인 실패 시
  const { auth } = useSelector((state: RootState) => state);
  const { error, loading } = auth;

  const width = useWindowWidth();

  return (
    <>
      <StyledLogin width={width}>
        <ImageLogo width={width} />
        <StyledForm onSubmit={handleSubmit} width={width}>
          <InputUserId userId={user_id} onInputUserId={onInputUserId} toggleIcon={idCheck} />
          <InputPassword userPassword={user_password} onInputPassword={onInputPassword} toggleIcon={passwordCheck} style={{ marginBottom: '20px' }} />
          <JoinLoginButton
            loading={loading}
            content="로그인"
            disabled={!idCheck && !passwordCheck}
            className={['button', idCheck && passwordCheck && 'active'].join(' ')}
          ></JoinLoginButton>
        </StyledForm>
        <ErrorMessage error={error}>
          사용자 정보가 일치하지 않습니다.
          <p>다시 입력해주세요</p>
        </ErrorMessage>
        <OrLine />
        <FacebookLogin />
        {/* <Facebook /> */}
      </StyledLogin>
    </>
  );
}
export default React.memo(LoginContainer);
