import React, { useState, useRef, useEffect } from 'react'
import Text from '../../atoms/Text'

interface SelectOption {
  label: string;
  value: string;
}
interface SelectProps {
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void
  options?: SelectOption[];
  label?: string;
}

const Select: React.FC<SelectProps> = ({ options = [], label = 'Please select an option...', onOptionSelected}) => {
  const labelRef = useRef<HTMLButtonElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<null | number>()
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [overlayTop, setOverlayTop] = useState<number>();

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

  return (
    <div className='dse-select'>
      <button ref={labelRef} className='dse-select__label' onClick={() => { onToggleList() }}>
        <span>
          <Text>
            {selectedIndex === null ? label : selectedOption?.label}
          </Text>
        </span>
        <svg width='1rem' height='1rem' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      </button>
      {isOpen && <ul style={{ top: overlayTop }} className='dse-select__overlay'>
        {options.map((option, index) => {
          const isSelected = selectedIndex == index;
          return (
            <li className={`dse-select__option ${isSelected ? 'dse-select__option--selected' : ''}`} onClick={() => onOptionHandler(option, index)} key={index}>
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