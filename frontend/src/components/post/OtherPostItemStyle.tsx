import styled from 'styled-components';

export const StyledLi = styled.li`
  position: relative;

  a:hover > div {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  img {
    width: 100%;
    max-width: 309px;
  }
`;

export const StyledDiv = styled.div`
  display: none;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  div {
    dd {
      font-size: 20px;
      color: rgb(255, 255, 255);

      svg {
        vertical-align: middle;
      }
      span {
        display: inline-block;
        margin-left: 5px;
      }
    }
  }
`;
