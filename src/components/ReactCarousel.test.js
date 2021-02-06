import React from "react";
import ReactCarousel from "./ReactCarousel";
import { render, fireEvent } from "@testing-library/react";
import images from "../images";

jest.mock("../hooks/useResizeHandler", () => {
    return () => {
        return [1000, 820];
    };
});

describe("Carousel tests", () => {
    it("Renders correctly", () => {
        const carousel = render(
            <ReactCarousel>
                {images[0].map((item, index) => (
                    <img key={index} src={item.src} alt="test" />
                ))}
            </ReactCarousel>
        );
        expect(carousel.getAllByRole("img")).toHaveLength(images[0].length);
    });

    it("Prev action test", async () => {
        const carousel = render(
            <ReactCarousel>
                {images[0].map((item, index) => (
                    <img key={index} src={item.src} alt="test" />
                ))}
            </ReactCarousel>
        );
        const prev = carousel.getByTestId("prev");
        fireEvent.click(prev);
        expect(carousel.getAllByRole("img")).toHaveLength(images[0].length);
    });

    it("Next action test", async () => {
        const carousel = render(
            <ReactCarousel>
                {images[0].map((item, index) => (
                    <img key={index} src={item.src} alt="test" />
                ))}
            </ReactCarousel>
        );
        const next = carousel.getByTestId("next");
        fireEvent.click(next);
        expect(carousel.getAllByRole("img")).toHaveLength(images[0].length);
    });
});
