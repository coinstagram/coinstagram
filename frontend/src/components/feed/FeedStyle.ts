import styled from 'styled-components';

export const StyledArticle = styled.article`
  border: 1px solid rgb(219, 219, 219);
  border-radius: 3px;

  & + & {
    margin-top: 60px;
  }
`;
