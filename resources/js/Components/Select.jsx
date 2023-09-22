import React, { useState } from 'react';

const Select = ({ options, defaultValue, defaultSelectable, value, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionSelect = (selectedValue) => {
    setIsOpen(false);
    onChange(selectedValue);
  };

  const canSelectDefault = defaultSelectable || value === defaultValue;

  return (
    <div className={`form-input form-select ${isOpen ? 'open' : ''}`}>
      <div className={`selected-option ${disabled ? 'disabled' : ''}`} onClick={handleToggle}>
        {options[value] || defaultValue}
      </div>
      {isOpen && !disabled && (
        <ul className="options">
          {canSelectDefault && (
            <li className={`option ${defaultValue === value ? 'selected' : ''}`} onClick={() => handleOptionSelect(defaultValue)}>
              {defaultValue}
            </li>
          )}
          {Object.keys(options).map((optionId, index) => (
            <li
              key={index}
              className={`option ${optionId === value ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(optionId)}
            >
              {options[optionId]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
