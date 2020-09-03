import { createGlobalStyle, css } from 'styled-components';

interface ModalGlobalStyleProps {
  modal: boolean;
}

const ModalGlobalStyle = createGlobalStyle`
  body {
    ${(props: ModalGlobalStyleProps) =>
      props.modal &&
      css`
        height: 100vh;
        overflow-y: hidden;
      `}
  }
`;

export default ModalGlobalStyle;
