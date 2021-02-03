import React from "react";
import CarouselImage from "./CarouselImage";
import images from "../images";

function numberToPx(num) {
    return `${num}px`;
}

function numberToPercent(num) {
    return `${num}%`;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    title: "CarouselImage",
    component: CarouselImage,
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
            <CarouselImage
                image={images[0]}
                index={0}
                selectedItemIndex={0}
                containerWidth={width || 0}
            />
        </div>
    );
};

export const ImageLeft = () => {
    return (
        <div style={{ position: "relative", height: "500px", width: "100%" }}>
            <CarouselImage
                image={images[0]}
                index={0}
                selectedItemIndex={1}
                containerWidth={1500}
            />
        </div>
    );
};

export const ImageRight = () => {
    return (
        <div style={{ position: "relative", height: "500px", width: "100%" }}>
            <CarouselImage
                image={images[0]}
                index={1}
                selectedItemIndex={0}
                containerWidth={1500}
            />
        </div>
    );
};
