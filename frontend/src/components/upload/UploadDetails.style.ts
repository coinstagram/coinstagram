import styled from 'styled-components';

interface ITest {
  change: (event: React.ChangeEvent<HTMLButtonElement>) => void;
}

export const StyledText: any = styled.textarea<ITest>`
  position: relative;
  font-family: inherit;
  border: none;
  border-top: 1px solid rgb(219, 219, 219);
  width: 100%;
  height: 100px;
  padding: 10px;
  resize: none;
  outline: none;
  &::placeholder {
    font-size: 15px;
  }
`;

export const StyledDiv = styled.div`
  display: flex;
  input {
    height: 40px;
    padding: 10px;
    flex-grow: 1;
    outline: none;
    border: none;
    border-top: 1px solid rgb(219, 219, 219);
  }

  label {
    display: flex;
    align-items: center;
    padding: 0 10px;
    border-top: 1px solid rgb(219, 219, 219);
    font-weight: bolder;
    font-size: 16px;
    background-color: rgb(255, 255, 255);
  }
`;
