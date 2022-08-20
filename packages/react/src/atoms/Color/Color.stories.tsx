import React from 'react'
import Color from '.'
import { withA11y } from '@storybook/addon-a11y'
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { text, select } from '@storybook/addon-knobs'

import { Spacing } from '@ds.e/foundation'

// css
import '@ds.e/scss/lib/Utilities.css'

export default {
    title: 'Atoms/Color',
    component: Color
} as ComponentMeta<typeof Color>;

const Template: ComponentStory<typeof Color> = (args) => <Color {...args} />;

export const Common = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Common.args = {
  hexCode: text('HexCode', 'pink')
};

export const CustomDimensions = Template.bind({});

CustomDimensions.args = {
  hexCode: text('HexCode', 'pink'),
  width: select('Width', Object.values(Spacing), 'xxl'),
  height: select('Height', Object.values(Spacing), 'xxl')
}
