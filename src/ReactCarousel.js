import React, { useState } from "react";
import CarouselImage from "./CarouselImage";
import Shadow from "./Shadow";
import images from "./images";

import "./ReactCarousel.style.scss";

const ReactCarousel = (props) => {
  const [selectedImg, setSelectedImg] = useState(0);
  const [shadow, setShadow] = useState(true);

  const getPrevIndex = (index) => {
    let prev = index - 1;
    if (prev < 0) prev = -1;
    return prev;
  };

  const getNextIndex = (index) => {
    let next = index + 1;
    if (next >= images.length) next = -1;
    return next;
  };

  const getPosition = (index) => {
    let turn = index < selectedImg ? "before" : "after";
    if (getPrevIndex(selectedImg) === index) {
      turn = "left";
    } else if (selectedImg === index) {
      turn = "selected";
    } else if (getNextIndex(selectedImg) === index) {
      turn = "right";
    }
    return turn;
  };

  const effectShadow = () => {
    setShadow(false);
    setTimeout(() => setShadow(true), 500);
  };

  const handlePrev = async () => {
    effectShadow();
    const prevIndex = getPrevIndex(selectedImg);
    if (prevIndex < 0) {
      console.log("asd");
      for (let i = 0; i < images.length; i++) {
        await Promise.resolve((resolve) => setTimeout(resolve, 1500));
        setSelectedImg(i);
      }
    } else {
      setSelectedImg(prevIndex);
    }
  };

  const handleNext = () => {
    effectShadow();
    const nextIndex = getNextIndex(selectedImg);
    if (nextIndex < 0) setSelectedImg(0);
    else setSelectedImg(nextIndex);
  };

  return (
    <div className="carousel">
      <button className="btn btn-border carousel__prev" onClick={handlePrev}>
        PREV
      </button>
      <div className="carousel__container">
        {images.map((img, index) => (
          <CarouselImage
            key={img.id}
            image={img}
            position={getPosition(index)}
            index={index}
            currentIndex={selectedImg}
          />
        ))}

        <Shadow show={shadow} />
      </div>
      <button className="btn btn-border carousel__next" onClick={handleNext}>
        NEXT
      </button>
      <div className="carousel__container--index">
        {images.map((_, index) => (
          <span
            key={`${index}dot`}
            className={`${index === selectedImg && "selected"}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ReactCarousel;
