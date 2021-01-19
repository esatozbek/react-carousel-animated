import React from "react";
import { useSpring, animated, config } from "react-spring";

const Shadow = ({ show }) => {
  const shadowOpacity = useSpring({
    opacity: show ? 1 : 0,
    config: config.wobbly,
  });

  return (
    <animated.div
      className={`carousel__container--shadow`}
      style={shadowOpacity}
    ></animated.div>
  );
};

export default Shadow;
