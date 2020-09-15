import styled from 'styled-components';

export const StyledSection = styled.section`
  background-color: skyblue;
  display: flex;

  .thumbnail-container {
    width: 300px;
    text-align: center;

    label {
      cursor: pointer;
    }
  }

  .info-container {
    margin-left: 30px ;
    div:nth-of-type(1) > dd {
      font-size: 28px;
      font-weight: 100;
    }
`;
