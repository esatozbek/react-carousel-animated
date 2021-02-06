import React from "react";
import { render } from "@testing-library/react";
import { useSpring } from "react-spring";
import CarouselItem from "./CarouselItem";
import {
    rotateY,
    translateX,
    translateY,
    zIndex,
    left,
    top,
    brightness,
    getSpringConfig,
} from "../animation/animationProperties";
import { BEFORE, CENTER, AFTER } from "../constants/animationConstants";
import images from "../images";

const mockUseSpring = jest.fn();

jest.mock("../hooks/useResizeHandler", () => {
    return () => {
        return [1000, 820];
    };
});

jest.mock("react-spring", () => {
    return {
        ...jest.requireActual("react-spring"),
        useSpring: jest.fn(),
    };
});

describe("Carousel image tests", () => {
    beforeEach(() => {
        mockUseSpring.mockClear();
    });

    it("Renders correctly", () => {
        const carouselItem = render(
            <CarouselItem index={0} selectedItemIndex={0} containerWidth={1500}>
                <img src={images[0][0]} alt="test" />
            </CarouselItem>
        );
        expect(carouselItem.getByRole("img")).toBeDefined();
    });

    it("Selected position test", () => {
        useSpring.mockImplementation(mockUseSpring);
        const carouselItem = render(
            <CarouselItem index={0} selectedItemIndex={0} containerWidth={1500}>
                <img src={images[0][0]} alt="test" />
            </CarouselItem>
        );
        expect(carouselItem.getByTestId("container")).toBeDefined();
        expect(mockUseSpring).toBeCalledWith({ config: getSpringConfig() });
        expect(mockUseSpring).toBeCalledWith({
            config: getSpringConfig(),
            transform: `${rotateY[CENTER]} ${translateX[CENTER]} ${translateY[CENTER]}`,
            zIndex: zIndex[CENTER],
            left: left[CENTER](1500, 0, 1000),
            top: top[CENTER],
            filter: brightness[CENTER],
        });
    });

    it("Before position test", () => {
        useSpring.mockImplementation(mockUseSpring);
        const carouselItem = render(
            <CarouselItem index={0} selectedItemIndex={1} containerWidth={1500}>
                <img src={images[0][0]} alt="test" />
            </CarouselItem>
        );
        expect(carouselItem.getByTestId("container")).toBeDefined();
        expect(mockUseSpring).toBeCalledWith({ config: getSpringConfig() });
        expect(mockUseSpring).toBeCalledWith({
            config: getSpringConfig(),
            transform: `${rotateY[BEFORE]} ${translateX[BEFORE]} ${translateY[BEFORE]}`,
            zIndex: zIndex[BEFORE],
            left: left[BEFORE](1500, 1, 1000),
            top: top[BEFORE],
            filter: brightness[BEFORE],
        });
    });

    it("After position test", () => {
        useSpring.mockImplementation(mockUseSpring);
        const carouselItem = render(
            <CarouselItem index={1} selectedItemIndex={0} containerWidth={1500}>
                <img src={images[0][0]} alt="test" />
            </CarouselItem>
        );
        expect(carouselItem.getByTestId("container")).toBeDefined();
        expect(mockUseSpring).toBeCalledWith({ config: getSpringConfig() });
        expect(mockUseSpring).toBeCalledWith({
            config: getSpringConfig(),
            transform: `${rotateY[AFTER]} ${translateX[AFTER]} ${translateY[AFTER]}`,
            zIndex: zIndex[AFTER],
            left: left[AFTER](1500, -1, 1000),
            top: top[AFTER],
            filter: brightness[AFTER],
        });
    });
});
