import React from 'react';
import styled from 'styled-components';
import fatalError from '../resource/image/fatalError.jpg';
import { Link } from 'react-router-dom';
import useWindowWidth from '../hooks/useWindowWidth';

const StyledBody = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
`;
const StyledDiv = styled.div`
  margin: auto;

  img {
    width: 350px;
    height: 350px;
    margin: auto;
    display: block;
    /* width: ${props => props.width < 750 && props.width}px; */
  }
`;
const TextWrapper = styled.div`
  text-align: center;
  p {
    color: #4d4d4d;
  }
  button {
    all: unset;
    background: #0095f6;
    color: white;
    padding: 10px;
    border: 1px solid white;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
  }
  span {
    display: ${props => props.width < 750 && 'block'};
  }
`;
const StyledH1 = styled.h1`
  color: #383838;
  font-size: ${props => (props.width >= 750 ? 2.8 : 2)}rem;
  strong {
    color: #f7003f;
  }
`;

function StyledFatalError() {
  const width = useWindowWidth();
  return (
    <StyledBody width={width}>
      <StyledDiv width={width}>
        <img src={fatalError} alt="fatalError"></img>
        <TextWrapper width={width}>
          <StyledH1 width={width}>
            <strong>페이지 오류</strong>안내
          </StyledH1>
          <p>
            <div>서비스 이용에 불편을 드려 죄송합니다.</div>
            <div>이용 도중 에러가 발생하였습니다.</div>
            <div>다시 시도하여 주시기 바랍니다.</div>
          </p>
          <Link to={'/'}>
            <button>메인으로</button>
          </Link>
        </TextWrapper>
      </StyledDiv>
    </StyledBody>
  );
}

export default StyledFatalError;
