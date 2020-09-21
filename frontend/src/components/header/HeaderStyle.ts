import styled from 'styled-components';

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  background-color: rgb(255, 255, 255);
  background-color: rgb(50, 50, 50);

  .container {
    height: ${props => (props.width < 655 ? 54 : 70)};
    padding: 0 20px;
    margin: 0 auto;
    max-width: 1500px;
    color: rgb(255, 255, 255);

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
