import React, { useRef } from "react";
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
    carouselHeight,
    prevButtonText,
    nextButtonText,
    animationFlags,
    showIndices,
}) => {
    const containerRef = useRef(null);
    const [containerWidth] = useResizeHandler(containerRef);
    const { index: selectedIndex, next, prev } = useCycleIndex(children.length);

    const handleNext = () => {
        next();
    };

    const handlePrev = () => {
        prev();
    };

    return (
        <div className="carousel" style={{ ...containerStyle }}>
            <div className="background" style={{ ...containerBackgroundStyle }} />
            <div className="carousel__prev" onClick={handlePrev} data-testid="prev">
                {prevButtonText}
            </div>
            <div
                className="carousel__container"
                ref={containerRef}
                style={{ height: carouselHeight }}
            >
                {containerWidth
                    ? children.map((element, index) => (
                          <CarouselItem
                              key={index}
                              index={index}
                              selectedItemIndex={selectedIndex}
                              containerWidth={containerWidth}
                              springConfig={springConfig}
                              itemBackgroundStyle={itemBackgroundStyle}
                              animationFlags={animationFlags}
                              carouselConfig={carouselConfig}
                          >
                              {element}
                          </CarouselItem>
                      ))
                    : null}
            </div>
            <div className="carousel__next" onClick={handleNext} data-testid="next">
                {nextButtonText}
            </div>
            {showIndices && (
                <div className="carousel__container--index">
                    {children.map((_, index) => (
                        <span
                            key={`${index}dot`}
                            className={`${index === selectedIndex && "selected"}`}
                        ></span>
                    ))}
                </div>
            )}
        </div>
    );
};

export { CarouselItem };

export default ReactCarousel;
