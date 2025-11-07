import { BullModule } from '@nestjs/bullmq';

export const redisConfig = BullModule.forRoot({
    connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
    },
});