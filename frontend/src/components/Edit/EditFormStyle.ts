import styled from 'styled-components';

export const StyledDiv = styled.div`
  display: flex;
  width: 933px;
  background-color: #ffffff;
  border: 1px solid #dbdbdb;
  margin: 0 auto;

  nav {
    border-right: 1px solid #dbdbdb;
    font-size: 1.2rem;
    ul {
      width: 236px;
      li {
        cursor: pointer;
        text-align: left;
        height: 20px;
        padding: 20px;
        position: relative;
        .active {
          font-weight: bold;
          ::before {
            content: '';
            display: block;
            background: black;
            width: 2px;
            height: 60px;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
        &:hover {
          background: #f8f9fa;
          ::before {
            content: '';
            display: block;
            background: #dbdbdb;
            width: 2px;
            height: 60px;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }
    }
  }
  .wrapper {
    display: flex;
    flex-flow: column;
    header {
      display: flex;
      width: 100%;
      padding-top: 50px;
      padding-left: 50px;
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
        outline: none;
        .thumbnail-click {
          font-size: 1.2rem;
        }
        label {
          color: #0095f6;
          font-weight: bold;
          text-align: left;
          cursor: pointer;
          /* outline: none; */
          width: 121px;
        }
        input {
          /* outline: none; */
        }
      }
    }
  }
`;
