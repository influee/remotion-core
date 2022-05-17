"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Composition = exports.Folder = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const CompositionManager_1 = require("./CompositionManager");
const nonce_1 = require("./nonce");
const truthy_1 = require("./truthy");
const use_lazy_component_1 = require("./use-lazy-component");
const validate_composition_id_1 = require("./validation/validate-composition-id");
const validate_dimensions_1 = require("./validation/validate-dimensions");
const validate_duration_in_frames_1 = require("./validation/validate-duration-in-frames");
const validate_folder_name_1 = require("./validation/validate-folder-name");
const validate_fps_1 = require("./validation/validate-fps");
const FolderContext = (0, react_1.createContext)({
    folderName: null,
    parentName: null,
});
const Folder = ({ name, children, }) => {
    const parent = (0, react_1.useContext)(FolderContext);
    const { registerFolder, unregisterFolder } = (0, react_1.useContext)(CompositionManager_1.CompositionManager);
    (0, validate_folder_name_1.validateFolderName)(name);
    const parentNameArr = [parent.parentName, parent.folderName].filter(truthy_1.truthy);
    const parentName = parentNameArr.length === 0 ? null : parentNameArr.join('/');
    const value = (0, react_1.useMemo)(() => {
        return {
            folderName: name,
            parentName,
        };
    }, [name, parentName]);
    (0, react_1.useEffect)(() => {
        registerFolder(name, parentName);
        return () => {
            unregisterFolder(name, parentName);
        };
    }, [name, parent.folderName, parentName, registerFolder, unregisterFolder]);
    return ((0, jsx_runtime_1.jsx)(FolderContext.Provider, { value: value, children: children }, void 0));
};
exports.Folder = Folder;
const Composition = ({ width, height, fps, durationInFrames, id, defaultProps, ...compProps }) => {
    const { registerComposition, unregisterComposition } = (0, react_1.useContext)(CompositionManager_1.CompositionManager);
    const lazy = (0, use_lazy_component_1.useLazyComponent)(compProps);
    const nonce = (0, nonce_1.useNonce)();
    const { folderName, parentName } = (0, react_1.useContext)(FolderContext);
    (0, react_1.useEffect)(() => {
        // Ensure it's a URL safe id
        if (!id) {
            throw new Error('No id for composition passed.');
        }
        (0, validate_composition_id_1.validateCompositionId)(id);
        (0, validate_dimensions_1.validateDimension)(width, 'width', 'of the <Composition/> component');
        (0, validate_dimensions_1.validateDimension)(height, 'height', 'of the <Composition/> component');
        (0, validate_duration_in_frames_1.validateDurationInFrames)(durationInFrames, 'of the <Composition/> component');
        (0, validate_fps_1.validateFps)(fps, 'as a prop of the <Composition/> component');
        registerComposition({
            durationInFrames,
            fps,
            height,
            width,
            id,
            folderName,
            component: lazy,
            defaultProps,
            nonce,
            parentFolderName: parentName,
        });
        return () => {
            unregisterComposition(id);
        };
    }, [
        durationInFrames,
        fps,
        height,
        lazy,
        id,
        folderName,
        defaultProps,
        registerComposition,
        unregisterComposition,
        width,
        nonce,
        parentName,
    ]);
    return null;
};
exports.Composition = Composition;
