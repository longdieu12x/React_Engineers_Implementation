import React, { useState, useRef, useEffect, KeyboardEventHandler, createRef } from 'react'
import Text from '../../atoms/Text'

const KEY_CODES = {
  ENTER: 13, 
  SPACE: 32,
  DOWN_ARROW: 40,
  ESC: 27,
  UP_ARROW: 38
}

interface SelectOption {
  label: string;
  value: string;
}

interface OptionRecommendedPropsReturn {
  className: string;
  key: string;
  onClick?: () => void
}
interface RenderOptionProps {
  isSelected: boolean;
  option: SelectOption;
  getOptionRecommendedProps: (overrideProps?: Object) => OptionRecommendedPropsReturn
}
interface SelectProps {
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void
  options?: SelectOption[];
  label?: string;
  renderOption?: (props: RenderOptionProps) => React.ReactNode;
}

const getNextOptionIndex = (currentIndex: number | null, options: Array<SelectOption>) => {
  if (currentIndex === null) {
    return 0;
  }
  if (currentIndex === options.length - 1) {
    return 0;
  }
  return currentIndex + 1;
}
const getPrevOptionIndex = (currentIndex: number | null, options: Array<SelectOption>) => {
  if (currentIndex === null) {
    return 0;
  }
  if (currentIndex === 0) {
    return options.length - 1;
  }
  return currentIndex - 1;
}


const Select: React.FC<SelectProps> = ({ options = [], label = 'Please select an option...', onOptionSelected, renderOption}) => {
  const labelRef = useRef<HTMLButtonElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<null | number>()
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [overlayTop, setOverlayTop] = useState<number>();
  const [optionRefs, setOptionRefs] = useState<React.RefObject<HTMLLIElement>[]>();
  const [highlightIndex, setHighlightIndex] = useState<number | null>()

  const onOptionHandler = (option: SelectOption, index: number) => {
    if (onOptionSelected){
      onOptionSelected(option, index);
    }
    setSelectedIndex(index);
    setIsOpen(false);
  }

  const onToggleList = () => {
    setIsOpen(state => !state)
  }

  useEffect(() => {
    setOverlayTop((labelRef.current?.offsetHeight || 0) + 10 )
  }, [labelRef.current?.offsetHeight]);

  let selectedOption = null;

  if (selectedIndex !== null && typeof selectedIndex == 'number'){
    selectedOption = options[selectedIndex];
  }

  const highlightItem = (index: number | null) => {
    setHighlightIndex(index);
  }

  const onButtonKeyDown: KeyboardEventHandler = (e) => {
    e.preventDefault();
    if ([KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(e.keyCode)){
      setIsOpen(true)

      //set focus on list item
      highlightItem(0);
    }
  }

  useEffect(() => {
    setOptionRefs(options.map(_ => createRef<HTMLLIElement>()));
  }, [options.length]);

  useEffect(() => {
    if (typeof highlightIndex == 'number' && isOpen){
      const ref = optionRefs![highlightIndex];
      console.log(highlightIndex, ref);
      if (ref && ref.current){
        ref.current.focus();
      }
    }
  }, [isOpen, highlightIndex]);

  const onOptionKeyDown: KeyboardEventHandler = (e) => {
    if (e.keyCode == KEY_CODES.ESC){
      setIsOpen(false);
      return;
    }
    if (e.keyCode === KEY_CODES.DOWN_ARROW && typeof highlightIndex == 'number'){
      highlightItem(getNextOptionIndex(highlightIndex, options));
    }
    if (e.keyCode === KEY_CODES.UP_ARROW && typeof highlightIndex == 'number'){
      highlightItem(getPrevOptionIndex(highlightIndex, options));
    }
    if (e.keyCode === KEY_CODES.ENTER && typeof highlightIndex == 'number'){
      onOptionHandler(options[highlightIndex!],highlightIndex!);
    }
  }


  return (
    <div className='dse-select'>
      <button onKeyDown={onButtonKeyDown} ref={labelRef} aria-expanded={isOpen ? true: undefined}
      aria-haspopup={true} aria-controls='dse-select-list' className='dse-select__label' onClick={() => { onToggleList() }}>
        <span>
          <Text>
            {selectedIndex === null ? label : selectedOption?.label || 'Please select an option...'}
          </Text>
        </span>
        <svg className={`dse-select__caret ${isOpen ? 'dse-select__caret--open' : 'dse-select__caret--close'}`} width='1rem' height='1rem' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {isOpen && <ul onKeyDown={onOptionKeyDown} id='dse-select-list' style={{ top: overlayTop }} className='dse-select__overlay'>
        {options.map((option, index) => {
          const isSelected = selectedIndex == index;
          const isHighlighted = highlightIndex == index;

          const ref = optionRefs![index];

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
          }
          if (renderOption) {
            return renderOption(renderOntionProps);
          }
          return (
            <li {...renderOntionProps.getOptionRecommendedProps()} key={index}>
              <Text>
                {option.label}
              </Text>
              {isSelected && <svg width='1rem' height='1rem' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
            </li>
          )}
        )}
      </ul>}
    </div>
  )
}

export default Select