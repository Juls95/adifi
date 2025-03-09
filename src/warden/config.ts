import { WardenAgentKit } from '@wardenprotocol/warden-agent-kit-core';
import { WardenLangChain } from '@wardenprotocol/warden-langchain';

export const wardenConfig = {
  // Your chain configuration
  chainId: 'warden-testnet-1',
  rpcEndpoint: 'https://rpc-testnet.wardenprotocol.org',
  restEndpoint: 'https://rest-testnet.wardenprotocol.org',
};

// Initialize Warden Agent Kit
export const wardenKit = new WardenAgentKit({
  config: wardenConfig,
});

// Initialize LangChain extension
export const wardenLangChain = new WardenLangChain({
  agentKit: wardenKit,
}); 