import log4js from "log4js"


log4js.configure({
    appenders: {
        loggerConsole: { type: 'console' },
        loggerWarn: { type: 'file', filename: 'warn.log' },
        loggerError: { type: 'file', filename: 'error.log' }
    },
    categories: {
        default: { appenders: ['loggerConsole'], level: 'info' },
        warnFile: { appenders: ['loggerWarn'], level: 'warn' },
        errorFile: { appenders: ['loggerError'], level: 'error' }
    }
})

export const logDefault = log4js.getLogger('default')
export const logWarn = log4js.getLogger('warnFile')
export const logError = log4js.getLogger('errorFile')