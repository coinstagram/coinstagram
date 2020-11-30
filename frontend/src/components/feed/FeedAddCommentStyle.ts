import styled, { css } from 'styled-components';

export const StyledForm = styled.form`
    border-top: 1px solid rgb(239, 239, 239);
    margin-bottom: 0;
  fieldset {
    border: none;
    margin: 0;
    padding: 0;

    div {
      display: flex;
      align-items: center;

      input {
        border: none;
        border-radius: 10px;
        padding: 16px;
        width: 100%;
        height: 55px;
        outline: none;
        font-size: 14.5px;

        &::placeholder {
          font-size: 14.5px;
        }
      }
      label {
        button {
          opacity: 0.4;
          cursor: initial;
          ${props =>
            props.comment &&
            css`
              cursor: pointer;
              opacity: 1;
            `}
        }
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
`;
