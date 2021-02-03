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
        width: {
            control: {
                type: "range",
                min: 0,
                max: 2000,
            },
        },
        itemMaxWidth: {
            control: {
                type: "range",
                min: 0,
                max: 100,
            },
        },
        itemMaxHeight: {
            control: {
                type: "range",
                min: 0,
                max: 1000,
            },
        },
    },
};

export const Carousel = ({ springConfig, imagesIndex }) => {
    return (
        <ReactCarousel images={images[imagesIndex || 0]} springConfig={springConfig} />
    );
};

export const CarouselInDiv = ({
    springConfig,
    imagesIndex,
    width,
    itemMaxWidth,
    itemMaxHeight,
}) => {
    return (
        <div style={{ width }}>
            <ReactCarousel
                images={images[imagesIndex || 0]}
                springConfig={springConfig}
                itemMaxWidth={itemMaxWidth || 50}
                itemMaxHeight={`${itemMaxHeight || 500}px`}
            />
        </div>
    );
};

export const CarouselWithStyle = ({
    springConfig,
    imagesIndex,
    width,
    itemMaxWidth,
    itemMaxHeight,
}) => {
    return (
        <div style={{ width }}>
            <ReactCarousel
                images={images[imagesIndex || 0]}
                springConfig={springConfig}
                imageStyle={{
                    borderRadius: "20px",
                    boxShadow: "0 7px 20px 2px rgb(150, 170, 180)",
                    margin: "1rem",
                }}
                imageBackgroundStyle={{
                    backgroundColor: "#ece4db",
                    borderRadius: "3px",
                    boxShadow: "8px 12px 14px -6px black",
                }}
                containerBackgroundStyle={{
                    filter: "blur(7px)",
                    backgroundColor: "rgba(62, 212, 214, 0.3)",
                }}
                itemMaxWidth={itemMaxWidth || 50}
                itemMaxHeight={`${itemMaxHeight || 500}px`}
            />
        </div>
    );
};
