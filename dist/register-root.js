"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoot = exports.registerRoot = void 0;
let root = null;
const registerRoot = (comp) => {
    if (root) {
        throw new Error('registerRoot() was called more than once.');
    }
    root = comp;
};
exports.registerRoot = registerRoot;
const getRoot = () => {
    return root;
};
exports.getRoot = getRoot;
