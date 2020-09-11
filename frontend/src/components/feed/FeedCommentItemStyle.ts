import styled, { css } from 'styled-components';

export const StyledLi = styled.li`
  position: relative;
  padding-right: 30px;
  padding-left: ${props => props.thumbnail && 50};
  margin-top: ${props => (props.viewTime ? 25 : 6)};

  .user-comment {
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
    display: none;
    margin-top: 15px;
    ${props =>
      props.viewTime &&
      css`
        display: block;
        font-size: 12px;
        color: rgb(142, 142, 142);
      `}
  }

  [class^='like-'] {
    font-size: 12px;
    position: absolute;
    top: calc(50% - 6px);
    right: 5px;
    span {
      outline: none;
      ${props =>
        props.like &&
        css`
          color: rgb(250, 82, 82);
          &:hover {
            color: rgb(255, 107, 107);
          }
        `};
    }
  }
`;
