import React from 'react';
import Spacing from '../../foundation/Spacing';
interface ColorProps {
    hexCode: string;
    height: keyof typeof Spacing;
    width: keyof typeof Spacing;
}
declare const Color: React.FC<ColorProps>;
export default Color;
