import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { Injectable } from '@nestjs/common';

const scrypt = promisify(_scrypt);

@Injectable()
export class EncryptService {
  async encrypt(string: string): Promise<string> {
    // Generate Salt
    const salt = randomBytes(8).toString('hex');
    // Hash Salt and Password
    const hash = <Buffer>await scrypt(string, salt, 32);

    return [salt, hash.toString('hex')].join('.');
  }

  async verifyHash(string: string, hash: string): Promise<boolean> {
    const [salt, _hash] = hash.split('.');

    const strHash = <Buffer>await scrypt(string, salt, 32);

    return _hash === strHash.toString('hex');
  }
}
