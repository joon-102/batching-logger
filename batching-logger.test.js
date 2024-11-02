const { BatchingLogger, LoggerEvent } = require('./dist/index');

const logger = new BatchingLogger({
    saveInterval: 50000000,
    minLogBufferLength: 1,
    maxLogBufferLength: 100
});

logger.on(LoggerEvent.SendSave, (logs , code) => {
    console.log('Logs saved:', logs);
    console.log(code)
});

logger.resolve('Log entry 1');
logger.resolve('Log entry 2');
logger.resolve('Log entry 3');

logger.forceSave()

console.log(logger.getLogs())
