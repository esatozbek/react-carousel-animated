import React, { useRef, useCallback, useState, useLayoutEffect } from "react";
import { useSpring, animated } from "react-spring";
import useResizeHandler from "./useResizeHandler";
import { getPosition } from "./utils";
import {
    rotateY,
    translateX,
    translateY,
    zIndex,
    left,
    top,
    brightness,
} from "./constants";

const CarouselImage = ({ image, index, selectedItemIndex, containerWidth }) => {
    const imageRef = useRef(null);
    const [position, setPosition] = useState({});
    const [imageWidth] = useResizeHandler(imageRef);

    const getSpringPosition = useCallback(() => {
        const position = getPosition(index, selectedItemIndex);
        const indexDiff = selectedItemIndex - index;

        return {
            transform: `${rotateY[position]} ${translateX[position]} ${translateY[position]}`,
            zIndex: zIndex[position],
            left: left[position](containerWidth, indexDiff, imageWidth),
            top: top[position],
            filter: brightness[position],
        };
    }, [containerWidth, imageWidth, index, selectedItemIndex]);

    useLayoutEffect(() => {
        setPosition(
            getSpringPosition(index, selectedItemIndex, imageWidth, containerWidth)
        );
    }, [containerWidth, selectedItemIndex, index, imageWidth, getSpringPosition]);

    const props = useSpring({
        ...position,
        config: {
            mass: 2,
            tension: 170,
            friction: 26,
            clamp: false,
            precision: 0.001,
        },
    });

    return (
        <animated.div
            className={`carousel__container--img ${
                index === selectedItemIndex && "selected"
            }`}
            style={props}
            key={image.id}
            ref={imageRef}
        >
            <img alt="" src={image.href} />
        </animated.div>
    );
};

export default CarouselImage;
