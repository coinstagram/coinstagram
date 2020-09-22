import styled, { css } from 'styled-components';
import upload3 from '../../resource/image/upload3.png';

export const StyledDiv = styled.div`
  border-bottom: 1px solid rgb(219, 219, 219);
`;

export const StyledLabel = styled.label`
  display: block;
  height: 100%;
  max-height: ${props => (props.width < 400 ? 358 : 598)};

  background-image: url(${upload3});
  background-repeat: no-repeat;
  background-position: 50% 40%;
  background-size: 50%;
  background-color: white;
  cursor: pointer;

  span {
    display: block;
    outline: none;
    height: 100%;
  }

  p {
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 20%;
    font-size: 16px;
    font-weight: bold;
    color: rgb(142, 142, 142);
  }
`;

export const StyledButton = styled.button`
  position: absolute;
  bottom: -39px;
  width: 100%;
  color: #ffffff;
  border: none;
  border-radius: 0 0 5px 5px;
  font-weight: bold;
  padding: 10px 15px;
  outline: none;

  ${props =>
    props.image.length === 0 || props.Loading
      ? css`
          cursor: auto;
          background: #b2dffc;
        `
      : css`
          background: #0095f6;
        `}
`;

export const StyledSpinnerDiv = styled.div`
  position: absolute;
  top: 13px;
  left: 62%;
`;
