import { config } from "react-spring";
import { BEFORE, CENTER, AFTER } from "../constants/animationConstants";

export const rotateY = {
    [AFTER]: "rotateY(-55deg)",
    [CENTER]: "rotateY(0deg)",
    [BEFORE]: "rotateY(55deg)",
};

export const translateX = {
    [AFTER]: "translateX(0%)",
    [CENTER]: "translateX(-50%)",
    [BEFORE]: "translateX(0%)",
};

export const translateY = {
    [AFTER]: "translateY(-50%)",
    [CENTER]: "translateY(-50%)",
    [BEFORE]: "translateY(-50%)",
};

export const zIndex = {
    [AFTER]: 1,
    [CENTER]: 0,
    [BEFORE]: 1,
};

export const left = {
    [AFTER]: (containerWidth, diff) => `${(containerWidth * -diff * 9) / 10}px`,
    [CENTER]: (containerWidth) => `${containerWidth / 2}px`,
    [BEFORE]: (containerWidth, diff, imageWidth) =>
        `${imageWidth * (-diff * 2 + 1) + containerWidth / 10}px`,
};

export const top = {
    [AFTER]: "50%",
    [CENTER]: "50%",
    [BEFORE]: "50%",
};

export const brightness = {
    [AFTER]: "brightness(0.32)",
    [CENTER]: "brightness(1)",
    [BEFORE]: "brightness(0.32)",
};

export function getSpringConfig(configProp) {
    if (configProp === undefined) {
        return {
            mass: 2,
            tension: 170,
            friction: 26,
            clamp: false,
            precision: 0.001,
        };
    }
    if (typeof configProp === "string") {
        return config[configProp];
    }
    return configProp;
}
