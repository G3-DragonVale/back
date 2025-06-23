import { Controller, Post, Body } from '@nestjs/common';
import * as crypto from 'crypto';
import { EncryptionService } from './encryption.service';
import { HandCheckDTO } from './dto/handshake.dto';

@Controller()
export class EncryptionController {
  constructor(private readonly encryptionService: EncryptionService) { }

  @Post('handshake')
  async handshake(@Body() body: HandCheckDTO) {
    const { publicKey, sessionId } = body;

    const pubKey = crypto.createPublicKey({
      key: publicKey,
      format: 'pem',
    });

    const aesKey = crypto.randomBytes(32);
    const encryptedAES = crypto.publicEncrypt(
      {
        key: pubKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      aesKey,
    );

    await this.encryptionService.setAESKey(sessionId, aesKey);

    console.log(
      'Backend AES key:',
      aesKey.toString('base64'),
      'SessionId:',
      sessionId,
      'Length:',
      aesKey.length,
    );

    return {
      aesKey: encryptedAES.toString('base64'),
    };
  }
}
