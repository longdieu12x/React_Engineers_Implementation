import React from 'react';
interface SelectOption {
    label: string;
    value: string;
}
interface OptionRecommendedPropsReturn {
    className: string;
    key: string;
    onClick?: () => void;
}
interface RenderOptionProps {
    isSelected: boolean;
    option: SelectOption;
    getOptionRecommendedProps: (overrideProps?: Object) => OptionRecommendedPropsReturn;
}
interface SelectProps {
    onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
    options?: SelectOption[];
    label?: string;
    renderOption?: (props: RenderOptionProps) => React.ReactNode;
}
declare const Select: React.FC<SelectProps>;
export default Select;
