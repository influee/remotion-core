"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.measureSpring = exports.spring = void 0;
const spring_utils_1 = require("./spring-utils");
/**
 * Calculates a position based on physical parameters, start and end value, and time.
 * @link https://www.remotion.dev/docs/spring
 * @param {number} frame The current time value. Most of the time you want to pass in the return value of useCurrentFrame.
 * @param {number} fps The framerate at which the animation runs. Pass in the value obtained by `useVideoConfig()`.
 * @param {?Object} config optional object that allows you to customize the physical properties of the animation.
 * @param {number} [config.mass=1] The weight of the spring. If you reduce the mass, the animation becomes faster!
 * @param {number} [config.damping=10] How hard the animation decelerates.
 * @param {number} [config.stiffness=100] Affects bounciness of the animation.
 * @param {boolean} [config.overshootClamping=false] Whether to prevent the animation going beyond the target value.
 * @param {?number} from The initial value of the animation. Default `0`
 * @param {?number} to The end value of the animation. Default `1`
 */
function spring({ frame, fps, config = {}, from = 0, to = 1, }) {
    const spr = (0, spring_utils_1.springCalculation)({
        fps,
        frame,
        config,
        from,
        to,
    });
    if (!config.overshootClamping) {
        return spr.current;
    }
    if (to >= from) {
        return Math.min(spr.current, to);
    }
    return Math.max(spr.current, to);
}
exports.spring = spring;
var measure_spring_1 = require("./measure-spring");
Object.defineProperty(exports, "measureSpring", { enumerable: true, get: function () { return measure_spring_1.measureSpring; } });
