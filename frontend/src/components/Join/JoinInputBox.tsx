import React from 'react';
import styled from 'styled-components';

import InputPhone from './InputPhone';
import InputUserName from './InputUserName';
import InputUserId from './InputUserId';
import InputPassword from './InputPassword';

export default function JoinInputBox() {
  const StyledForm = styled.form``;

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
