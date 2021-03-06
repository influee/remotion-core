export declare const DELAY_RENDER_CALLSTACK_TOKEN = "The delayRender was called:";
/**
 * Call this function to tell Remotion to wait before capturing this frame until data has loaded. Use continueRender() to unblock the render.
 * @param label _optional_ A label to identify the call in case it does time out.
 * @returns {number} An identifier to be passed to continueRender().
 * @link https://www.remotion.dev/docs/delay-render
 */
export declare const delayRender: (label?: string | undefined) => number;
/**
 * Unblock a render that has been blocked by delayRender()
 * @param handle The return value of delayRender().
 * @link https://www.remotion.dev/docs/continue-render
 */
export declare const continueRender: (handle: number) => void;
