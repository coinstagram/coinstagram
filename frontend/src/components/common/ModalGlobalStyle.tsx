import { createGlobalStyle, css } from 'styled-components';

interface ModalGlobalStyleProps {
  postModal: boolean;
  followModal: boolean;
}

const ModalGlobalStyle = createGlobalStyle`
  body {
    ${(props: ModalGlobalStyleProps) =>
      props.postModal &&
      css`
        height: 100vh;
        overflow-y: hidden;
      `}

      ${(props: ModalGlobalStyleProps) =>
        props.followModal &&
        css`
          height: 100vh;
          overflow-y: hidden;
        `}
  }
`;

export default ModalGlobalStyle;
