import React, { useState } from 'react';

const Select = ({ options, defaultValue, defaultSelectable, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (selectedValue) => {
    setIsOpen(false);
    onChange(selectedValue);
  };

  const canSelectDefault = defaultSelectable || value === defaultValue;

  return (
    <div className={`form-input form-select ${isOpen ? 'open' : ''}`}>
      <div className="selected-option" onClick={handleToggle}>
        {value || defaultValue}
      </div>
      <ul className="options">
        {canSelectDefault && (
          <li className={`option ${defaultValue === value ? 'selected' : ''}`} onClick={() => handleOptionSelect(defaultValue)}>
            {defaultValue}
          </li>
        )}
        {options.map((option, index) => (
          <li
            key={index}
            className={`option ${option === value ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
