import styled from 'styled-components';

export const StyledH1 = styled.h1`
  font-size: ${props => (props.width > 400 ? 33 : 22)};
  font-weight: 500;

  &:active {
    color: rgb(142, 142, 142);
  }
`;
