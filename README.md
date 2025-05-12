# **batching-logger**

[![npm version](https://img.shields.io/npm/v/batching-logger?color=%2351F9C0&label=batching-logger)](https://www.npmjs.com/package/batching-logger)
![npm downloads](https://img.shields.io/npm/dt/batching-logger.svg?color=%2351FC0&maxAge=3600)

> 성능을 최적화하고 시스템 부하를 줄이기 위해 로그를 일괄적으로 저장합니다. 

## <i class="fa-solid fa-download"></i> **설치**
```bash
$ npm install batching-logger
```

## <i class="fa-solid fa-bookmark"></i> **사용법**
```js
const { BatchingLogger, LoggerEvent } = require('batching-logger');

const logger = new BatchingLogger({
  saveInterval: 5000,         // 로그 저장 주기 (기본값: 5000ms)
  minLogBufferLength: 1,      // 저장을 위한 최소 로그 개수 (기본값: 1)
  maxLogBufferLength: 500     // 최대 버퍼 크기 (기본값: 500)
});

logger.on(LoggerEvent.SendSave, (logs) => {
  console.log('Logs saved:', logs);
});

logger.resolve('Log entry 1');
logger.resolve({ message: 'Log entry 2' });
```

## <i class="fa-solid fa-bookmark"></i> **기능**

### `new BatchingLogger(options)`

| 옵션               | 설명                                      | 기본값    |
|--------------------|-------------------------------------------|------------|
| `saveInterval`     | 로그 저장 주기 (ms)                       | `5000`     |
| `minLogBufferLength` | 자동 저장을 위한 최소 로그 수          | `1`        |
| `maxLogBufferLength` | 최대 버퍼 크기, 초과 시 자동 저장됨     | `500`      |

### `logger.resolve(log)`

- 로그를 버퍼에 추가합니다.
- `Promise`도 지원되며, 자동으로 resolve됩니다.
- `maxLogBufferLength`에 도달하면 자동 저장됩니다.

```js
logger.resolve('text log');
logger.resolve({ type: 'info', message: 'structured log' });
```


### `logger.clearLogs()`

- 로그 버퍼를 초기화합니다.

```js
logger.clearLogs();
```


### `logger.getLogs()`

- 현재 로그 버퍼 상태를 배열로 반환합니다.

```js
const logs = logger.getLogs();
```


### `logger.startLogging()`

- 주기적인 자동 저장(SendSave)을 시작합니다.
- 생성자 호출 시 자동으로 실행됩니다.

```js
logger.startLogging();
```

### `logger.stopLogging()`

- 자동 저장 타이머를 중지합니다.

```js
logger.stopLogging();
```


### `logger.forceSave()`

- 버퍼에 남은 로그를 강제로 저장 이벤트로 전송합니다.

```js
logger.forceSave();
```


### `LoggerEvent.SendSave`

- 저장 이벤트가 발생할 때 실행됩니다.
- 로그 배열이 인자로 전달됩니다.

```js
logger.on(LoggerEvent.SendSave, (logs) => {
  console.log('Logs saved:', logs);
});
```