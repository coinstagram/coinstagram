import styled from 'styled-components';

export const StyledContainer = styled.div`
  form {
    border-top: 1px solid rgb(219, 219, 219);
    margin-bottom: 0;
  }
  fieldset {
    border: none;
    margin: 0;
    padding: 0;

    div {
      display: flex;
      align-items: center;

      input {
        border: none;
        padding: 16px;
        width: 100%;
        resize: none;
        outline: none;
      }
      label {
        span {
          display: inline-block;
          outline: none;
          padding: 10px;
          width: 50px;
          color: rgb(0, 149, 246);
          font-weight: bold;
        }
      }
    }
  }
`;

export const StyledDiv = styled.div`
  padding: 0 16px;
  display: flex;
  align-items: center;

  span {
    font-weight: bold;
    font-size: 13px;
    outline: none;
    align-self: end;

    &:hover {
      color: rgb(142, 142, 142);
    }
  }

  p {
    line-height: 20px;
    margin: 0 0 0 10px;
  }
`;
