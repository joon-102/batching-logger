# **batching-logger**

![Image](https://img.shields.io/npm/v/batching-logger?color=%2351F9C0&label=batching-logger)
![Image](https://img.shields.io/npm/dt/batching-logger.svg?color=%2351FC0&maxAge=3600)

![Image](https://nodei.co/npm/batching-logger.png?downloads=true&downloadRank=true&stars=true)
<br>
성능을 최적화하고 시스템 부하를 줄이기 위해 로그를 일괄적으로 저장합니다. 📜

## <i class="fa-solid fa-download"></i> **Installation**
```bash
$ npm install batching-logger
```

## <i class="fa-solid fa-bookmark"></i> **Example**
```js
const { BatchingLogger, LoggerEvent } = require('batching-logger');
```
- "saveInterval" 로그를 저장하는 주기(간격)를 밀리초 단위로 설정합니다. (기본값 : 5000ms)
- "minLogBufferLength" 로그 버퍼에 저장된 로그가 자동으로 저장되기 위해 필요한 최소 로그 개수입니다. (기본값 : 1)
- "maxLogBufferLength" 로그 버퍼에 저장할 수 있는 최대 로그 개수입니다. (기본값 : 500)
```js
const logger = new BatchingLogger({
    saveInterval: 5000,
    minLogBufferLength: 1,
    maxLogBufferLength: 500
});
```
## <i class="fa-solid fa-bookmark"></i> **Function**
### SendSave
```js
logger.on(LoggerEvent.SendSave, (log) => {
    console.log('Logs saved:', logs);
});
```
- **"saveInterval" 시간마다 로그 버퍼에 저장된 데이터를 전송합니다.**  
- **데이터 전송 후 로그 버퍼에 저장된 데이터는 삭제됩니다**
### resolve
```js
logger.resolve('Log entry 1');
logger.resolve({ message : "Log entry 2" });
```
- **로그 버퍼에 데이터를 추가합니다.**
### forceSave
```js
logger.forceSave()
```
- **SendSave 이벤트를 강제적으로 작동시킵니다.**
- **데이터 전송 후 로그 버퍼에 저장된 데이터는 삭제됩니다**
### clearLogs
```js
logger.clearLogs()
```
- **로그 버퍼에 저장된 데이터를 삭제합니다.**
### getLogs
```js
logger.getLogs()
```
- **로그 버퍼에 저장된 데이터를 얻어옵니다.**
### startLogging
```js
logger.startLogging()
```
- **SendSave 이벤트를 시작합니다.**
- **기존 BatchingLogger 를 시작하면 SendSave 이벤트는 같이 시작됩니다.**
### startLogging
```js
logger.stopLogging()
```
- **SendSave 이벤트를 중지합니다.**
