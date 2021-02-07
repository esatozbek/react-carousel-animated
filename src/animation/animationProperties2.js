import { config } from "react-spring";
import { subV } from "react-use-gesture";
import { BEFORE, CENTER, AFTER } from "../constants/animationConstants";

export const rotateY = {
    [AFTER]: () => "rotateY(-55deg)",
    [CENTER]: () => "rotateY(0deg)",
    [BEFORE]: () => "rotateY(55deg)",
};

export const translateX = {
    [AFTER]: () => "translateX(0%)",
    [CENTER]: () => "translateX(-50%)",
    [BEFORE]: () => "translateX(0%)",
};

export const translateY = {
    [AFTER]: () => "translateY(-50%)",
    [CENTER]: () => "translateY(-50%)",
    [BEFORE]: () => "translateY(-50%)",
};

export const transform = {
    rotateY,
    translateX,
    translateY,
};

export const zIndex = {
    [AFTER]: () => 1,
    [CENTER]: () => 0,
    [BEFORE]: () => 1,
};

export const left = {
    [AFTER]: (containerWidth, diff) => `${(containerWidth * -diff * 9) / 10}px`,
    [CENTER]: (containerWidth) => `${containerWidth / 2}px`,
    [BEFORE]: (containerWidth, diff, imageWidth) =>
        `${imageWidth * (-diff * 2 + 1) + containerWidth / 10}px`,
};

export const top = {
    [AFTER]: () => "50%",
    [CENTER]: () => "50%",
    [BEFORE]: () => "50%",
};

export const brightness = {
    [AFTER]: () => "brightness(0.32)",
    [CENTER]: () => "brightness(1)",
    [BEFORE]: () => "brightness(0.32)",
};

const filter = {
    brightness,
};

const defaultAnimationValues = {
    transform,
    zIndex,
    left,
    top,
    filter,
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

export const defaultAnimationFlags = {
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

function isObject(obj) {
    return typeof obj === "object";
}

export function getAnimationProperties(
    positionName,
    animationFlags,
    containerWidth,
    indexDiff,
    imageWidth
) {
    const animationProperties = {
        transform: `${rotateY[positionName]} ${translateX[positionName]} ${translateY[positionName]}`,
        zIndex: zIndex[positionName],
        left: left[positionName](containerWidth, indexDiff, imageWidth),
        top: top[positionName],
        filter: brightness[positionName],
    };

    return Object.keys(animationFlags)
        .filter((key) => animationFlags[key])
        .reduce((acc, key) => {
            return {
                ...acc,
                [key]: animationProperties[key],
            };
        });
}

function convertPropertiesToValues(properties, values) {
    return Object.keys(properties)
        .filter((key) => properties[key])
        .map((key) => {
            if (isObject(properties[key])) {
                const subValue = convertPropertiesToValues(properties[key], values[key]);

                return { [key]: subValue };
            }

            return { [key]: values[key] };
        })
        .reduce((acc, obj) => ({ ...acc, ...obj }));
}

export default class AnimationProperties {
    constructor(customAnimationProperties) {
        this._properties = {
            ...defaultAnimationFlags,
            ...customAnimationProperties,
        };

        // this._properties = Object.keys(this._properties)
        //     .filter((key) => this._properties[key])
        //     .map((key) => {
        //         if (isObject(this._properties[key])) {
        //             const subValue = Object.keys(this._properties[key])
        //                 .filter((subKey) => this._properties[key][subKey])
        //                 .map((subKey) => {
        //                     if (isObject(this._properties[key][subKey])) {
        //                         return { [subKey]: this._properties[key][subKey] };
        //                     }

        //                     return { [subKey]: defaultAnimationValues[key][subKey] };
        //                 })
        //                 .reduce((acc, obj) => ({ ...acc, ...obj }));

        //             return { [key]: subValue };
        //         }

        //         return { [key]: defaultAnimationValues[key] };
        //     })
        //     .reduce((acc, obj) => ({ ...acc, ...obj }));
        this._properties = convertPropertiesToValues(
            this._properties,
            defaultAnimationValues
        );
    }

    get properties() {
        return this._properties;
    }

    transform(positionName) {
        if (!this._properties.transform) {
            return null;
        } else if (isObject(this._properties.transform)) {
            const transformValue = Object.keys(this._properties.transform)
                .filter((key) => this._properties[key])
                .map((key) => transform[key][positionName])
                .join(" ");

            return { transform: transformValue };
        }

        return {
            transform: `${rotateY[positionName]} ${translateX[positionName]} ${translateY[positionName]}`,
        };
    }

    get zIndex() {
        return this._properties.zIndex;
    }

    get left() {
        return this._properties.left;
    }

    get top() {
        return this._properties.top;
    }

    get filter() {
        return this._properties.brightness;
    }
}
