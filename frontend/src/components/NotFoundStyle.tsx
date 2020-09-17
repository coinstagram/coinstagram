import React from 'react';
import styled from 'styled-components';
import notFound from '../resource/image/notFound.gif';
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
  margin-top: 0;
  img {
    margin: auto;
    display: block;
  }
`;
const TextWrapper = styled.div`
  text-align: center;
  p {
    color: #707070;
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
`;
const StyledH1 = styled.h1`
  color: #383838;
  font-size: 2.8rem;
  strong {
    color: #ef7b7d;
  }
`;

function StyledNotFound() {
  const width = useWindowWidth();
  return (
    <StyledBody width={width}>
      <StyledDiv>
        <img src={notFound} alt="notFound"></img>
        <TextWrapper>
          <StyledH1>
            요청하신 페이지를 <strong>찾을 수 없습니다.</strong>
          </StyledH1>
          <p>
            <div>서비스 이용에 불편을 드려 죄송합니다.</div>
            <div>
              잘못된 주소를 입력하셨거나 요청하신 페이지의 주소가 존재하지
              않습니다.
            </div>
            <div>다시 한 번 주소가 정확한지 확인해주시기 바랍니다.</div>
          </p>
          <Link to={'/'}>
            <button>메인으로</button>
          </Link>
        </TextWrapper>
      </StyledDiv>
    </StyledBody>
  );
}

export default StyledNotFound;
