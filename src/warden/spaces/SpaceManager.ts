import { Space, SpaceConfig } from '@wardenprotocol/warden-agent-kit-core';
import { wardenKit } from '../config';

export class SpaceManager {
  private spaces: Map<string, Space> = new Map();

  async createTradeSpace(config: SpaceConfig) {
    try {
      const space = await wardenKit.spaces.create({
        name: config.name,
        description: config.description,
        owners: config.owners,
        permissions: {
          canExecuteTrades: config.owners,
          canModifyStrategy: config.owners,
        },
      });
      
      this.spaces.set(space.id, space);
      return space;
    } catch (error) {
      console.error('Failed to create trade space:', error);
      throw error;
    }
  }

  async getSpace(spaceId: string) {
    return this.spaces.get(spaceId);
  }

  async requireMultiSigApproval(spaceId: string, transactionHash: string) {
    const space = await this.getSpace(spaceId);
    if (!space) throw new Error('Space not found');

    return space.requestApproval({
      transactionHash,
      requiredSigners: space.config.owners,
    });
  }
} 