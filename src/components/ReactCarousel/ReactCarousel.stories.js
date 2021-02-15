import React from "react";
import ReactCarousel from "./ReactCarousel";
import images from "../../images";

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
                max: 5,
            },
        },
        width: {
            control: {
                type: "range",
                min: 0,
                max: 2000,
            },
        },
        carouselHeight: {
            control: {
                type: "range",
                min: 0,
                max: 1000,
            },
        },
    },
};

export const Carousel = ({ springConfig, imagesIndex, carouselHeight }) => {
    return (
        <ReactCarousel
            springConfig={springConfig}
            carouselHeight={`${carouselHeight || 500}px`}
        >
            {images[imagesIndex || 0].map((image) => (
                <img src={image.src} alt="test" style={{ maxHeight: "500px" }} />
            ))}
        </ReactCarousel>
    );
};

export const CarouselInDiv = ({ springConfig, imagesIndex, width, carouselHeight }) => {
    return (
        <div style={{ width }}>
            <ReactCarousel
                springConfig={springConfig}
                carouselHeight={`${carouselHeight || 600}px`}
            >
                {images[imagesIndex || 0].map((image) => (
                    <img src={image.src} alt="test" style={{ maxHeight: "500px" }} />
                ))}
            </ReactCarousel>
        </div>
    );
};

export const CarouselWithDivItems = ({ springConfig, width, carouselHeight }) => {
    return (
        <div style={{ width }}>
            <ReactCarousel
                carouselConfig={{
                    transform: {
                        rotateY: false,
                    },
                    filter: false,
                }}
                springConfig={springConfig}
                carouselHeight={`${carouselHeight || 600}px`}
            >
                {[0, 1, 2, 3, 4].map((index) => (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                            fontSize: "2.5rem",
                            backgroundColor: "white",
                            height: "500px",
                            width: "500px",
                            borderRadius: "20px",
                            boxShadow: "0 7px 20px 2px rgb(150, 170, 180)",
                            margin: "1rem",
                        }}
                    >
                        <img
                            src={images[2][index].src}
                            alt=""
                            style={{ width: "100%" }}
                        />
                        Lorem ipsum dolor sit amet
                    </div>
                ))}
            </ReactCarousel>
        </div>
    );
};

export const SentenceItems = ({ springConfig, width, carouselHeight }) => {
    return (
        <div style={{ width }}>
            <ReactCarousel
                carouselConfig={{
                    transform: {
                        rotateY: false,
                    },
                }}
                containerBackgroundStyle={{
                    backgroundColor: "#282c34",
                }}
                springConfig={springConfig}
                carouselHeight={`${carouselHeight || 600}px`}
            >
                {["Lorem", "ipsum", "dolor", "sit", "amet"].map((word) => (
                    <div
                        style={{
                            color: "white",
                            fontSize: "2.5rem",
                            margin: "1rem",
                        }}
                    >
                        {word}
                    </div>
                ))}
            </ReactCarousel>
        </div>
    );
};

export const CarouselWithSmallItems = ({ springConfig, width, carouselHeight }) => {
    return (
        <div style={{ width }}>
            <ReactCarousel
                carouselConfig={{
                    transform: {
                        rotateY: false,
                    },
                }}
                springConfig={springConfig}
                itemBackgroundStyle={{
                    borderRadius: "10px",
                    border: "3px solid black",
                    overflow: "auto",
                }}
                carouselHeight={`${carouselHeight || 500}px`}
                animationFlags={{
                    zIndex: false,
                    filter: false,
                    left: true,
                    top: true,
                    transform: true,
                }}
            >
                {[0, 1, 2, 3, 4].map((index) => (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "2.5rem",
                            backgroundColor: "white",
                            height: "50px",
                            width: "50px",
                        }}
                    >
                        {index}
                    </div>
                ))}
            </ReactCarousel>
        </div>
    );
};

export const CarouselWithStyle = ({
    springConfig,
    imagesIndex,
    width,
    carouselHeight,
}) => {
    return (
        <div style={{ width }}>
            <ReactCarousel
                springConfig={springConfig}
                itemBackgroundStyle={{
                    backgroundColor: "#ece4db",
                    borderRadius: "3px",
                    boxShadow: "8px 12px 14px -6px black",
                }}
                containerBackgroundStyle={{
                    filter: "blur(7px)",
                    backgroundColor: "rgba(62, 212, 214, 0.3)",
                }}
                carouselHeight="600px"
            >
                {images[imagesIndex || 0].map((image, index) => (
                    <img
                        key={index}
                        src={image.src}
                        alt="test"
                        style={{
                            maxHeight: "500px",
                            borderRadius: "20px",
                            boxShadow: "0 7px 20px 2px rgb(150, 170, 180)",
                            margin: "1rem",
                        }}
                    />
                ))}
            </ReactCarousel>
        </div>
    );
};

export const ResponsiveCarousel = ({
    springConfig,
    imagesIndex,
    width,
    carouselHeight,
}) => {
    return (
        <div style={{ width }}>
            <ReactCarousel
                springConfig={springConfig}
                containerBackgroundStyle={{
                    filter: "blur(7px)",
                    backgroundColor: "rgba(62, 212, 214, 0.3)",
                }}
                carouselHeight="600px"
            >
                {images[imagesIndex || 0].map(
                    (image, index) => (containerWidth, selected) => (
                        <img
                            key={index}
                            src={image.src}
                            alt="test"
                            style={{
                                maxHeight: "500px",
                                maxWidth:
                                    containerWidth > 650
                                        ? `${containerWidth / 2}px`
                                        : `${containerWidth}px`,
                                borderRadius: "10px",
                                boxShadow: "0 7px 20px 2px rgb(150, 170, 180)",
                            }}
                        />
                    )
                )}
            </ReactCarousel>
        </div>
    );
};
