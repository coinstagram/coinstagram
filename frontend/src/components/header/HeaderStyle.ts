import styled from 'styled-components';

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(219, 219, 219);

  .container {
    height: 54px;
    padding: 0 20px;
    margin: 0 auto;
    max-width: 975px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
