export default {
    // {time} tense - past/future/present
    tense: timestring => {
        const now = Date.now();
        const time = new Date(timestring).getTime();
        if (now - time > 0) {
            return 'past';
        } else if (now === time) {
            return 'present';
        }
        return 'future';
    },

    // Seconds since {time}
    since: timestring => {
        const now = Date.now();
        const time = new Date(timestring).getTime();
        return (now - time) / 1000; // in seconds
    },

    // Seconds until {time}
    until: timestring => {
        const now = Date.now();
        const time = new Date(timestring).getTime();
        return (time - now) / 1000; // in seconds
    },
};
