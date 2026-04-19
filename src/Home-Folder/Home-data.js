const homeSliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 880,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 620,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 440,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export { homeSliderSettings };
