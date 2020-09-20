import styled, { keyframes } from 'styled-components';
import randomImage_0 from '../../../src/resource/image/randomImage_0.jpg';
import randomImage_1 from '../../../src/resource/image/randomImage_1.jpg';
import randomImage_2 from '../../../src/resource/image/randomImage_2.jpg';
import randomImage_3 from '../../../src/resource/image/randomImage_3.jpg';
import randomImage_4 from '../../../src/resource/image/randomImage_4.jpg';

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
  }
`;

const infiniteImages = keyframes`
      0% {
        background-image: url(${randomImage_0});
      }
      20% {
        background-image: url(${randomImage_1});
      }
      40% {
        background-image: url(${randomImage_2});
      }
      60% {
        background-image: url(${randomImage_3});
      }
      80% {
        background-image: url(${randomImage_4});
      }
      100% {
        background-image: url(${randomImage_0});
      }
    `;
export const InfiniteImages = styled.div`
  animation: ${infiniteImages} 30s infinite ease-in-out forwards;
  width: 240px;
  height: 427px;

  position: absolute;
  top: 100px;
  right: 63px;
  width: 240px;
  height: 427px;
`;
