import styled from 'styled-components';

export const StyledDiv = styled.div`
  width: 650px;
  background-color: #ffffff;
  padding: 50px;
  border: 1px solid #dbdbdb;
  margin: 0 auto;
  article {
    margin: 0 auto;
    width: 100%;
    .top {
      display: flex;
      .profileImg {
        width: 130px;
        text-align: right;
        margin-left: 10px;
        margin-right: 50px;
      }
      .changeProfile {
        display: flex;
        flex-flow: column;
        font-size: 1.1rem;
        width: 355px;
        margin-bottom: 10px;
        .thumbnail-click {
          font-size: 1.2rem;
        }
        button {
          color: #0095f6;
          font-weight: bold;
          text-align: left;
          outline: none;
        }
      }
    }
    [class*='Wrapper'] {
      margin: 10px;
      display: flex;
      textarea {
        height: 60px;
        width: 355px;
      }
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
      [class*='Input'] {
        display: flex;
        flex-flow: column;
        small {
          color: #8e8e8e;
          width: 355px;
        }
      }
    }
  }
`;
