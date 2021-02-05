import React, { useRef, useCallback, useState, useLayoutEffect } from "react";
import { useSpring, animated } from "react-spring";
import useResizeHandler from "../hooks/useResizeHandler";
import { getPositionName } from "../utils/utils";
import {
    rotateY,
    translateX,
    translateY,
    zIndex,
    left,
    top,
    brightness,
    getSpringConfig,
} from "../animation/animationProperties";

const CarouselImage = ({
    image,
    index,
    selectedItemIndex,
    containerWidth,
    containerHeight,
    springConfig,
    imageBackgroundStyle,
    imageStyle,
    maxWidth,
    maxHeight,
}) => {
    const imageRef = useRef(null);
    const [position, setPosition] = useState({});
    const [imageWidth] = useResizeHandler(imageRef);

    const getSpringPosition = useCallback(() => {
        const positionName = getPositionName(index, selectedItemIndex);
        const indexDiff = selectedItemIndex - index;

        return {
            transform: `${rotateY[positionName]} ${translateX[positionName]} ${translateY[positionName]}`,
            zIndex: zIndex[positionName],
            left: left[positionName](containerWidth, indexDiff, imageWidth),
            top: top[positionName],
            filter: brightness[positionName],
        };
    }, [containerWidth, imageWidth, index, selectedItemIndex]);

    useLayoutEffect(() => {
        setPosition(
            getSpringPosition(index, selectedItemIndex, imageWidth, containerWidth)
        );
    }, [containerWidth, selectedItemIndex, index, imageWidth, getSpringPosition]);

    const animationProps = useSpring({
        ...position,
        config: getSpringConfig(springConfig),
    });

    return (
        <animated.div
            className={"carousel__container--img"}
            style={{ ...animationProps, ...imageBackgroundStyle }}
            key={image.id}
            ref={imageRef}
            data-testid="container"
        >
            <img
                alt=""
                src={image.href}
                style={{
                    maxWidth,
                    maxHeight,
                    ...imageStyle,
                }}
            />
        </animated.div>
    );
};

export default CarouselImage;
