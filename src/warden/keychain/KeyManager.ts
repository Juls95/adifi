import { Keychain } from '@wardenprotocol/warden-agent-kit-core';
import { wardenKit } from '../config';

export class KeyManager {
  private keychain: Keychain;

  constructor() {
    this.keychain = wardenKit.keychain;
  }

  async generateTradeKey(spaceId: string) {
    try {
      const key = await this.keychain.generateKey({
        type: 'trade',
        metadata: {
          spaceId,
          purpose: 'trade_execution',
        },
      });

      return key;
    } catch (error) {
      console.error('Failed to generate trade key:', error);
      throw error;
    }
  }

  async signTransaction(transactionHash: string, keyId: string) {
    try {
      const signature = await this.keychain.sign({
        keyId,
        message: transactionHash,
      });

      return signature;
    } catch (error) {
      console.error('Failed to sign transaction:', error);
      throw error;
    }
  }
} 