import styled from 'styled-components';

export const StyledArticle = styled.article`
  border: 1px solid rgb(219, 219, 219);
  border-radius: 3px;

  & + & {
    margin-top: 60px;
  }
`;

export const StyledPreviewDiv = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 50px;
  height: 500px;
  border: 1px solid rgb(219, 219, 219);

  p {
    float: left;
    margin: 13px 40px 0 0;
    padding: 5px 40px;
    background-color: rgb(51, 154, 240);
    border-radius: 5px;
    font-size: 20px;
    font-weight: bold;
    color: rgb(250, 250, 250);
  }

  a {
    font-size: 60px;
    color: rgb(51, 154, 240);
  }
`;
