import React from 'react';
import styled from 'styled-components';

import InputPhone from '../common_login,join/InputPhone';
import InputUserName from '../common_login,join/InputUserName';
import InputUserId from '../common_login,join/InputUserId';
import InputPassword from '../common_login,join/InputPassword';

const StyledForm = styled.form``;
export default function JoinInputBox() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // useEffect(() => {
  //   if (userNameEntered.length >= 6) {
  //     setUserName(state => ({
  //       ...state,
  //       isUserNameValid: true,
  //     }));
  //   }
  // }, [userNameEntered]);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <InputPhone />
      <InputUserName />
      <InputUserId />
      <InputPassword />
    </StyledForm>
  );
}
