let logger = console;
const no_op = () => {};

if (process.env.NODE_ENV !== 'development') {
    logger = {
        warn: no_op,
        log: no_op,
        error: no_op,
        info: no_op,
    };
}

export default logger;
