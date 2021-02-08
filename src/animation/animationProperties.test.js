import AnimationProperties, {
    zIndex,
    left,
    top,
    filter,
} from "../animation/animationProperties2";
import { BEFORE, CENTER, AFTER } from "../constants/animationConstants";

describe("Animation left properties test", () => {
    it("After test with 1 diff", () => {
        const containerWidth = 1000;
        const diff = -1;

        const result = left[AFTER](containerWidth, diff);
        expect(result).toBe(`${900}px`);
    });

    it("After test with 2 diff", () => {
        const containerWidth = 1000;
        const diff = -2;

        const result = left[AFTER](containerWidth, diff);
        expect(result).toBe(`${1800}px`);
    });

    it("After test with 3 diff", () => {
        const containerWidth = 1000;
        const diff = -3;

        const result = left[AFTER](containerWidth, diff);
        expect(result).toBe(`${2700}px`);
    });

    it("Center test", () => {
        const containerWidth = 1000;

        const result = left[CENTER](containerWidth);
        expect(result).toBe(`${500}px`);
    });

    it("Before test with 1 diff", () => {
        const containerWidth = 1000;
        const diff = 1;
        const imageWidth = 500;

        const result = left[BEFORE](containerWidth, diff, imageWidth);
        expect(result).toBe(`${-400}px`);
    });

    it("Before test with 2 diff", () => {
        const containerWidth = 1000;
        const diff = 2;
        const imageWidth = 500;

        const result = left[BEFORE](containerWidth, diff, imageWidth);
        expect(result).toBe(`${-1400}px`);
    });

    it("Before test with 3 diff", () => {
        const containerWidth = 1000;
        const diff = 3;
        const imageWidth = 500;

        const result = left[BEFORE](containerWidth, diff, imageWidth);
        expect(result).toBe(`${-2400}px`);
    });
});

describe("Animation properties test", () => {
    const containerWidth = 1500;
    const diff = 1;
    const imageWidth = 150;

    it("Defult state", () => {
        const anim = new AnimationProperties();
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
        const anim = new AnimationProperties({
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
        const anim = new AnimationProperties({
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
        const anim = new AnimationProperties({
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
        const anim = new AnimationProperties({
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
        const anim = new AnimationProperties({
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
        const anim = new AnimationProperties({
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
        const anim = new AnimationProperties({
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
        const anim = new AnimationProperties({
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
