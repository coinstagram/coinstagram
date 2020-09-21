import { css } from 'styled-components';

const borderStyle = (offset: number) => css`
  .thumbnail {
    position: relative;
    border: 2px solid rgb(255, 255, 255);
  }

  .thumbnail::before {
    content: '';
    position: absolute;
    top: ${-offset}px;
    bottom: ${-offset}px;
    left: ${-offset}px;
    right: ${-offset}px;
    z-index: -1;
    border-radius: 50%;
    background: linear-gradient(to bottom left, rgb(174, 0, 255), rgb(255, 132, 66));

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    animation: fadeIn 1s;
  }

  &.selected .thumbnail::before {
    background: linear-gradient(to bottom left, rgb(174, 0, 255), rgba(255, 255, 255));

    transition: transform 4s;
    transform: rotate(720deg);
  }
`;

export function rotate({ currentTarget }: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  currentTarget.classList.toggle('selected');
}

export default borderStyle;
