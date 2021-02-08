import { config } from "react-spring";

export const defaultAnimationConfig = {
    transform: {
        rotateY: true,
        translateX: true,
        translateY: true,
    },
    zIndex: true,
    left: true,
    top: true,
    filter: {
        brightness: true,
    },
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
