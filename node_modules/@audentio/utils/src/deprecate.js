import logger from './logger';

const logged = {};

export default function deprecate(version, what, message) {
    if (!logger.groupCollapsed) return;
    if (logged[what]) return;

    logged[what] = true;

    logger.groupCollapsed(`%c${what} is deprecated and will be removed in version ${version}`, 'background-color:#FFF8DC');
    logger.log(message);
    logger.trace();
    logger.groupEnd();
}
