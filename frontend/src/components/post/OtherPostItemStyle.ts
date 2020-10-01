import styled from 'styled-components';
export const StyledLi = styled.li`
  position: relative;

  a:hover > div {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  a {
    display: inline-block;
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    img {
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 3px;
      background-color: rgba(219, 219, 219, 0.7);
      animation: fadeIn 2s;
    }
    svg {
      position: absolute;
      font-size: 20px;
      color: rgb(255, 255, 255);
      top: 10px;
      right: 10px;
    }
  }
`;

export const StyledCountDiv = styled.div`
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
        position: static;
      }
      span {
        display: inline-block;
        margin-left: 5px;
      }
    }
  }
`;
