import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  position: relative;
  padding-left: ${props => props.thumbnail && 50};
  ${props =>
    !props.thumbnail &&
    css`
      /* height: 22px; */
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `}

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

  .owner-context {
    border-radius: 5px;
    padding: 3px;
  }

  time {
    display: block;
    font-size: 12px;
    color: rgb(142, 142, 142);
    margin-top: 15px;
  }
`;

export const StyledTagDiv = styled.div`
  color: rgb(51, 154, 240);

  a:hover {
    color: rgb(77, 171, 247);
  }
  a:active {
    color: rgb(34, 139, 230);
  }

  a + a {
    margin-left: 10px;
  }
`;

export const StyledEmptyDiv = styled.div`
  height: 20px;
`;