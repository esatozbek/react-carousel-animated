import React from "react";
import { render } from "@testing-library/react";
import CarouselImage from "./CarouselImage";

describe("Carousel image tests", () => {
    it("Renders correctly", () => {
        const carouselImage = render(<CarouselImage />);
        expect(carouselImage.getAllByAltText("")).toBeDefined();
    });
});
