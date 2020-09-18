import styled from 'styled-components';

export const StyledButton = styled.div`
  position: relative;
  width: 215px;

  input {
    width: 100%;
    height: 30px;
    padding: 3px 26px;
    box-sizing: border-box;
    border: 1px solid rgb(219, 219, 219);
    border-radius: 3px;
    background-color: rgb(250, 250, 250);
  }

  span {
    position: absolute;

    text-align: center;
    color: rgb(219, 219, 219);

    svg {
      vertical-align: top;
    }

    &.search {
      top: 7px;
      left: 5px;
      width: 15px;
      height: 15px;
    }

    &.reset {
      top: 4.5px;
      right: 3px;

      width: 20px;
      height: 20px;
      font-size: 20px;
    }
  }
`;
