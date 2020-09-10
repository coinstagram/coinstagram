import styled from 'styled-components';

export const StyledDiv = styled.div`
  margin: 5px 0;

  li {
    display: flex;

    span {
      font-weight: bold;
      outline: none;
      align-self: end;

      &:hover {
        color: rgb(142, 142, 142);
      }
    }

    p {
      line-height: 15px;
      margin: 0 0 0 5px;
    }
  }

  li + li {
    margin-top: 5px;
  }
`;
