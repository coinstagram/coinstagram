import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// styles
import { StyledUl } from './FeedImgSliderStyle';

// components
import Slider from 'react-slick';
import NextBtn from '../common/NextBtn';
import PrevBtn from '../common/PrevBtn';

interface FeedImgSliderProps {
  imageUrl: string[];
}

const FeedImgSlider: React.FC<FeedImgSliderProps> = ({
  imageUrl,
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
        {imageUrl.map(image => (
          <li key={image}>
            <img src={`http://localhost:4000/${image}`} alt="이미지1" />
          </li>
        ))}
        {children}
      </Slider>
    </StyledUl>
  );
};

export default FeedImgSlider;
