# .cursorrules

## Project Overview

*   **Type:** cursorrules_file
*   **Actual Status:** Current Status of the project is using langchaing with Claude to analyze data from the blockchain wich is obtained from The Graph and take actions based on the analysis. It has a simple user interface where users can ask the agent information about the trading volume and liquidity on Uniswap, and the agent will answer the user based on the information obtained from the blockchain. Current UI must be considered as a reference for the new UI that we will build to meet the new requirements described below.
*   **Description:** I'm building a decentralized finance (DeFi) monitoring agent utilizing the Warden Protocol Agent Kit. This tool tracks real-time trading volume and liquidity on Uniswap, detects significant market moves, and shows the trades directly in the home page. It features a robust dashboard for visualizing current metrics and historical trends and integrates blockchain interaction plaftorms (The Graph) and must user WardenToolkit also to interacte with Blockchian, with Node.js processing and a React.js frontend.
With the data from the blockchain, it must use Warden's LangChain extension to enable the agent to analyze the data and take actions based on the analysis using Claude. We should also consider to user the Warden-Natice AI Integration considering the following:
-Price prediction system
-Integration with Warden's x/asyn module
-Implement AI-driven price predictions
-Performance monitoring tools
It's fundamental that this program uses the Warden Protocol Features which are described and explained below:
- Spaces Implementation: Must create dedicated trading spaces for different strategias, implement space-based permissions for trade execution and use spacae owner for muli-sig trade approvals.
- Keychain Integration: Should be able to generate and manage Keys for trade execution, implement signature requests for trade validation and use keychains for secure transaction signing.
- Rules System: Should implement admin rules for strategy modification, create signing rules for trade execution and set up default rules for basic operations.
It's also important that the program uses the Smart Contracts on Warden Chain (Chiado) where intergrated with Warden precomiles (X/Warden for key management, X/Oracle for price feeds and x/async for AI Predictions). It is important to consider building and using the contracts with the new features as Space-Aware Trading (Space-based trade execution, multi-signature trade validation and rule-based trade approvals) and keychain integration (Signature request handling, key-based authentication and tranction signing via warden keychains).
And now, as the final step, we should consider the following:
Social Trading Features (Strategy sharing which includes share successful strategies, clone popular trading spaces and community strategy ratings and also and Achievement System considering Trading Milestones, Strategy Perdomance badges and community recognition awards)
If possible, we should also consider the following:
- Trading competitions (Strategy Performance Leages and Reward Distribution system)

The success of this program will be measured by the following metrics:
- Successftuls integration of all Warden Protocol Features.
- Smart Contract deployment and verification on Warden Chain (Chiado).
- AI Predictions accuracy and performance.
*   **Primary Goal:** The tool is designed to continuously monitor Blockhain (i.e. Uniswap)’s trading volume and liquidity metrics to identify critical market movements, enabling users to quickly seize emerging financial opportunities. It will and must use Warden's Protocol Features and Smart Contracts to analyze information, execute contracts and do all the features that are described above.

## Project Structure

### Framework-Specific Routing

*   **Directory Rules:**

    *   React Router 6: Uses a structure based on `src/routes/` where routes are defined with the `createBrowserRouter` API for clear, component-based navigation.
    *   Example 1: "Next.js 14 (App Router)" → `app/[route]/page.tsx` conventions
    *   Example 2: "Next.js (Pages Router)" → `pages/[route].tsx` pattern
    *   Example 3: "React Router 6" → `src/routes/` with `createBrowserRouter`

### Core Directories

*   **Versioned Structure:**

    *   src/routes: Houses route definitions and page-level components for the dashboard, login, alerts, and historical data views following React Router 6 patterns.
    *   src/components: Contains reusable UI components built in TypeScript with React.js, integrating tools like V0 by Vercel for modern design patterns.
    *   server: Hosts backend logic including real-time data processing, blockchain integrations (via Web3.js/Ethers.js), and alerting system built with Node.js.

### Key Files

*   **Stack-Versioned Patterns:**

    *   src/routes/dashboard.tsx: Implements the main dashboard layout displaying live Uniswap metrics and historical trend analysis.
    *   src/routes/login.tsx: Handles user authentication flows using a wallet connection or what's suggested for Wargen AI agent kit, ensuring secure sign-in/sign-up experiences.
    *   server/alerts.sol: Manages the node-based alerting system interfacing with logic to store data in Warden Blockchain and show it in the dashboard.

## Tech Stack Rules

*   **Version Enforcement:**

    *   typescript@4+: Ensures strong typing across both the frontend and backend codebases.
    *   react-router-dom@6: Mandates usage of React Router 6 with component-based routing in `src/routes/`.
    *   node@14+: Specifies backend runtime version to support modern JavaScript features required for real-time data processing.

## PRD Compliance

*   **Non-Negotiable:**

    *   "Tracks Uniswap’s trading volume and liquidity continuously, providing up-to-the-minute data." : The system must deliver real-time monitoring and alert notifications as described in the PRD, ensuring data accuracy and rapid response for significant market moves.

## App Flow Integration

*   **Stack-Aligned Flow:**

    *   Example: "React Router 6 Auth Flow → src/routes/login.tsx for authentication and src/routes/dashboard.tsx for real-time monitoring." Users log in to access a dashboard displaying live market insights, history, and customizable alert settings integrated with continuous backend processing.
