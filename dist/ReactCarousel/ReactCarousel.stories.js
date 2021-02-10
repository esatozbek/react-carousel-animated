import React from "react";
import ReactCarousel from "./ReactCarousel";
import images from "../../images"; // eslint-disable-next-line import/no-anonymous-default-export

export default {
  title: "ReactCarousel",
  component: ReactCarousel,
  argTypes: {
    springConfig: {
      control: {
        type: "select",
        options: ["default", "gentle", "wobbly", "stiff", "slow", "molasses"]
      }
    },
    imagesIndex: {
      control: {
        type: "range",
        min: 0,
        max: 10
      }
    },
    width: {
      control: {
        type: "range",
        min: 0,
        max: 2000
      }
    },
    itemMaxWidth: {
      control: {
        type: "range",
        min: 0,
        max: 100
      }
    },
    itemMaxHeight: {
      control: {
        type: "range",
        min: 0,
        max: 1000
      }
    }
  }
};
export const Carousel = ({
  springConfig,
  imagesIndex,
  itemMaxWidth,
  itemMaxHeight
}) => {
  return /*#__PURE__*/React.createElement(ReactCarousel, {
    springConfig: springConfig,
    itemMaxWidth: itemMaxWidth || 50,
    itemMaxHeight: `${itemMaxHeight || 500}px`
  }, images[imagesIndex || 0].map(image => /*#__PURE__*/React.createElement("img", {
    src: image.src,
    alt: "test"
  })));
};
export const CarouselInDiv = ({
  springConfig,
  imagesIndex,
  width,
  itemMaxWidth,
  itemMaxHeight
}) => {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width
    }
  }, /*#__PURE__*/React.createElement(ReactCarousel, {
    springConfig: springConfig,
    itemMaxWidth: itemMaxWidth || 50,
    itemMaxHeight: `${itemMaxHeight || 500}px`
  }, images[imagesIndex || 0].map(image => /*#__PURE__*/React.createElement("img", {
    src: image.src,
    alt: "test"
  }))));
};
export const CarouselWithDivItems = ({
  springConfig,
  width,
  itemMaxWidth,
  itemMaxHeight
}) => {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width
    }
  }, /*#__PURE__*/React.createElement(ReactCarousel, {
    carouselConfig: {
      transform: {
        rotateY: false
      },
      filter: false
    },
    springConfig: springConfig,
    itemMaxWidth: itemMaxWidth || 50,
    itemMaxHeight: `${itemMaxHeight || 500}px`
  }, [0, 1, 2, 3, 4].map(index => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2.5rem",
      backgroundColor: "white",
      height: "500px",
      width: "500px",
      borderRadius: "20px",
      boxShadow: "0 7px 20px 2px rgb(150, 170, 180)",
      margin: "1rem"
    }
  }, index))));
};
export const CarouselWithSmallItems = ({
  springConfig,
  width,
  itemMaxWidth,
  itemMaxHeight
}) => {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width
    }
  }, /*#__PURE__*/React.createElement(ReactCarousel, {
    carouselConfig: {
      transform: {
        rotateY: false
      }
    },
    springConfig: springConfig,
    itemBackgroundStyle: {
      borderRadius: "10px",
      border: "3px solid black",
      overflow: "auto"
    },
    itemMaxWidth: itemMaxWidth || 50,
    itemMaxHeight: `${itemMaxHeight || 500}px`,
    animationFlags: {
      zIndex: false,
      filter: false,
      left: true,
      top: true,
      transform: true
    }
  }, [0, 1, 2, 3, 4].map(index => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2.5rem",
      backgroundColor: "white",
      height: "50px",
      width: "50px"
    }
  }, index))));
};
export const CarouselWithStyle = ({
  springConfig,
  imagesIndex,
  width,
  itemMaxWidth,
  itemMaxHeight
}) => {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width
    }
  }, /*#__PURE__*/React.createElement(ReactCarousel, {
    springConfig: springConfig,
    itemStyle: {
      borderRadius: "20px",
      boxShadow: "0 7px 20px 2px rgb(150, 170, 180)",
      margin: "1rem"
    },
    itemBackgroundStyle: {
      backgroundColor: "#ece4db",
      borderRadius: "3px",
      boxShadow: "8px 12px 14px -6px black"
    },
    containerBackgroundStyle: {
      filter: "blur(7px)",
      backgroundColor: "rgba(62, 212, 214, 0.3)"
    },
    itemMaxWidth: itemMaxWidth || 50,
    itemMaxHeight: `${itemMaxHeight || 500}px`
  }, images[imagesIndex || 0].map((image, index) => /*#__PURE__*/React.createElement("img", {
    key: index,
    src: image.src,
    alt: "test",
    style: {
      borderRadius: "20px",
      boxShadow: "0 7px 20px 2px rgb(150, 170, 180)",
      margin: "1rem"
    }
  }))));
};