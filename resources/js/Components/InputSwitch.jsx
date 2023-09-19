import React, { useState } from "react";

function InputSwitch({ label, onChange, initialValue }) {
    const [isChecked, setIsChecked] = useState(initialValue);

    const toggleSwitch = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        onChange(newValue);
    };

    return (
        <div className="form-switch">
            <div className={`switch-container ${isChecked ? "on" : ""}`} onClick={toggleSwitch}>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="hidden-checkbox"
                />
                <div className="switch" />
            </div>
            {label && <span>{label}</span>}
        </div>
    );
}

export default InputSwitch;
