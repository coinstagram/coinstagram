import styled from 'styled-components';

export const StyledButton = styled.div`
  position: relative;
  width: 330px;

  input {
    width: 100%;
    height: 40px;
    padding: 3px 26px 3px 40px;
    font-size: 1.2rem;
    box-sizing: border-box;
    border: none;
    border-radius: 22px;
    background-color: #5d5d5d;
    color: rgb(219, 219, 219);
    outline: none;
    &::placeholder {
      color: rgb(219, 219, 219);
    }
  }

  span {
    position: absolute;

    text-align: center;
    color: rgb(219, 219, 219);

    svg {
      vertical-align: top;
      font-size: 20px;
    }

    &.search {
      top: 9px;
      left: 15px;
      width: 15px;
      height: 15px;
    }

    &.reset {
      top: 9px;
      right: 10px;

      width: 20px;
      height: 20px;
      font-size: 20px;
    }
  }
`;
