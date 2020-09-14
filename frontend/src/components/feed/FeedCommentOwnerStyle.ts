import styled from 'styled-components';

export const StyledDiv = styled.div`
  position: relative;
  padding-left: ${props => props.thumbnail && 50};

  .owner-comment {
    display: inline-block;
    margin-right: 5px;
    dd {
      display: inline-block;
      span {
        font-weight: bold;
        outline: none;

        &:active {
          color: rgb(142, 142, 142);
        }
      }
      .thumbnail {
        position: absolute;
        top: -2px;
        left: 0;
      }
    }
  }

  time {
    display: block;
    font-size: 12px;
    color: rgb(142, 142, 142);
    margin-top: 15px;
  }
`;
