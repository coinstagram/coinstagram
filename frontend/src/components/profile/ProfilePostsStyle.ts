import styled from 'styled-components';

export const StyledSection = styled.section`
  margin-top: 45px;
  border-top: 1px solid rgb(219, 219, 219);

  .active::before {
    content: '';
    display: block;
    height: 1px;
    background-color: rgb(0, 0, 0);
  }

  div {
    text-align: center;
    ul {
      display: inline-flex;

      a {
        line-height: 52px;
      }
    }

    li + li {
      margin-left: 60px;
    }
  }
`;
