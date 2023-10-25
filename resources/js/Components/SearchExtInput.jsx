import { Icon } from "@iconify/react";
import { forwardRef, useEffect, useRef, useState } from "react";
import axios from "axios";

export default forwardRef(function SearchExtInput(
    {
        type = "search",
        className = "",
        isFocused = false,
        suggestionsEndpoint,
        onSearch,
        ...props
    },
    ref
) {
    const inputRef = ref || useRef();
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isInputFocused, setIsInputFocused] = useState(false);

    useEffect(() => {
        if (isFocused) {
            inputRef.current.focus();
            setIsInputFocused(true);
        }
    }, [isFocused]);

    const handleInputBlur = () => {
        // Delay blur to allow for click event handling
        setTimeout(() => {
            setIsInputFocused(false);
        }, 90);
    };

    const handleInputFocus = () => {
        setIsInputFocused(true);
    };

    const handleBlockClick = () => {
        // If the block is clicked, set focus to input
        inputRef.current.focus();
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setQuery(inputValue);

        // Fetch suggestions based on the input value
        if (suggestionsEndpoint) {
            axios
                .get(`${suggestionsEndpoint}/${inputValue}`)
                .then((response) => {
                    setSuggestions(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching suggestions:", error);
                });
        }
    };

    const handleSuggestionClick = (suggestion) => {
        // Check if suggestion is defined and has a name property
        if (suggestion) {
            onSearch(suggestion);
        }
    };

    return (
        <>
            <div
                className={`form-search ${className}`}
                onClick={handleBlockClick}
            >
                <button disabled>
                    <Icon icon="mdi:search" />
                </button>
                <div className="vr"></div>
                <input
                    {...props}
                    type={type}
                    ref={inputRef}
                    value={query}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
                />
                {isInputFocused && suggestions.length !== 0 && (
                    <ul className="options">
                        {Object.keys(suggestions).map((value) => (
                            <li
                                className="option"
                                key={value}
                                onClick={() =>
                                    handleSuggestionClick(suggestions[value])
                                }
                            >
                                {suggestions[value]}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
});
