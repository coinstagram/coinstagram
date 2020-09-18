import styled from 'styled-components';

export const StyledDiv = styled.div`
  position: relative;
  div {
    position: absolute;
    top: 0;
    left: -20px;
    width: 1px;
    height: 1px;

    div {
      position: absolute;
      width: 2px;
      height: 7px;
    }
    div:nth-child(1) {
      top: ${props => (props.isRecommend ? 15 : 7)};
      left: 0;
    }
    div:nth-child(2) {
      top: 5px;
      left: 5px;
    }
    div:nth-child(3) {
      top: 0px;
      left: 7px;
    }
    div:nth-child(4) {
      top: -5px;
      left: 5px;
    }
    div:nth-child(5) {
      top: -7px;
      left: 0px;
    }
    div:nth-child(6) {
      top: -5px;
      left: -5px;
    }
    div:nth-child(7) {
      top: 0px;
      left: -7px;
    }
    div:nth-child(8) {
      top: 5px;
      left: -5px;
    }
  }
`;
