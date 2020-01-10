/**
 * @summary The error type that's expected to be thrown in the various preloading plugins.
 * @remarks Make sure to capture and rethrow errors in your own preloading plugins
 * as PreloadingError as this error type will be captured by the PluginManagerPreloadingStrategy.
 */
export class PreloadingError extends Error {
    constructor(
        /**
         * @summary The message about the cause of this error.
         * @optional
         */
        public message: string = null,
        /**
         * @summary The original error that was wrapped in this error.
         * @optional
         */
        public innerException: Error = null,
    ) {
        super();
    }
}
