import React, { useRef, useState, useEffect } from 'react';
import Text from '../../atoms/Text/index.js';

const Select = ({ options = [], label = 'Please select an option...', onOptionSelected }) => {
    const labelRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [overlayTop, setOverlayTop] = useState();
    const onOptionHandler = (option, index) => {
        if (onOptionSelected) {
            onOptionSelected(option, index);
        }
        setSelectedIndex(index);
        setIsOpen(false);
    };
    const onToggleList = () => {
        setIsOpen(state => !state);
    };
    useEffect(() => {
        setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
    }, [labelRef.current?.offsetHeight]);
    let selectedOption = null;
    if (selectedIndex !== null && typeof selectedIndex == 'number') {
        selectedOption = options[selectedIndex];
    }
    return (React.createElement("div", { className: 'dse-select' },
        React.createElement("button", { ref: labelRef, className: 'dse-select__label', onClick: () => { onToggleList(); } },
            React.createElement("span", null,
                React.createElement(Text, null, selectedIndex === null ? label : selectedOption?.label)),
            React.createElement("svg", { width: '1rem', height: '1rem', fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }))),
        isOpen && React.createElement("ul", { style: { top: overlayTop }, className: 'dse-select__overlay' }, options.map((option, index) => {
            const isSelected = selectedIndex == index;
            return (React.createElement("li", { className: `dse-select__option ${isSelected ? 'dse-select__option--selected' : ''}`, onClick: () => onOptionHandler(option, index), key: index },
                React.createElement(Text, null, option.label),
                isSelected && React.createElement("svg", { width: '1rem', height: '1rem', fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }))));
        }))));
};

export { Select as default };
//# sourceMappingURL=index.js.map
