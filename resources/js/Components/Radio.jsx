import React from "react";

export default function Radio({
    className = "",
    label,
    checked = false,
    disabled = false, // Add disabled prop
    onChange,
    ...props
}) {
    const handleRadioChange = () => {
        if (onChange && !disabled) {
            onChange();
        }
    };

    return (
        <label
            className={`form-radio ${className} ${disabled ? "disabled" : ""}`}
        >
            <input
                {...props}
                type="radio"
                className="form-radio-input"
                checked={checked}
                onChange={handleRadioChange}
                disabled={disabled} // Pass disabled prop
            />
            <span
                className={`form-radio-icon ${checked ? "active" : ""}`}
            ></span>
            {label && <span className="form-radio-label">{label}</span>}
        </label>
    );
}
