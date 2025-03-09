import { Rule, RuleConfig } from '@wardenprotocol/warden-agent-kit-core';
import { wardenKit } from '../config';

export class RuleEngine {
  async createAdminRule(config: RuleConfig) {
    try {
      const rule = await wardenKit.rules.create({
        type: 'admin',
        conditions: config.conditions,
        actions: config.actions,
        priority: 'high',
      });

      return rule;
    } catch (error) {
      console.error('Failed to create admin rule:', error);
      throw error;
    }
  }

  async createSigningRule(config: RuleConfig) {
    try {
      const rule = await wardenKit.rules.create({
        type: 'signing',
        conditions: config.conditions,
        requiredSigners: config.requiredSigners,
        priority: 'medium',
      });

      return rule;
    } catch (error) {
      console.error('Failed to create signing rule:', error);
      throw error;
    }
  }

  async createDefaultRule(config: RuleConfig) {
    try {
      const rule = await wardenKit.rules.create({
        type: 'default',
        conditions: config.conditions,
        actions: config.actions,
        priority: 'low',
      });

      return rule;
    } catch (error) {
      console.error('Failed to create default rule:', error);
      throw error;
    }
  }
} 