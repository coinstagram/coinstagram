import styled from 'styled-components';

export const StyledDiv = styled.div`
  position: relative;
  margin-top: 20px;

  font-weight: bold;
  font-size: 15px;
  color: rgb(142, 142, 142);

  span {
    display: block;
  }

  a {
    &:hover {
      color: rgb(173, 181, 189);
    }
  }

  .github-logo {
    font-size: 30px;
    position: absolute;
    right: 10px;
    bottom: 5px;
  }
`;
