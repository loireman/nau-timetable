import { Icon } from "@iconify/react";
import { forwardRef, useEffect, useRef, useState } from "react";
import axios from "axios";
import ReactSelect from "react-select";

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
        }
    }, [isFocused]);

    const handleSuggestionClick = (suggestion) => {
        if (suggestion) {
            setQuery(suggestion);
            onSearch(suggestion);
            inputRef.current.blur();
        }
    };

    return (
        <>
            <ReactSelect
                {...props}
                ref={inputRef}
                defaultValue={{label: query, value: query}}
                options={Object.keys(suggestions).map((value) => ({
                    label: suggestions[value],
                    value: suggestions[value],
                }))}
                onChange={(opt) => handleSuggestionClick(opt.value)}
            />
        </>
    );
});
