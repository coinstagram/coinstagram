import styled from 'styled-components';

export const StyledArticle = styled.article`
  margin: 0 auto;
  padding: 0 0 50px 50px;
  width: 100%;
  [class*='Wrapper'] {
    margin: 10px;
    display: flex;
    button[type='submit'] {
      background: #b2dffc;
      color: white;
      font-weight: bold;
      text-align: center;
      border-radius: 3px;
      padding: 3px 10px;
    }
    .label {
      width: 130px;
      text-align: right;
      margin-right: 50px;
      font-size: 1.2rem;
      font-weight: bold;
      label {
        padding-top: 0;
        box-sizing: border-box;
        white-space: nowrap;
      }
    }
    input {
      width: 355px;
      height: 32px;
      margin-bottom: 10px;
      padding-left: 10px;
    }
`;
