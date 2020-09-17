import styled from 'styled-components';

export interface ContentProps {
  askContent?: string;
  content?: string;
}
export const StyledAskLogin = styled.div`
  height: 70px;
  background: #ffffff;
  border: 1px solid #dbdbdb;
  text-align: center;
  padding: 10px 0;
  margin: 0 0 10px;
  box-sizing: border-box;

  .login {
    color: #0095f6;
  }
`;
