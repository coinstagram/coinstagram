import styled from 'styled-components';

export const StyledArticle = styled.article`
  margin: 0 auto;
  padding: 0 0 50px 50px;
  width: 100%;
  min-height : 650px;
  h3 {
    margin-left: 100px;
    margin-top:30px;
    font-size:2rem;
  }
  form {
    margin-left: 100px;
    margin-top:20px;
    border-top:1px solid #5d5d5d; 
    border-bottom:1px solid #5d5d5d; 
    font-size:1.2rem;
    padding:20px;
    padding-left:10px;
    p{
      padding:0;
    }
    button {
      background: #f7003f;
      color: white;
      font-weight: bold;
      text-align: center;
      border-radius: 3px;
      padding: 3px 10px;
      outline:none;
      margin-bottom:10px;
    }
`;
