import { BEFORE, CENTER, AFTER } from "../constants/animationConstants";
import { isObject, hasKeys } from "../utils/objectUtils";
import { defaultAnimationConfig } from "./animationConfig";
import { defaultAnimationProperties } from "./animationProperties";

export default class CarouselAnimation {
    constructor(customAnimationConfig) {
        const animationConfig = CarouselAnimation.combineObjects(
            defaultAnimationConfig,
            customAnimationConfig
        );

        this._properties = CarouselAnimation.convertConfigToProperties(
            animationConfig,
            defaultAnimationProperties
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

    static combineObjects(defaultObj, customObj) {
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

    static convertConfigToProperties(properties, values) {
        return Object.keys(properties)
            .filter((key) => properties[key])
            .map((key) => {
                if (isObject(properties[key])) {
                    if (hasKeys(properties[key], AFTER, BEFORE, CENTER)) {
                        return { [key]: properties[key] };
                    }
                    const subValue = CarouselAnimation.convertConfigToProperties(
                        properties[key],
                        values[key]
                    );

                    return { [key]: subValue };
                }

                return { [key]: values[key] };
            })
            .reduce((acc, obj) => ({ ...acc, ...obj }));
    }
}
