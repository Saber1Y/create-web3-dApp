/**
 * 🛠 HOW TO USE YOUR ABI:
 * 1. After deploying your contract (e.g., using Foundry),
 *    locate the generated ABI file – e.g.:
 *    out/MyToken.sol/MyToken.json
 * 2. Copy this ABI into: frontend/abi/MyToken.json
 * 3. Update STAKE_STREAM_ADDRESS below with the address from your deployment
 */

import YourAbi from "@/abi/YourAbi.json";

// 👇 Replace with your real deployed address
export const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

// Export ABI object for contract interactions

export const contractAbi = YourAbi;
