"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Img = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const delay_render_1 = require("./delay-render");
const ImgRefForwarding = ({ onLoad, onError, ...props }, ref) => {
    const [handle] = (0, react_1.useState)(() => (0, delay_render_1.delayRender)('Loading <Img> with src=' + props.src));
    (0, react_1.useEffect)(() => {
        if (ref &&
            ref.current.complete) {
            (0, delay_render_1.continueRender)(handle);
        }
    }, [handle, ref]);
    const didLoad = (0, react_1.useCallback)((e) => {
        (0, delay_render_1.continueRender)(handle);
        onLoad === null || onLoad === void 0 ? void 0 : onLoad(e);
    }, [handle, onLoad]);
    const didGetError = (0, react_1.useCallback)((e) => {
        (0, delay_render_1.continueRender)(handle);
        if (onError) {
            onError(e);
        }
        else {
            console.error('Error loading image:', e, 'Handle the event using the onError() prop to make this message disappear.');
        }
    }, [handle, onError]);
    return (0, jsx_runtime_1.jsx)("img", { ...props, ref: ref, onLoad: didLoad, onError: didGetError }, void 0);
};
exports.Img = (0, react_1.forwardRef)(ImgRefForwarding);
