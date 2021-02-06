import React, { useRef, useCallback } from "react";
import CarouselImage from "./CarouselImage";
import useResizeHandler from "../hooks/useResizeHandler";
import useCycleIndex from "../hooks/useCycleIndex";

import "../styles/ReactCarousel.style.scss";

const ReactCarousel = ({
    images,
    springConfig,
    containerStyle,
    containerBackgroundStyle,
    imageBackgroundStyle,
    imageStyle,
    itemMaxWidth,
    itemMaxHeight,
    prevButtonText,
    nextButtonText,
}) => {
    const containerRef = useRef(null);
    const [containerWidth, containerHeight] = useResizeHandler(containerRef);
    const { index: selectedIndex, next, prev } = useCycleIndex(images.length);

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
        <div className="container">
            <div className="carousel">
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
                    style={{ height: calculateMaxHeight(), ...containerStyle }}
                >
                    {containerWidth
                        ? images.map((img, index) => (
                              <CarouselImage
                                  key={index}
                                  image={img}
                                  index={index}
                                  selectedItemIndex={selectedIndex}
                                  containerWidth={containerWidth}
                                  containerHeight={containerHeight}
                                  springConfig={springConfig}
                                  imageBackgroundStyle={imageBackgroundStyle}
                                  imageStyle={imageStyle}
                                  maxWidth={calculateMaxWidth()}
                                  maxHeight={calculateMaxHeight()}
                              />
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
                    {images.map((_, index) => (
                        <span
                            key={`${index}dot`}
                            className={`${index === selectedIndex && "selected"}`}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReactCarousel;
