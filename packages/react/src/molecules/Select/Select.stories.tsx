import React from 'react'
import Select from '.'
import { ComponentStory, ComponentMeta } from '@storybook/react';

// css
import '@ds.e/scss/lib/Select.css'

const options = [{
    label: 'Strict Black',
    value: 'black'
}, {
    label: 'Heavenly Green',
    value: 'green'
}, {
    label: 'Sweet Pink',
    value: 'pink'
}]

export default {
    title: 'Molecules/Select',
    component: Select
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Common = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Common.args = {
  options: options
};

export const RenderOption = Template.bind({});
RenderOption.args = {
  options,
  renderOption: ({ getOptionRecommendedProps, option, isSelected }) => <span {...getOptionRecommendedProps()}>{option.label} {isSelected ? 'SELECTED !' : ''}</span>
}

export const CustomLabel = Template.bind({});
CustomLabel.args = {
  options,
  label: 'Select a color'
}