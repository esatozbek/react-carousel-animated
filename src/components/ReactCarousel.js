import React, { useRef } from "react";
import CarouselImage from "./CarouselImage";
import useResizeHandler from "../hooks/useResizeHandler";
import useCycleIndex from "../hooks/useCycleIndex";

import "../styles/ReactCarousel.style.scss";

const ReactCarousel = ({ images, springConfig }) => {
    const containerRef = useRef(null);
    const [containerWidth] = useResizeHandler(containerRef);
    const { index: selectedIndex, next, prev } = useCycleIndex(images.length);

    const handleNext = () => {
        next();
    };

    const handlePrev = () => {
        prev();
    };

    return (
        <div className="container">
            <div className="carousel">
                <div className="background" />
                <button className="btn btn-border carousel__prev" onClick={handlePrev}>
                    PREV
                </button>
                <div className="carousel__container" ref={containerRef} on>
                    {containerWidth
                        ? images.map((img, index) => (
                              <CarouselImage
                                  key={index}
                                  image={img}
                                  index={index}
                                  selectedItemIndex={selectedIndex}
                                  containerWidth={containerWidth}
                                  springConfig={springConfig}
                              />
                          ))
                        : null}
                </div>
                <button className="btn btn-border carousel__next" onClick={handleNext}>
                    NEXT
                </button>
            </div>
            <div className="carousel__container--index">
                {images.map((_, index) => (
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
