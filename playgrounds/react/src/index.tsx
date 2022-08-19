import React from "react";
import ReactDOM  from "react-dom";

import { Color, Margin, Select, Text } from '@ds.e/react'

import '@ds.e/scss/lib/Utilities.css'
import '@ds.e/scss/lib/Text.css'
import '@ds.e/scss/lib/Margin.css'
import '@ds.e/scss/lib/global.css' 
import '@ds.e/scss/lib/Select.css'

const options = [{
    label: 'Strict Black',
    value: 'strict-black'
}, {
    label: 'Heavenly Green',
    value: 'heavenly-green'
}, {
    label: 'Sweet Pink',
    value: 'pink'
}]


ReactDOM.render(
  (
    <div style={{ padding: '40px' }}>
        <Select
           options={options}
          //  renderOption={({ option, getOptionRecommendedProps }) => { 
          //    return (<p {...{...getOptionRecommendedProps(), className: `${getOptionRecommendedProps()?.className} dse-margin-none`}} >{option.label}</p>); 
          //   }}
         />
    </div>
  ),
  document.querySelector('#root')
)