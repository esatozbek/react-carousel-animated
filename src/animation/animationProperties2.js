import { config } from "react-spring";
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

export const filter = {
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

function hasKeys(obj, ...keys) {
    return Object.keys(obj).every((key) => keys.includes(key));
}

function convertPropertiesToValues(properties, values) {
    return Object.keys(properties)
        .filter((key) => properties[key])
        .map((key) => {
            if (isObject(properties[key])) {
                if (hasKeys(properties[key], AFTER, BEFORE, CENTER)) {
                    return { [key]: properties[key] };
                }
                const subValue = convertPropertiesToValues(properties[key], values[key]);

                return { [key]: subValue };
            }

            return { [key]: values[key] };
        })
        .reduce((acc, obj) => ({ ...acc, ...obj }));
}

function combineObjects(defaultObj, customObj) {
    if (!customObj) {
        return defaultObj;
    }

    return Object.keys(defaultObj)
        .filter((key) => customObj[key] !== false)
        .map((key) => {
            if (isObject(defaultObj[key])) {
                return { [key]: { ...defaultObj[key], ...customObj[key] } };
            }

            return customObj[key] !== undefined
                ? { [key]: customObj[key] }
                : { [key]: defaultObj[key] };
        })
        .reduce((acc, obj) => ({ ...acc, ...obj }));
}

export default class AnimationProperties {
    constructor(customAnimationProperties) {
        // const animationFlags = {
        //     ...defaultAnimationFlags,
        //     ...customAnimationProperties,
        // };

        const animationFlags = combineObjects(
            defaultAnimationFlags,
            customAnimationProperties
        );

        this._properties = convertPropertiesToValues(
            animationFlags,
            defaultAnimationValues
        );
    }

    getValues(positionName, containerWidth, diff, imageWidth) {
        return {
            ...(this._properties.transform && {
                transform: this.transform[positionName](containerWidth, diff, imageWidth),
            }),
            ...(this._properties.zIndex && {
                zIndex: this.zIndex[positionName](containerWidth, diff, imageWidth),
            }),
            ...(this._properties.left && {
                left: this.left[positionName](containerWidth, diff, imageWidth),
            }),
            ...(this._properties.top && {
                top: this.top[positionName](containerWidth, diff, imageWidth),
            }),
            ...(this._properties.filter && {
                filter: this.filter[positionName](containerWidth, diff, imageWidth),
            }),
        };
    }

    nestedPropertyWrapper(property, position) {
        return function (containerWidth, diff, imageWidth) {
            return Object.keys(property)
                .map((key) => property[key][position])
                .map((valueFunc) => valueFunc(containerWidth, diff, imageWidth))
                .join(" ");
        };
    }

    get transform() {
        return {
            [AFTER]: this.nestedPropertyWrapper(this._properties.transform, AFTER),
            [CENTER]: this.nestedPropertyWrapper(this._properties.transform, CENTER),
            [BEFORE]: this.nestedPropertyWrapper(this._properties.transform, BEFORE),
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
        return {
            [AFTER]: this.nestedPropertyWrapper(this._properties.filter, AFTER),
            [CENTER]: this.nestedPropertyWrapper(this._properties.filter, CENTER),
            [BEFORE]: this.nestedPropertyWrapper(this._properties.filter, BEFORE),
        };
    }
}
