import React, { useRef, useState, useEffect, createRef } from 'react';
import Text from '../../atoms/Text/index.js';

const KEY_CODES = {
    ENTER: 13,
    SPACE: 32,
    DOWN_ARROW: 40,
    ESC: 27,
    UP_ARROW: 38
};
const getNextOptionIndex = (currentIndex, options) => {
    if (currentIndex === null) {
        return 0;
    }
    if (currentIndex === options.length - 1) {
        return 0;
    }
    return currentIndex + 1;
};
const getPrevOptionIndex = (currentIndex, options) => {
    if (currentIndex === null) {
        return 0;
    }
    if (currentIndex === 0) {
        return options.length - 1;
    }
    return currentIndex - 1;
};
const Select = ({ options = [], label = 'Please select an option...', onOptionSelected, renderOption }) => {
    const labelRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [overlayTop, setOverlayTop] = useState();
    const [optionRefs, setOptionRefs] = useState();
    const [highlightIndex, setHighlightIndex] = useState();
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
    const highlightItem = (index) => {
        setHighlightIndex(index);
    };
    const onButtonKeyDown = (e) => {
        e.preventDefault();
        if ([KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(e.keyCode)) {
            setIsOpen(true);
            //set focus on list item
            highlightItem(0);
        }
    };
    useEffect(() => {
        setOptionRefs(options.map(_ => createRef()));
    }, [options.length]);
    useEffect(() => {
        if (typeof highlightIndex == 'number' && isOpen) {
            const ref = optionRefs[highlightIndex];
            console.log(highlightIndex, ref);
            if (ref && ref.current) {
                ref.current.focus();
            }
        }
    }, [isOpen, highlightIndex]);
    const onOptionKeyDown = (e) => {
        if (e.keyCode == KEY_CODES.ESC) {
            setIsOpen(false);
            return;
        }
        if (e.keyCode === KEY_CODES.DOWN_ARROW && typeof highlightIndex == 'number') {
            highlightItem(getNextOptionIndex(highlightIndex, options));
        }
        if (e.keyCode === KEY_CODES.UP_ARROW && typeof highlightIndex == 'number') {
            highlightItem(getPrevOptionIndex(highlightIndex, options));
        }
        if (e.keyCode === KEY_CODES.ENTER && typeof highlightIndex == 'number') {
            onOptionHandler(options[highlightIndex], highlightIndex);
        }
    };
    return (React.createElement("div", { className: 'dse-select' },
        React.createElement("button", { onKeyDown: onButtonKeyDown, ref: labelRef, "aria-expanded": isOpen ? true : undefined, "aria-haspopup": true, "aria-controls": 'dse-select-list', className: 'dse-select__label', onClick: () => { onToggleList(); } },
            React.createElement("span", null,
                React.createElement(Text, null, selectedIndex === null ? label : selectedOption?.label || 'Please select an option...')),
            React.createElement("svg", { className: `dse-select__caret ${isOpen ? 'dse-select__caret--open' : 'dse-select__caret--close'}`, width: '1rem', height: '1rem', fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }))),
        isOpen && React.createElement("ul", { onKeyDown: onOptionKeyDown, id: 'dse-select-list', style: { top: overlayTop }, className: 'dse-select__overlay' }, options.map((option, index) => {
            const isSelected = selectedIndex == index;
            const isHighlighted = highlightIndex == index;
            const ref = optionRefs[index];
            const renderOntionProps = {
                option,
                isSelected,
                getOptionRecommendedProps: (overrideProps = {}) => ({
                    className: `dse-select__option ${isSelected ? 'dse-select__option--selected' : ''} ${isHighlighted ? 'dse-select__option--highlighted' : ''}`,
                    'aria-checked': isSelected ? true : undefined,
                    'aria-label': option.label,
                    role: 'menuitemradio',
                    key: option.value,
                    ref,
                    tabIndex: isHighlighted ? -1 : 0,
                    onMouseEnter: () => highlightItem(index),
                    onMouseLeave: () => highlightItem(null),
                    onClick: () => onOptionHandler(option, index),
                    ...overrideProps
                })
            };
            if (renderOption) {
                return renderOption(renderOntionProps);
            }
            return (React.createElement("li", { ...renderOntionProps.getOptionRecommendedProps(), key: index },
                React.createElement(Text, null, option.label),
                isSelected && React.createElement("svg", { width: '1rem', height: '1rem', fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }))));
        }))));
};

export { Select as default };
//# sourceMappingURL=index.js.map
