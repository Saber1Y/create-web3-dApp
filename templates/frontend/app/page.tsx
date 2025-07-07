import WalletConnectButton from "@/WalletConnect/WalletConnectButton";

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Welcome</h1>
      <WalletConnectButton />
    </main>
  );
}
