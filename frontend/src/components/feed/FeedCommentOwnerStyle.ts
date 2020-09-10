import styled from 'styled-components';

export const StyledDiv = styled.div`
  display: flex;
  align-items: center;

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
`;
