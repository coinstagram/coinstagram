import styled from 'styled-components';
import borderStyle from '../common/ThumbnailBorderStyle';

export const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const StyledSection = styled.section`
  flex-grow: 2;
  z-index: 1;
  height: 84px;
  padding: 16px 40px 10px 33px;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  overflow: hidden;
  position: relative;
  border: 1px solid rgb(219, 219, 219);

  .hidden-container {
    overflow: hidden;
    height: 100%;
    padding-left: 10px;
    padding-top: 2px;
    button {
      span {
        opacity: 1;
      }
    }
  }

  ul {
    display: flex;
    transition: transform 0.6s ease-out;
    li + li {
      margin-left: 22.5px;
    }
  }
`;

export const StyledButton = styled.button`
  div {
    position: relative;
    text-align: center;
    outline: none;
  }
  dd {
    position: absolute;
    top: 10px;
    left: -10px;
    width: 76px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${borderStyle(4)}
`;
