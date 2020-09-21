import styled from 'styled-components';

export const StyledArticle = styled.article`
  display: flex;
  border: 1px solid rgb(219, 219, 219);
  background: rgb(255, 255, 255);

  & > div:nth-of-type(1) {
    width: 70%;

    li {
      padding-bottom: 65%;
    }
  }

  & > div:nth-of-type(2) {
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }
`;

export const StyledDiv = styled.div`
  flex-shrink: 2;
  padding: 16px;
  border-bottom: 1px solid rgb(239, 239, 239);
  overflow-y: auto;

  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 12px;
  }
  &::-webkit-scrollbar-button:end {
    width: 0px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(219, 219, 219);
    border-radius: 12px;
  }
`;
