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
        defaultValue = "",
        ...props
    },
    ref
) {
    const inputRef = ref || useRef();
    const [query, setQuery] = useState(defaultValue);
    const [suggestions, setSuggestions] = useState([]);
    const [isInputFocused, setIsInputFocused] = useState(false);

    useEffect(() => {
        axios
            .get(`${suggestionsEndpoint}`)
            .then((response) => {
                setSuggestions(response.data);
            })
            .catch((error) => {
                console.error("Error fetching suggestions:", error);
            });
    }, []);

    useEffect(() => {
        if (isFocused) {
            inputRef.current.focus();
            setIsInputFocused(true);
        }
    }, [isFocused]);

    const handleInputBlur = () => {
        setTimeout(() => {
            setIsInputFocused(false);
        }, 100);
    };

    const handleInputFocus = () => {
        setIsInputFocused(true);
    };

    const handleBlockClick = () => {
        inputRef.current.focus();
        setIsInputFocused(true);
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setQuery(inputValue);

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
        if (suggestion) {
            setQuery(suggestion);
            onSearch(suggestion);
            inputRef.current.blur();
        }
    };

    return (
        <>
            <div
                className={`form-search ${className}`}
                onClick={handleBlockClick}
            >
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
                    <ul className="options" style={{ maxHeight: suggestions.length > 10 ? "200px" : "auto", overflowY: "auto" }}>
                    {Object.keys(suggestions).map((value) => (
                      <li
                        className="option"
                        key={value}
                        onClick={() => handleSuggestionClick(suggestions[value])}
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
