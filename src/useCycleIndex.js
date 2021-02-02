import { useReducer } from "react";

const NEXT = "NEXT";
const PREV = "PREV";

function reducer(state, action) {
    switch (action.type) {
        case NEXT:
            return {
                ...state,
                ...(state.index === state.length - 1
                    ? { index: 0 }
                    : { index: state.index + 1 }),
            };
        case PREV:
            return {
                ...state,
                ...(state.index === 0
                    ? { index: state.length - 1 }
                    : { index: state.index - 1 }),
            };
        default:
            return 2;
    }
}

function useCycleIndex(length) {
    const [state, dispatch] = useReducer(reducer, {
        length,
        index: 0,
    });

    const next = () => {
        dispatch({ type: NEXT });
    };

    const prev = () => {
        dispatch({ type: PREV });
    };

    return { index: state.index, next, prev };
}

export default useCycleIndex;
