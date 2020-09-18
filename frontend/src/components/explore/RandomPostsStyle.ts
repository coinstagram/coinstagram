import styled from 'styled-components';

export const StyledSection = styled.section`
  ul {
    li {
      display: inline-block;
      margin-top: 22px;
      margin-right: 24px;
    }

    li:nth-of-type(1) {
      margin-top: 0;
    }

    li:nth-of-type(3n + 6) {
      margin-right: 0;
    }

    li:nth-of-type(9n + 2) {
      float: right;
      margin-top: 0;
      margin-right: 0;
      img {
        max-width: 640px;
        width: 100%;
      }
    }
  }
`;
