import React, { useRef, useCallback } from "react";
import CarouselItem from "../CarouselItem/CarouselItem";
import useResizeHandler from "../../hooks/useResizeHandler";
import useCycleIndex from "../../hooks/useCycleIndex";

import "../../styles/ReactCarousel.style.scss";

const ReactCarousel = ({
    carouselConfig,
    children,
    springConfig,
    containerStyle,
    containerBackgroundStyle,
    itemBackgroundStyle,
    itemMaxWidth,
    itemMaxHeight,
    prevButtonText,
    nextButtonText,
    animationFlags,
}) => {
    const containerRef = useRef(null);
    const [containerWidth, containerHeight] = useResizeHandler(containerRef);
    const { index: selectedIndex, next, prev } = useCycleIndex(children.length);

    const handleNext = () => {
        next();
    };

    const handlePrev = () => {
        prev();
    };

    const calculateMaxWidth = useCallback(() => {
        if (typeof itemMaxWidth === "number") {
            return `${(containerWidth * itemMaxWidth) / 100}px`;
        }
        return itemMaxWidth;
    }, [containerWidth, itemMaxWidth]);

    const calculateMaxHeight = useCallback(() => {
        if (typeof itemMaxHeight === "number") {
            return `${(containerHeight * itemMaxHeight) / 100}px`;
        }
        return itemMaxHeight;
    }, [containerHeight, itemMaxHeight]);

    return (
        <div className="carousel" style={{ ...containerStyle }}>
            <div className="background" style={{ ...containerBackgroundStyle }} />
            <button
                className="btn btn-border carousel__prev"
                onClick={handlePrev}
                data-testid="prev"
            >
                {prevButtonText}
            </button>
            <div
                className="carousel__container"
                ref={containerRef}
                style={{ height: calculateMaxHeight() }}
            >
                {containerWidth
                    ? children.map((element, index) => (
                          <CarouselItem
                              key={index}
                              index={index}
                              selectedItemIndex={selectedIndex}
                              containerWidth={containerWidth}
                              containerHeight={containerHeight}
                              springConfig={springConfig}
                              itemBackgroundStyle={itemBackgroundStyle}
                              maxWidth={calculateMaxWidth()}
                              maxHeight={calculateMaxHeight()}
                              animationFlags={animationFlags}
                              carouselConfig={carouselConfig}
                          >
                              {element}
                          </CarouselItem>
                      ))
                    : null}
            </div>
            <button
                className="btn btn-border carousel__next"
                onClick={handleNext}
                data-testid="next"
            >
                {nextButtonText}
            </button>
            <div className="carousel__container--index">
                {children.map((_, index) => (
                    <span
                        key={`${index}dot`}
                        className={`${index === selectedIndex && "selected"}`}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default ReactCarousel;
