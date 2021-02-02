import React, { useState, useRef } from "react";
import CarouselImage from "./CarouselImage";
import Shadow from "./Shadow";
import images from "./images";
import useResizeHandler from "./useResizeHandler";
import useCycleIndex from "./useCycleIndex";

import "./ReactCarousel.style.scss";

const ReactCarousel = (props) => {
    const [shadow, setShadow] = useState(true);
    const containerRef = useRef(null);
    const [containerWidth] = useResizeHandler(containerRef);
    const { index: selectedIndex, next, prev } = useCycleIndex(images.length);

    const handleNext = () => {
        next();
    };

    const handlePrev = () => {
        prev();
    };

    // const getPrevIndex = (index) => {
    //     let prev = index - 1;
    //     if (prev < 0) prev = -1;
    //     return prev;
    // };

    // const getNextIndex = (index) => {
    //     let next = index + 1;
    //     if (next >= images.length) next = -1;
    //     return next;
    // };

    const effectShadow = () => {
        setShadow(false);
        setTimeout(() => setShadow(true), 500);
    };

    // const handlePrev = () => {
    //     effectShadow();
    //     const prevIndex = getPrevIndex(selectedImg);
    //     if (prevIndex < 0) {
    //         for (let i = 0; i < images.length; i++) {
    //             setSelectedImg(i);
    //         }
    //     } else {
    //         setSelectedImg(prevIndex);
    //     }
    // };

    // const handleNext = () => {
    //     effectShadow();
    //     const nextIndex = getNextIndex(selectedImg);
    //     if (nextIndex < 0) setSelectedImg(0);
    //     else setSelectedImg(nextIndex);
    // };

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
                                  key={img.id}
                                  image={img}
                                  index={index}
                                  selectedItemIndex={selectedIndex}
                                  containerWidth={containerWidth}
                              />
                          ))
                        : null}

                    {/* <Shadow show={shadow} /> */}
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
