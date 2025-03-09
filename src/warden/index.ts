import { SpaceManager } from './spaces/SpaceManager';
import { KeyManager } from './keychain/KeyManager';
import { RuleEngine } from './rules/RuleEngine';
import { wardenKit, wardenLangChain } from './config';

export class WardenProtocolManager {
  public spaces: SpaceManager;
  public keychain: KeyManager;
  public rules: RuleEngine;

  constructor() {
    this.spaces = new SpaceManager();
    this.keychain = new KeyManager();
    this.rules = new RuleEngine();
  }

  async initialize() {
    try {
      await wardenKit.connect();
      console.log('Warden Protocol initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Warden Protocol:', error);
      throw error;
    }
  }

  // Example usage for trade execution
  async executeTrade(spaceId: string, tradeDetails: any) {
    // 1. Verify space permissions
    const space = await this.spaces.getSpace(spaceId);
    if (!space) throw new Error('Trading space not found');

    // 2. Generate trade key
    const tradeKey = await this.keychain.generateTradeKey(spaceId);

    // 3. Create and sign transaction
    const transaction = await wardenKit.createTransaction(tradeDetails);
    const signature = await this.keychain.signTransaction(
      transaction.hash,
      tradeKey.id
    );

    // 4. Request multi-sig approval if required
    await this.spaces.requireMultiSigApproval(spaceId, transaction.hash);

    // 5. Execute trade
    return wardenKit.submitTransaction(transaction, signature);
  }
} 