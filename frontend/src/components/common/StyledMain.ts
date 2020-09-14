import styled from 'styled-components';

export interface WidthProps {
  width?: number;
}

const StyledMain = styled.main`
  max-width: 975px;
  margin: 0 auto;
  padding: 84px 20px 0;

  padding: ${({ width }: WidthProps) =>
    width !== undefined && width < 655 && '56px 0 0'};

  max-width: ${({ width }: WidthProps) =>
    width !== undefined && width < 1000 && '600px'};
`;

export default StyledMain;
