import styled from 'styled-components';

export const StyledUl = styled.ul`
  li {
    display: inline-block;
    position: relative;
    width: 100%;
    padding-bottom: 100%;
  }

  img {
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  .next-btn,
  .prev-btn {
    top: calc(50% - 16px);
  }

  .slick-slide {
    height: inherit;
  }

  .slick-dots {
    position: absolute;
    bottom: 5px;

    li {
      width: 12px;
      height: 12px;
      margin: 1px;
      padding-bottom: 0;

      button {
        width: 12px;
        height: 12px;
      }

      button::before {
        width: 12px;
        height: 12px;
        color: rgb(28, 126, 214);
      }
    }
  }
`;
