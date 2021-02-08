import React from "react";
import CarouselItem from "./CarouselItem";
import images from "../../images";

function numberToPx(num) {
    return `${num}px`;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    title: "CarouselItem",
    component: CarouselItem,
    argTypes: {
        height: {
            control: {
                type: "range",
                min: 0,
                max: 1000,
            },
        },
        width: {
            control: {
                type: "range",
                min: 0,
                max: 1000,
            },
        },
    },
};

export const Image = ({ height, width }) => {
    const heightPx = numberToPx(height);

    return (
        <div
            style={{
                position: "relative",
                height: heightPx,
            }}
        >
            <CarouselItem index={0} selectedItemIndex={0} containerWidth={width || 0}>
                <img src={images[0][0].src} alt="test" />
            </CarouselItem>
        </div>
    );
};

export const ImageLeft = () => {
    return (
        <div style={{ position: "relative", height: "500px", width: "100%" }}>
            <CarouselItem index={0} selectedItemIndex={1} containerWidth={1500}>
                <img src={images[0][0].src} alt="test" />
            </CarouselItem>
        </div>
    );
};

export const ImageRight = () => {
    return (
        <div style={{ position: "relative", height: "500px", width: "100%" }}>
            <CarouselItem
                image={images[0]}
                index={1}
                selectedItemIndex={0}
                containerWidth={1500}
            >
                <img src={images[0][0].src} alt="test" />
            </CarouselItem>
        </div>
    );
};
