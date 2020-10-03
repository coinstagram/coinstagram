import styled from 'styled-components';

const StyledDiv = styled.div`
  border-top: 1px solid rgb(219, 219, 219);
  .hashTagList {
    display: flex;
    align-items: center;
    cursor: pointer;
    flex-wrap: wrap;
    label {
      padding: 0 10px;
      font-weight: bolder;
      background-color: rgb(255, 255, 255);
      white-space: nowrap;
    }
    .hashTagItem {
      color: #ffffff;
      border-radius: 10px;
      background-color: #9e65bf;
      color: white;
      padding: 3px 10px;
      margin: 0 5px;
      white-space: nowrap;
      button {
        opacity: 0;
        padding: 0 2px 0 5px;
        transition: 1s linear ease-in-out;
        &:hover {
          opacity: 1;
        }
      }
    }
    .inputTag {
      flex-grow: 1;
      input {
        width: 100%;
        height: 40px;
        padding: 10px;
        outline: none;
        border: none;
      }
    }
  }
`;
export default StyledDiv;
