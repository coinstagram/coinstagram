import styled from 'styled-components';

export const StyledArticle = styled.article`
  border: 1px solid rgb(219, 219, 219);

  & > div:nth-of-type(1) {
    float: left;
    width: 100%;
    height: 100%;
    max-height: 500px;
    max-width: 1000px;
  }

  & > div:nth-of-type(2) {
    overflow: ${props => props.width > 1000 && 'hidden'};
  }
`;

export const StyledDiv = styled.div`
  padding: 16px;
  border-bottom: 1px solid rgb(239, 239, 239);
  overflow-y: auto;
  height: 100%;
  max-height: ${props => (props.width > 1000 ? 251 : 300)};
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
