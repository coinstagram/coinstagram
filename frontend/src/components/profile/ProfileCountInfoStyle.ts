import styled from 'styled-components';

export const StyledDiv = styled.div`
  font-size: 16px;
  margin-bottom: 20px;

  button {
    margin-left: 40px;

    &:active {
      color: rgb(134, 142, 150);
    }

    span {
      outline: none;
      display: inline-block;
    }
  }
`;
