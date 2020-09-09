import styled from 'styled-components';

export interface ContentProps {
  content?: string;
}
export const StyledButton = styled.button`
  display: block;
  background: #b2dffc;
  color: white;
  font-weight: bold;
  text-align: center;
  width: 100%;
  height: 30px;
  border-radius: 3px;
`;
