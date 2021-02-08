import CarouselAnimation from "./CarouselAnimation";
import { zIndex, top, filter, left } from "../animation/animationProperties";
import { BEFORE, CENTER, AFTER } from "../constants/animationConstants";

describe("Carousel animation tests", () => {
    const containerWidth = 1500;
    const diff = 1;
    const imageWidth = 150;

    it("Default state", () => {
        const anim = new CarouselAnimation();
        const result = anim.getValues([AFTER], 1500, 1, 150);

        expect(result.zIndex).toBe(zIndex[AFTER](containerWidth, diff, imageWidth));
        expect(result.top).toBe(top[AFTER](containerWidth, diff, imageWidth));
        expect(result.left).toBe(left[AFTER](containerWidth, diff, imageWidth));
        expect(result.filter).toBe(
            filter.brightness[AFTER](containerWidth, diff, imageWidth)
        );
        expect(result.transform).toBe("rotateY(-55deg) translateX(0%) translateY(-50%)");
    });

    it("zIndex disabled", () => {
        const anim = new CarouselAnimation({
            zIndex: false,
        });
        const result = anim.getValues([AFTER], 1500, 1, 150);

        expect(result.zIndex).toBeUndefined();
        expect(result.top).toBe(top[AFTER](containerWidth, diff, imageWidth));
        expect(result.left).toBe(left[AFTER](containerWidth, diff, imageWidth));
        expect(result.filter).toBe(
            filter.brightness[AFTER](containerWidth, diff, imageWidth)
        );
        expect(result.transform).toBe("rotateY(-55deg) translateX(0%) translateY(-50%)");
    });

    it("filter disabled", () => {
        const anim = new CarouselAnimation({
            zIndex: false,
            filter: false,
        });
        const result = anim.getValues([AFTER], 1500, 1, 150);

        expect(result.zIndex).toBeUndefined();
        expect(result.top).toBe(top[AFTER](containerWidth, diff, imageWidth));
        expect(result.left).toBe(left[AFTER](containerWidth, diff, imageWidth));
        expect(result.filter).toBeUndefined();
        expect(result.transform).toBe("rotateY(-55deg) translateX(0%) translateY(-50%)");
    });

    it("left disabled", () => {
        const anim = new CarouselAnimation({
            zIndex: false,
            filter: false,
            left: false,
        });
        const result = anim.getValues([AFTER], 1500, 1, 150);

        expect(result.zIndex).toBeUndefined();
        expect(result.top).toBe(top[AFTER](containerWidth, diff, imageWidth));
        expect(result.left).toBeUndefined();
        expect(result.filter).toBeUndefined();
        expect(result.transform).toBe("rotateY(-55deg) translateX(0%) translateY(-50%)");
    });

    it("transform disabled", () => {
        const anim = new CarouselAnimation({
            zIndex: false,
            filter: false,
            left: false,
            transform: false,
        });
        const result = anim.getValues([AFTER], 1500, 1, 150);

        expect(result.zIndex).toBeUndefined();
        expect(result.top).toBe(top[AFTER](containerWidth, diff, imageWidth));
        expect(result.left).toBeUndefined();
        expect(result.filter).toBeUndefined();
        expect(result.transform).toBeUndefined();
    });

    it("transform rotateY disabled", () => {
        const anim = new CarouselAnimation({
            zIndex: false,
            filter: false,
            left: false,
            transform: {
                rotateY: false,
                translateX: true,
                translateY: true,
            },
        });
        const result = anim.getValues([AFTER], 1500, 1, 150);

        expect(result.zIndex).toBeUndefined();
        expect(result.top).toBe(top[AFTER](containerWidth, diff, imageWidth));
        expect(result.left).toBeUndefined();
        expect(result.filter).toBeUndefined();
        expect(result.transform).toBe("translateX(0%) translateY(-50%)");
    });

    it("transform rotateY and translateX disabled", () => {
        const anim = new CarouselAnimation({
            zIndex: false,
            filter: false,
            left: false,
            transform: {
                rotateY: false,
                translateX: false,
                translateY: true,
            },
        });
        const result = anim.getValues([AFTER], 1500, 1, 150);

        expect(result.zIndex).toBeUndefined();
        expect(result.top).toBe(top[AFTER](containerWidth, diff, imageWidth));
        expect(result.left).toBeUndefined();
        expect(result.filter).toBeUndefined();
        expect(result.transform).toBe("translateY(-50%)");
    });

    it("custom zIndex and transform values", () => {
        const anim = new CarouselAnimation({
            zIndex: {
                [AFTER]: () => 2,
                [CENTER]: () => 2,
                [BEFORE]: () => 2,
            },
            filter: false,
            left: false,
            transform: {
                rotateY: {
                    [AFTER]: () => "rotateY(3deg)",
                    [CENTER]: () => "rotateY(3deg)",
                    [BEFORE]: () => "rotateY(3deg)",
                },
                translateX: false,
                translateY: true,
            },
        });

        const result = anim.getValues([AFTER], 1500, 1, 150);

        expect(result.zIndex).toBe(2);
        expect(result.top).toBe(top[AFTER](containerWidth, diff, imageWidth));
        expect(result.left).toBeUndefined();
        expect(result.filter).toBeUndefined();
        expect(result.transform).toBe("rotateY(3deg) translateY(-50%)");
    });

    it("custom zIndex and transform values with defaults", () => {
        const anim = new CarouselAnimation({
            zIndex: false,
            transform: {
                rotateY: {
                    [AFTER]: () => "rotateY(3deg)",
                    [CENTER]: () => "rotateY(3deg)",
                    [BEFORE]: () => "rotateY(3deg)",
                },
            },
        });

        const result = anim.getValues([AFTER], 1500, 1, 150);

        expect(result.zIndex).toBeUndefined();
        expect(result.top).toBe(top[AFTER](containerWidth, diff, imageWidth));
        expect(result.left).toBe(left[AFTER](containerWidth, diff, imageWidth));
        expect(result.filter).toBe(
            filter.brightness[AFTER](containerWidth, diff, imageWidth)
        );
        expect(result.transform).toBe("rotateY(3deg) translateX(0%) translateY(-50%)");
    });
});
