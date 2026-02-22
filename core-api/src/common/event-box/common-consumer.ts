import { ContextKey } from '@common/context';
import { OnWorkerEvent, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { asyncLocalStorage } from '@common/context';

export abstract class CommonConsumer extends WorkerHost {
  private readonly logger = new Logger();

  protected readonly methodHandlerMap = new Map<string, (data: any) => Promise<void>>();

  async process(job: Job) {
    const {
      name,
      data: { payload },
    } = job;

    const handler = this.getHandler(name);
    const store = this.getContext(job);

    await asyncLocalStorage.run(store, async () => {
      await handler(JSON.parse(payload));
    });
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job<{ txId: string; eventType: string }>, error: Error) {
    this.logger.error(`[txId: ${job.data.txId}] ${job.data.eventType} is not success.`, error.stack);
  }

  private getHandler(name: string) {
    const handler = this.methodHandlerMap.get(name);

    if (!handler) {
      throw new Error(`Handler for job ${name} not found`);
    }

    return handler;
  }

  private getContext(job: Job<{ txId: string }>) {
    const store = new Map();
    store.set(ContextKey.TXID, job.data.txId);

    return store;
  }
}
