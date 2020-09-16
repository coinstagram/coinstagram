import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// styles
import { StyledUl } from './FeedImgSliderStyle';

// components
import Slider from 'react-slick';
import NextBtn from '../common/NextBtn';
import PrevBtn from '../common/PrevBtn';
import { RiCreativeCommonsZeroLine } from 'react-icons/ri';

interface FeedImgSliderProps {
  imageURL?: Array<String>;
}

const FeedImgSlider: React.FC<FeedImgSliderProps> = ({
  imageURL,
  children,
}) => {
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
        {imageURL.map(image => (
          <li>
            <img
              src={`http://localhost:4000/${image}`}
              alt="이미지1"
              width="100%"
              max-width="612px"
            />
          </li>
        ))}
        {children}
      </Slider>
    </StyledUl>
  );
};

export default FeedImgSlider;
