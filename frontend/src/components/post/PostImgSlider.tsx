import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// components
import NextBtn from '../../styles/NextBtn';
import PrevBtn from '../../styles/PrevBtn';

const StyledUl = styled.ul`
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

      button {
        width: 12px;
        height: 12px;
      }

      button::before {
        width: 12px;
        height: 12px;
        color: rgb(168, 168, 168);
      }
    }

    li.slick-active button::before {
      color: rgba(255, 255, 255, 0.8);
      opacity: 1;
    }
  }
`;

function PostImgSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
  };

  return (
    <StyledUl>
      <Slider {...settings}>
        <li>
          <img
            src="https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/118651012_324211452153674_4587082957673507116_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=ZNbhSdEzUqoAX8iUR_K&oh=318c4c48fb0fee05502582c8100d710d&oe=5F7B6BE7"
            alt="이미지1"
            width="100%"
            max-width="612px"
          />
        </li>
        <li>
          <img
            src="https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/118651012_324211452153674_4587082957673507116_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=ZNbhSdEzUqoAX8iUR_K&oh=318c4c48fb0fee05502582c8100d710d&oe=5F7B6BE7"
            alt="이미지1"
            width="100%"
            max-width="612px"
          />
        </li>
        <li>
          <img
            src="https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/118651012_324211452153674_4587082957673507116_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=ZNbhSdEzUqoAX8iUR_K&oh=318c4c48fb0fee05502582c8100d710d&oe=5F7B6BE7"
            alt="이미지1"
            width="100%"
            max-width="612px"
          />
        </li>
        <li>
          <img
            src="https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/118651012_324211452153674_4587082957673507116_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=ZNbhSdEzUqoAX8iUR_K&oh=318c4c48fb0fee05502582c8100d710d&oe=5F7B6BE7"
            alt="이미지1"
            width="100%"
            max-width="612px"
          />
        </li>
      </Slider>
    </StyledUl>
  );
}

export default PostImgSlider;
