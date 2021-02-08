import React, { useRef, useCallback, useState, useLayoutEffect, Children } from "react";
import { useSpring, animated } from "react-spring";
import useResizeHandler from "../../hooks/useResizeHandler";
import { getPositionName } from "../../utils/utils";
import {
    rotateY,
    translateX,
    translateY,
    zIndex,
    left,
    top,
    brightness,
} from "../../animation/animationProperties";
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
}) => {
    const imageRef = useRef(null);
    const [position, setPosition] = useState({});
    const [imageWidth] = useResizeHandler(imageRef);
    const carouselAnimation = useRef(new CarouselAnimation());

    const getSpringPosition = useCallback(() => {
        const positionName = getPositionName(index, selectedItemIndex);
        const indexDiff = selectedItemIndex - index;

        return carouselAnimation.current.getValues(
            positionName,
            containerWidth,
            indexDiff,
            imageWidth
        );
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

    const Element = Children.only(children);
    const { type: ElementType } = Element;

    return (
        <animated.div
            className={"carousel__container--img"}
            style={{ ...animationProps, ...itemBackgroundStyle }}
            ref={imageRef}
            data-testid="container"
        >
            <ElementType
                {...Element.props}
                style={{
                    ...Element.props.style,
                    maxWidth,
                    maxHeight,
                }}
            />
        </animated.div>
    );
};

export default CarouselItem;
