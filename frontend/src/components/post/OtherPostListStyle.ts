import styled from 'styled-components';

export const StyledDiv = styled.div`
  margin-top: 20px;

  ul {
    display: flex;
    flex-flow: row wrap;

    li {
      margin-bottom: ${props => (props.width < 1000 ? 3 : 24)};
    }

    li + li {
      margin-left: ${props => (props.width < 1000 ? 3 : 24)};
    }

    li:nth-of-type(3n + 4) {
      margin-left: 0;
    }
  }
`;
