import express from 'express';
import cors from 'cors';
import { ChatAnthropic } from "@langchain/anthropic";
import { HumanMessage } from "@langchain/core/messages";
import { UniswapTool } from '../src/tools/uniswapTool';
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { MemorySaver } from "@langchain/langgraph";
import { WardenAgentKit } from "@wardenprotocol/warden-agent-kit-core";
import { WardenToolkit } from "@wardenprotocol/warden-langchain";
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Verify environment variables
const requiredEnvVars = ['ANTHROPIC_API_KEY', 'GRAPH_API_KEY'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`Missing required environment variable: ${envVar}`);
    }
}

// CORS configuration
const allowedOrigins = [
    'https://adifi-4il7y1q3v-juls95s-projects.vercel.app', // Your Vercel deployment URL
    'http://localhost:3000',
    'http://localhost:5173',
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json());

// Initialize agent
let agent: any = null;
let isInitializing = false;

async function initializeAgent() {
    if (isInitializing) return;
    isInitializing = true;
    
    try {
        if (!process.env.ANTHROPIC_API_KEY) {
            throw new Error('ANTHROPIC_API_KEY is not set');
        }

        const llm = new ChatAnthropic({
            modelName: "claude-3-sonnet-20240229",
            anthropicApiKey: process.env.ANTHROPIC_API_KEY,
        });

        const config = {
            privateKeyOrAccount: process.env.PRIVATE_KEY as `0x${string}` || undefined,
        };

        const agentkit = new WardenAgentKit(config);
        const uniswapTool = new UniswapTool();
        const wardenToolkit = new WardenToolkit(agentkit as any);
        const tools = [...wardenToolkit.getTools(), uniswapTool];

        const memory = new MemorySaver();
        
        agent = await createReactAgent({
            llm,
            tools,
            checkpointSaver: memory,
            messageModifier: `
                You're a specialized Uniswap trading analyst. When users ask about Uniswap pools:
                1. ALWAYS use the get_uniswap_metrics tool with the exact pool address first
                2. Analyze the metrics and provide:
                   - Current market conditions
                   - Trading recommendation (Buy/Sell/Hold)
                   - Suggested entry price
                   - Recommended stop-loss level (usually 2-5% below entry for buys)
                   - Target price for taking profits
                3. Include a confidence level (Low/Medium/High) based on:
                   - Volume trends
                   - Price stability
                   - Liquidity depth
                4. Add risk warnings and remind users this is not financial advice
                
                Format your response like this:
                Market Analysis: [your analysis of current metrics]
                Trading Setup:
                - Recommendation: [Buy/Sell/Hold]
                - Entry Price: [price]
                - Stop Loss: [price]
                - Take Profit: [price]
                Confidence Level: [Low/Medium/High]
                Risk Warning: [your risk warning]
            `
        });

        console.log('Trading analysis agent initialized successfully');
        return agent;
    } catch (error) {
        console.error('Failed to initialize agent:', error);
        throw error;
    } finally {
        isInitializing = false;
    }
}

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ 
        status: 'API is running',
        environment: process.env.NODE_ENV,
        hasAnthropicKey: !!process.env.ANTHROPIC_API_KEY,
        hasGraphKey: !!process.env.GRAPH_API_KEY
    });
});

// Chat endpoint
app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        if (!agent) {
            console.log('Initializing agent...');
            await initializeAgent();
        }

        if (!agent) {
            return res.status(503).json({ error: 'Failed to initialize agent' });
        }

        console.log('Processing message:', message);
        const stream = await agent.stream(
            { messages: [new HumanMessage(message)] },
            { configurable: { thread_id: "Warden Agent Kit API!" } }
        );

        let response = '';
        for await (const chunk of stream) {
            if ("agent" in chunk) {
                response = chunk.agent.messages[0].content;
            } else if ("tools" in chunk) {
                response = chunk.tools.messages[0].content;
            }
        }

        res.json({ response });
    } catch (error: unknown) {
        console.error('Chat error:', error);
        res.status(500).json({ 
            error: error instanceof Error ? error.message : 'An unknown error occurred',
            details: error
        });
    }
});

// Export the Express app
export default app; 