"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimelineClipName = void 0;
const react_1 = require("react");
const getTimelineClipName = (children) => {
    var _a;
    const tree = (_a = react_1.Children.map(children, (ch) => {
        if (!(0, react_1.isValidElement)(ch)) {
            return null;
        }
        // Must be name, not ID
        const name = typeof ch.type !== 'string' && ch.type.name;
        if (name) {
            return name;
        }
        if (ch.props.children) {
            const chName = (0, exports.getTimelineClipName)(ch.props.children);
            return chName;
        }
        return null;
    })) === null || _a === void 0 ? void 0 : _a.filter(Boolean);
    return (tree === null || tree === void 0 ? void 0 : tree.length) ? tree[0] : '';
};
exports.getTimelineClipName = getTimelineClipName;
