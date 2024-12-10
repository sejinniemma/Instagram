import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 576 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 5,
  },
};

export default function ScrollableBar({ children }) {
  <Carousel
    responsive={responsive}
    containerClass='flex w-full gap-2'
    arrows
    infinite
    autoPlay
    autoPlaySpeed={3000}
  >
    {children}
  </Carousel>;
}
