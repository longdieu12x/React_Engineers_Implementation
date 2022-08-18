import React from 'react';

const Margin = ({ space = 'none', children, left, right, bottom, top }) => {
    let className = ``;
    if (!left && !right && !bottom && !top) {
        className = `${className} dse-margin-${space}`;
    }
    if (left) {
        className = `${className} dse-margin-left-${space}`;
    }
    if (right) {
        className = `${className} dse-margin-right-${space}`;
    }
    if (top) {
        className = `${className} dse-margin-top-${space}`;
    }
    if (bottom) {
        className = `${className} dse-margin-bottom-${space}`;
    }
    return (React.createElement("div", { className: className },
        " ",
        children,
        " "));
};

export { Margin as default };
//# sourceMappingURL=index.js.map
