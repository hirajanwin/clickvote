import { Injectable, Module, OnModuleInit } from '@nestjs/common';
import { createClient } from 'redis';

const client = createClient({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  url: process.env.REDIS_URL,
});

const pubSub = client.duplicate();

@Injectable()
export class RedisService implements OnModuleInit {
  async onModuleInit() {
    await client.connect();
  }

  client() {
    return client;
  }

  pubSub() {
    return pubSub;
  }
}
