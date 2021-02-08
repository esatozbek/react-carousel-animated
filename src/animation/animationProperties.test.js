import { left } from "../animation/animationProperties";
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
