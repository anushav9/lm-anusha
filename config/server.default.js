module.exports = {
    env: 'development',

    // pm2 process name
    // avoid changing once deployed
    process_name: 'laundrymate-site',

    // App server config
    express: {
        development: {
            port: 5000,
        },
        production: {
            port: 5000,
        },

        // Settings below do not apply to development server
        // ----
        
        // serve sourcemaps (default: false)
        // never enable on production servers
        // sourcemaps: false,

        // GZIP compression
        compression: true,

        // http auth. enabled if defined
        // auth: {
        //     username: 'user',
        //     password: 'pass',
        //     whitelist: [], // list of IPs that bypass auth
        // },
    },

    // Automatic deployment server config
    deployr: {
        port: 4000,

        // Optionally use a different key for git
        // GIT_SSH_COMMAND: 'ssh -i ~/.ssh/id_rsa',

        // Github webhook secret key (optional, to verify deploy request source)
        // key: '*********',

        // Branch to deploy from
        // branch: 'beta',

        // If defined, deployment notifications will be posted to slack channel defined here.
        // Messages are prefixed with `label` defined here
        // slack: {
        //     webhook: 'https://hooks.slack.com/services/xxxxx',
        //     channel: '#channel-name',
        //     label: 'clientdemo.themehouse.com:5005',
        // },
    },
};
