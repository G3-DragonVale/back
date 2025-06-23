// src/encryption/encryption.service.ts
import Redis from 'ioredis';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({ host: 'redis', port: 6379 });
  }

  async setAESKey(sessionId: string, key: Buffer) {
    await this.redis.set(`aes:${sessionId}`, key.toString('base64'));
  }

  async getAESKey(sessionId: string): Promise<Buffer | undefined> {
    const value = await this.redis.get(`aes:${sessionId}`);
    return value ? Buffer.from(value, 'base64') : undefined;
  }

  encryptWithAES(data: string, aesKey: Buffer): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return JSON.stringify({ iv: iv.toString('base64'), data: encrypted });
  }

  async encrypt(data: any, sessionId: string): Promise<any> {
    if (!sessionId) {
      throw new Error('Session ID is required for encryption');
    }
    const aesKey = await this.getAESKey(sessionId);
    if (!aesKey) {
      throw new Error(`AES key not found for session: ${sessionId}`);
    }

    const jsonData =
      typeof data === 'object' ? JSON.stringify(data) : String(data);
    return this.encryptWithAES(jsonData, aesKey);
  }
}
