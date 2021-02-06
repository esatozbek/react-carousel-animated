import { renderHook, act } from "@testing-library/react-hooks";
import useCycleIndex from "./useCycleIndex";

describe("Reducer tests", () => {
    it("Initial state test", () => {
        const { result } = renderHook(() => useCycleIndex(5));
        expect(result.current.index).toBe(0);
    });

    it("Next action test", () => {
        const { result } = renderHook(() => useCycleIndex(5));
        expect(result.current.index).toBe(0);
        act(() => result.current.next());
        expect(result.current.index).toBe(1);
    });

    it("Prev action cycle test", () => {
        const { result } = renderHook(() => useCycleIndex(5));
        expect(result.current.index).toBe(0);
        act(() => result.current.next());
        expect(result.current.index).toBe(1);
        act(() => result.current.prev());
        expect(result.current.index).toBe(0);
    });

    it("Next action cycle test", () => {
        const { result } = renderHook(() => useCycleIndex(3));
        expect(result.current.index).toBe(0);
        act(() => result.current.next());
        act(() => result.current.next());
        expect(result.current.index).toBe(2);
        act(() => result.current.next());
        expect(result.current.index).toBe(0);
    });
});
