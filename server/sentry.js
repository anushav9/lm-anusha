import Raven from 'raven';
import appConfig from '../config/application';

// Setup sentry
Raven.config(
    appConfig.sentryDSN_private,
    { release: process.env.RELEASE },
    { tags: { bundle: 'server' } },
).install();
