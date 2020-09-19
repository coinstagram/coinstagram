import styled from 'styled-components';
import borderStyle from '../common/ThumbnailBorderStyle';

export const StyledSection = styled.section`
  height: 84px;
  padding: 16px 40px 10px 33px;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 3px;
  overflow: hidden;
  position: relative;

  .hidden-container {
    overflow: hidden;
    height: 100%;
    padding-left: 10px;
    padding-top: 2px;
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
