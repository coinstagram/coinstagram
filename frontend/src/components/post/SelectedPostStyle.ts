import styled, { css } from 'styled-components';

interface Props {
  imageUrl: string;
}

export const StyledArticle = styled.article`
  border: 1px solid rgb(219, 219, 219);

  & > div:nth-of-type(1) {
    float: left;
    width: 100%;

    ${props =>
      props.width > 750
        ? css`
            height: 100%;
            max-height: 500px;
            text-align: center;
            width: 70%;
            background-image: url(${({ imageUrl }: Props) => `http://localhost:4000/${parseImgPath(imageUrl)}`});
            background-repeat: no-repeat;
            background-size: cover;
            & > div {
              background-color: rgba(0, 0, 0, 0.6);
              backdrop-filter: blur(20px);
            }
            li {
              height: 100%;
              padding-bottom: 0;
              img {
                position: static;
                width: auto;
                height: 100%;
              }
            }
          `
        : css`
            li {
              display: inline-block;
              position: relative;
              width: 100%;
              padding-bottom: 100%;
            }

            img {
              position: absolute;
              display: inline-block;
              width: 100%;
              height: 100%;
            }
          `}
  }

  & > div:nth-of-type(2) {
    overflow: ${props => props.width > 750 && 'hidden'};
  }
`;

export const StyledDiv = styled.div`
  padding: 16px;
  border-bottom: 1px solid rgb(239, 239, 239);
  overflow-y: auto;
  height: ${props => props.width > 750 && 100}%;
  max-height: 251px;
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
