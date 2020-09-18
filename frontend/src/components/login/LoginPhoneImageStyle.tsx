import styled from 'styled-components';
import randomImage_0 from '../../../src/resource/image/randomImage_0.jpg';
import randomImage_1 from '../../../src/resource/image/randomImage_1.jpg';
import randomImage_2 from '../../../src/resource/image/randomImage_2.jpg';
import randomImage_3 from '../../../src/resource/image/randomImage_3.jpg';
import randomImage_4 from '../../../src/resource/image/randomImage_4.jpg';

export const imgArray = [
  randomImage_0,
  randomImage_1,
  randomImage_2,
  randomImage_3,
  randomImage_4,
];

export const StyledDiv = styled.div`
  position: relative;
  width: 454px;
  height: 618px;
  img {
    position: absolute;
    &.phoneImage {
      top: 0;
      left: 0;
    }
    &.randomImage {
      top: 100px;
      right: 63px;
      width: 240px;
      height: 427px;
    }
  }
`;
