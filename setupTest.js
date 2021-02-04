import "@testing-library/jest-dom/extend-expect";
import "jest-extended";

jest.mock("./src/hooks/useResizeHandler", () => () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(() => [jest.fn(), jest.fn()]),
}));
