import { Icon } from "@iconify/react";
import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function SearchInput(
    { type = "search", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className={`form-search ${className}`}>
            <button>
                <Icon icon="mdi:search" />
            </button>
            <div className="vr"></div>
            <input {...props} type={type} ref={input} />
        </div>
    );
});
