import React from 'react';
import { Spacing } from '@ds.e/foundation';

const Color = ({ hexCode, height = Spacing.sm, width = Spacing.sm }) => {
    return (React.createElement("div", { className: `dse-width-${width} dse-height-${height}`, style: {
            backgroundColor: hexCode,
        } }));
};

export { Color as default };
//# sourceMappingURL=index.js.map
