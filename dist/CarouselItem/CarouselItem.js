function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useRef, useCallback, useState, useLayoutEffect, Children } from "react";
import { useSpring, animated } from "react-spring";
import useResizeHandler from "../../hooks/useResizeHandler";
import { getPositionName } from "../../utils/animationUtils";
import { getSpringConfig } from "../../animation/animationConfig";
import CarouselAnimation from "../../animation/CarouselAnimation";

const CarouselItem = ({
  children,
  index,
  selectedItemIndex,
  containerWidth,
  containerHeight,
  springConfig,
  itemBackgroundStyle,
  maxWidth,
  maxHeight,
  carouselConfig
}) => {
  const imageRef = useRef(null);
  const [position, setPosition] = useState({});
  const [imageWidth] = useResizeHandler(imageRef);
  const carouselAnimation = useRef(new CarouselAnimation(carouselConfig));
  const getSpringPosition = useCallback(() => {
    const positionName = getPositionName(index, selectedItemIndex);
    const indexDiff = selectedItemIndex - index;
    return carouselAnimation.current.getValues(positionName, containerWidth, indexDiff, imageWidth);
  }, [containerWidth, imageWidth, index, selectedItemIndex]);
  useLayoutEffect(() => {
    setPosition(getSpringPosition(index, selectedItemIndex, imageWidth, containerWidth));
  }, [containerWidth, selectedItemIndex, index, imageWidth, getSpringPosition]);
  const animationProps = useSpring({ ...position,
    config: getSpringConfig(springConfig)
  });
  const Element = Children.only(children);
  const {
    type: ElementType
  } = Element;
  return /*#__PURE__*/React.createElement(animated.div, {
    className: "carousel__container--item",
    style: { ...animationProps,
      ...itemBackgroundStyle
    },
    ref: imageRef,
    "data-testid": "container"
  }, /*#__PURE__*/React.createElement(ElementType, _extends({}, Element.props, {
    style: { ...Element.props.style,
      maxWidth,
      maxHeight
    }
  })));
};

export default CarouselItem;