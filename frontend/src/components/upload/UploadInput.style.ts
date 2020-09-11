import styled from 'styled-components';
import uploadImg from '../../resource/image/uploadImg.png';

export const StyledDiv = styled.div`
  border-bottom: 1px solid rgb(219, 219, 219);
`;

export const StyledLabel = styled.label`
  position: relative;
  display: block;
  height: 478px;

  background-image: url(${uploadImg});
  background-repeat: no-repeat;
  background-position: 46% 40%;
  background-size: 40%;
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
