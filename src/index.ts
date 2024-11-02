import { EventEmitter } from 'events';

export const LoggerEvent = {
    SendSave: "sendsave"
};

export interface BatchingLoggerOptions {
    saveInterval?: number;
    minLogBufferLength?: number;
    maxLogBufferLength?: number;
}

export class BatchingLogger extends EventEmitter {
    private logBuffer: (string | Promise<any>)[] = [];
    private interval: NodeJS.Timeout | null = null;
    private saveInterval: number;
    private minLogBufferLength: number;
    private maxLogBufferLength: number;

    constructor(options: BatchingLoggerOptions = {}) {
        super();
        const { saveInterval = 5000, minLogBufferLength = 1, maxLogBufferLength = 500 } = options;

        this.saveInterval = saveInterval;
        this.minLogBufferLength = minLogBufferLength;
        this.maxLogBufferLength = maxLogBufferLength;

        this.startLogging();
    }

    private async emitSendSave(buffer: (string | Promise<any>)[]): Promise<void> {
        const resolvedBuffer = await Promise.all(buffer);
        this.emit(LoggerEvent.SendSave, resolvedBuffer);
    }

    public startLogging(): void {
        if (this.interval) {
            clearInterval(this.interval);
        }
        
        this.interval = setInterval(async () => {
            if (this.logBuffer.length >= this.minLogBufferLength) {
                await this.emitSendSave(this.logBuffer);
                this.logBuffer = [];
            }
        }, this.saveInterval);
    }

    public async resolve(log: string | Promise<any>): Promise<void> {
        if (log instanceof Promise) {
            log = await log;
        }
        this.logBuffer.push(log);

        if (this.logBuffer.length >= this.maxLogBufferLength) {
            await this.emitSendSave(this.logBuffer);
            this.logBuffer = [];
        }
    }

    public async forceSave(): Promise<void> {
        if (this.logBuffer.length > 0) {
            await this.emitSendSave(this.logBuffer);
            this.logBuffer = [];
        }
    }

    public clearLogs(): void {
        this.logBuffer = [];
    }

    public stopLogging(): void {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    public getLogs(): (string | Promise<any>)[] {
        return [...this.logBuffer];
    }
}
