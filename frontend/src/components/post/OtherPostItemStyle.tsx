import styled from 'styled-components';

export const StyledLi = styled.li`
  position: relative;

  a::after {
    content: '';
    display: none;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  a:hover::after {
    display: block;
  }

  img {
    width: 100%;
    height: auto;
    max-width: 309px;
  }
`;
