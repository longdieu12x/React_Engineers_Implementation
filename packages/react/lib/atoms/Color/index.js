import React from 'react';
import Spacing from '../../foundation/Spacing.js';

const Color = ({ hexCode, height = Spacing.sm, width = Spacing.sm }) => {
    return (React.createElement("div", { className: `dse-width-${width} dse-height-${height}`, style: {
            backgroundColor: hexCode,
        } }));
};

export { Color as default };
//# sourceMappingURL=index.js.map
