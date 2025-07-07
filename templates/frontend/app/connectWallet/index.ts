"use client";

import React, { useEffect } from "react";

// Required to register the Web3Modal custom elements
import "@web3modal/wagmi/react";

const WalletConnectButton: React.FC = () => {
  useEffect(() => {
    // Ensure web components are registered only once
    if (!customElements.get("w3m-button")) {
      import("@web3modal/wagmi/react");
    }
  }, []);

  return (
    <div>
      <w3m-button />
    </div>
  );
};

export default WalletConnectButton;
