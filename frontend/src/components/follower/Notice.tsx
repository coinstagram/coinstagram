import React from 'react';
import styled from 'styled-components';
import stayhome from '../../resource/image/stayhome.png';

const StyledSection = styled.section`
  padding: ${props => (props.width > 1030 ? '16px 40px 10px 33px' : '16px 10px 10px 10px')};
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(219, 219, 219);
  text-align: center;
  color: rgb(50, 50, 50);
  margin-left: 10px;
  img {
    width: 100px;
    height: auto;
  }
  .nextYear {
    font-weight: bold;
  }
  .stayHome {
    border-radius: 10px;
    background-color: #afc9eb;
    color: white;
    padding: 3px 10px;
  }
`;

export default function Notice() {
  return (
    <StyledSection>
      <img src={stayhome} alt="stayhome" />
      <div className="nextYear">다음 추석에 건강하게 만나요</div>
      <span>명절에도 사회적 거리두기 실천</span> <span className="stayHome">#stayhome</span>
    </StyledSection>
  );
}
