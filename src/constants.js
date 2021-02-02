export const rotateY = {
    after: "rotateY(-55deg)",
    neutral: "rotateY(0deg)",
    before: "rotateY(55deg)",
};

export const translateX = {
    after: "translateX(0%)",
    neutral: "translateX(-50%)",
    before: "translateX(0%)",
};

export const translateY = {
    after: "translateY(-50%)",
    neutral: "translateY(-50%)",
    before: "translateY(-50%)",
};

export const zIndex = {
    after: 1,
    neutral: 0,
    before: 1,
};

export const left = {
    after: (containerWidth, diff) => `${(containerWidth * -diff * 9) / 10}px`,
    neutral: (containerWidth) => `${containerWidth / 2}px`,
    before: (containerWidth, diff, imageWidth) =>
        `${-imageWidth * diff + containerWidth / 9}px`,
};

export const top = {
    after: "50%",
    neutral: "50%",
    before: "50%",
};

export const brightness = {
    after: "brightness(0.32)",
    neutral: "brightness(1)",
    before: "brightness(0.32)",
};
