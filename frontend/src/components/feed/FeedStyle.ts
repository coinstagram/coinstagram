import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  position: relative;
  min-height: 170px;
`;

export const StyledArticle = styled.article`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(219, 219, 219);
  border-radius: 10px;
  animation: fadeIn 1s;
  transition: box-shadow 0.3s, transform 0.5s;

  &.selected {
    box-shadow: 5px 5px 10px rgb(219, 219, 219);
  }

  ${props =>
    props.width < 655
      ? css`
          margin-top: 20px;
          border: 1px solid rgb(219, 219, 219);
        `
      : css`
          margin-top: 50px;
        `}

  ${props =>
    props.width < 655
      ? css`
          & {
            margin-left: 0;
          }
        `
      : css`
          display: inline-block;
          box-sizing: border-box;
          width: 32%;
          & {
            margin-left: 2%;
          }
          &:nth-of-type(3n + 1) {
            margin-left: 0;
          }
        `}
`;

export const StyledSpinnerDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const StyledPreviewDiv = styled.div`
  position: relative;
  margin: 40px auto;
  max-width: 670px;
  border: 1px solid rgb(219, 219, 219);
`;

export const StyledCommentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;

  p {
    display: inline-block;
    margin: 0 20px;
    padding: 5px 40px;
    background-color: rgb(51, 154, 240);
    border-radius: 5px;
    font-size: 20px;
    font-weight: bold;
    color: rgb(250, 250, 250);
  }

  a {
    display: inline-block:
    margin-top: 10px;
    vertical-align: bottom;
    font-size: 60px;
    color: rgb(51, 154, 240);
  }
`;

export const StyledPostDiv = styled.div`
  display: inline-block;
  margin-left: 2.5%;
  margin-top: 2.5%;
  width: 30%;
  padding-bottom: 30%;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${props => `http://localhost:4000/${paseImagePath(props.image[0])}`});

  @keyframse fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  animation: fadeIn 2s;
`;

function paseImagePath(imageUrl: string) {
  if (imageUrl !== null && imageUrl !== undefined) {
    if (imageUrl.split('\\')[1] !== undefined) {
      return imageUrl.split('\\')[1];
    } else if (imageUrl.split('/')[1] !== undefined) {
      return imageUrl.split('/')[1];
    }
  }
}
