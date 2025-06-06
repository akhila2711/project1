// SliderComponent.jsx
import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";

const images = [
  {
    url: "",
    caption: "Welcome to our site",
  },
  {
    url: "https://via.placeholder.com/1200x400?text=Slide+2",
    caption: "Explore our projects",
  },
  {
    url: "https://via.placeholder.com/1200x400?text=Slide+3",
    caption: "Contact us today",
  },
];

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "1200px", margin: "auto", mt: 4 }}>
      <Slider {...settings}>
        {images.map((item, index) => (
          <Box key={index} sx={{ position: "relative" }}>
            <img
              src={item.url}
              alt={`slide-${index}`}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
            <Typography
              variant="h4"
              sx={{
                position: "absolute",
                bottom: 20,
                left: 30,
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "8px 16px",
                borderRadius: "4px",
              }}
            >
              {item.caption}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default SliderComponent;
