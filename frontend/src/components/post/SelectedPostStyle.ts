import styled, { css } from 'styled-components';

export const StyledArticle = styled.article`
  border: 1px solid rgb(219, 219, 219);
  background: rgb(255, 255, 255);

  ${props =>
    props.width > 1500
      ? css`
          display: flex;
          & > div:nth-of-type(1) {
            width: 1050px;
            height: 787px;
            text-align: center;
            background-image: url('http://localhost:4000/${parseImgPath(props.imageUrl)}');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: 50% 50%;
            & > div {
              backdrop-filter: blur(10px);
              background-color: rgba(0, 0, 0, 0.6);
            }
            li {
              padding-bottom: 0;
              img {
                position: static;
                height: 100%;
                width: auto;
                object-fit: contain;
              }
            }
          }
          & > div:nth-of-type(2) {
            flex-grow: 2;
          }
        `
      : css``}

  .slick-slider .slick-dots {
    bottom: 0;
    top: 95%;

    li {
      padding-bottom: 0;
      background-color: transparent;
      backdrop-filter: none;
    }
  }
`;

export const StyledDiv = styled.div`
  padding: 16px;
  border-bottom: 1px solid rgb(239, 239, 239);
  height: ${props => (props.width > 1500 ? 100 : '')}%;
  max-height: ${props => (props.width > 1500 ? 537 : 330)};
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

function parseImgPath(imageUrl: string) {
  if (imageUrl !== null && imageUrl !== undefined) {
    if (imageUrl.split('\\')[1] !== undefined) {
      return (imageUrl = imageUrl.split('\\')[1]);
    } else if (imageUrl.split('/')[1] !== undefined) {
      return (imageUrl = imageUrl.split('/')[1]);
    }
  }
}
