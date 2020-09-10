import styled from 'styled-components';

export const StyledDiv = styled.div`
  margin: 5px 0;

  li + li {
    margin-top: 6px;
  }
  .comment-more {
    color: rgb(142, 142, 142);

    span {
      outline: none;
    }
  }
`;
