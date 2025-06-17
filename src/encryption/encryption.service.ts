// src/encryption/encryption.service.ts
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly aesSessionKeys = new Map<string, Buffer>();

  setAESKey(sessionId: string, key: Buffer) {
    this.aesSessionKeys.set(sessionId, key);
  }

  getAESKey(sessionId: string): Buffer | undefined {
    return this.aesSessionKeys.get(sessionId);
  }

  encryptWithAES(data: string, aesKey: Buffer): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return JSON.stringify({ iv: iv.toString('base64'), data: encrypted });
  }

  encrypt(data: any, sessionId: string): any {
    if(!sessionId) {
      throw new Error('Session ID is required for encryption');
    }
    const aesKey = this.getAESKey(sessionId);
    if (!aesKey) {
      throw new Error(`AES key not found for session: ${sessionId}`);
    }

    const jsonData = typeof data === 'object' ? JSON.stringify(data) : String(data);
    return this.encryptWithAES(jsonData, aesKey);
  }
}
