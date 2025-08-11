const log = (level, message, data = {}) => {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, level, message, ...data };

    if (level === 'error') {
        console.error(JSON.stringify(logEntry));
    }
    else if (level === 'warn') {
        console.warn(JSON.stringify(logEntry));
    }
    else {
        console.log(JSON.stringify(logEntry));
    }
};

module.exports = {
    info: (message, data = {}) => log('info', message, data),
    warn: (message, data = {}) => log('warn', message, data),
    error: (message, data = {}) => log('error', message, data),

    debug: (message, data) => process.env.NODE_ENV !== 'production' && log('debug', message, data)
};