import { useState, useEffect, useRef } from "react";

function useResizeHandler(ref) {
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    const resizeHandler = (els) => {
        setHeight(els[0].contentRect.height);
        setWidth(els[0].contentRect.width);
    };

    const observer = useRef(new ResizeObserver(resizeHandler));

    useEffect(() => {
        observer.current.observe(ref.current);

        return () => {
            observer.current.disconnect();
        };
    }, []);

    return [width, height];
}

export default useResizeHandler;
