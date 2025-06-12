import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class EncryptionService {
  private readonly key: string;

  constructor() {
    this.key = process.env.ENCRYPTION_KEY || 'your-encryption-key-should-be-in-env-file';
  }

  encrypt(data: any): string {
    const jsonData = typeof data === 'object' ? JSON.stringify(data) : data;
    
    return CryptoJS.AES.encrypt(jsonData, this.key).toString();
  }

  decrypt(encryptedData: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.key);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    
    try {
      return JSON.parse(decryptedData);
    } catch (e) {
      return decryptedData;
    }
  }
}