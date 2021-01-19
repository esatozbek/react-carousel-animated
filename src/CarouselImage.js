import React from "react";
import { useSpring, animated, config } from "react-spring";

const getPosition = (index, currentIndex) => {
  let transform = "rotateY(0deg) scale(1)";
  let zIndex = 0;
  if (index > currentIndex) {
    zIndex = 1;
    transform = "rotateY(-55deg) scale(1)";
  } else if (index < currentIndex) {
    zIndex = 1;
    transform = "rotateY(55deg) scale(1)";
  }
  return {
    left: `${100 * (index - currentIndex)}%`,
    transform,
    zIndex: Math.abs(currentIndex - index) > 1 ? 0 : zIndex,
    filter: `brightness(${index == currentIndex ? 1 : 0.32})`,
  };
};

const CarouselImage = ({ image, position, index, currentIndex }) => {
  const props = useSpring({
    ...getPosition(index, currentIndex),
    config: {
      mass: 2,
      tension: 170,
      friction: 26,
      clamp: false,
      precision: 0.01,
    },
  });

  return (
    <animated.div
      className={`carousel__container--img`}
      style={props}
      key={image.id}
    >
      <img src={image.href} />
    </animated.div>
  );
};

export default CarouselImage;
