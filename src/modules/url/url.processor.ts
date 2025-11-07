import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { UrlService } from './url.service';

@Processor('clicks')
export class UrlProcessor extends WorkerHost {
    constructor(private readonly urlService: UrlService) {
        super();
    }

    async process(job: Job<{ short: string }>) {
        try {
            await this.urlService.incrementClickCount(job.data.short);
            console.log(`Clique incrementado: ${job.data.short}`);
        } catch (err) {
            console.error(`Falha ao processar: ${job.data.short}`, err);
        }
    }
}
