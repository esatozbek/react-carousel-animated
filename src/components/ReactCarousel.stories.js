import React from "react";
import ReactCarousel from "./ReactCarousel";
import images from "../images";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    title: "ReactCarousel",
    component: ReactCarousel,
    argTypes: {
        springConfig: {
            control: {
                type: "select",
                options: ["default", "gentle", "wobbly", "stiff", "slow", "molasses"],
            },
        },
        imagesIndex: {
            control: {
                type: "range",
                min: 0,
                max: 10,
            },
        },
    },
};

export const Carousel = ({ springConfig, imagesIndex }) => {
    return (
        <ReactCarousel images={images[imagesIndex || 0]} springConfig={springConfig} />
    );
};

export const CarouselInDiv = ({ springConfig, imagesIndex }) => {
    return (
        <div style={{ width: "1250px" }}>
            <ReactCarousel
                images={images[imagesIndex || 0]}
                springConfig={springConfig}
            />
        </div>
    );
};
