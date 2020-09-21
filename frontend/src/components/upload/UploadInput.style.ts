import styled from 'styled-components';
// import uploadImg from '../../resource/image/uploadImg.png';
import test from '../../resource/image/test.jpg';

export const StyledDiv = styled.div`
  border-bottom: 1px solid rgb(219, 219, 219);
`;

export const UploadWrapper = styled.div`
  position: relative;
  display: block;
  height: 478px;
  background-image: url(${test});
  background-repeat: no-repeat;
  background-position: 46% 40%;
  background-size: 100%;
  background-color: white;
  opacity: 0.5;
`;
export const StyledLabel = styled.label`
  /* position: relative; */
  display: block;
  height: 478px;

  /* background-image: url(${test});
  background-repeat: no-repeat;
  background-position: 46% 40%;
  background-size: 100%;
  background-color: white;
  opacity: 0.5; */
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
