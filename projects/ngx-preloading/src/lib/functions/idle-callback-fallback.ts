export const requestIdleFallback = (cb: Function) => {
    const start = Date.now();
    return setTimeout(() => {
        cb({
            didTimeout: false,
            timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
        });
    }, 1);
};
