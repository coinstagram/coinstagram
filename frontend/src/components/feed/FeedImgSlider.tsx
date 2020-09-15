import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// styles
import { StyledUl } from './FeedImgSliderStyle';

// components
import Slider from 'react-slick';
import NextBtn from '../common/NextBtn';
import PrevBtn from '../common/PrevBtn';

function FeedImgSlider() {
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

export default FeedImgSlider;
