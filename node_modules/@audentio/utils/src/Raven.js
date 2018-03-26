let $Raven;

if (__BROWSER__) {
    $Raven = require('raven-js');
} else {
    $Raven = {
        captureException: () => {},
    };
}

module.exports = $Raven;
