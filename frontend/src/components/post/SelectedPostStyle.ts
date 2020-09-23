import styled, { css } from 'styled-components';

export const StyledArticle = styled.article`
  border: 1px solid rgb(219, 219, 219);
  background: rgb(255, 255, 255);

  ${props =>
    props.width > 1500
      ? css`
          display: flex;
          & > div:nth-of-type(1) {
            width: 70%;
            li {
              padding-bottom: 65%;
              img {
                object-fit: cover;
              }
            }
          }
          & > div:nth-of-type(2) {
            flex-grow: 2;
          }
        `
      : css``}

  .slick-dots {
    bottom: 0;
    top: 95%;
    padding-bottom: 0;
  }
`;

export const StyledDiv = styled.div`
  padding: 16px;
  border-bottom: 1px solid rgb(239, 239, 239);
  height: ${props => (props.width > 1500 ? 100 : '')}%;
  max-height: ${props => (props.width > 1500 ? 432 : 330)};
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
