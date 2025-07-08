// app/page.tsx

import { ReactNode } from "react";
import "@/app/globals.css";

export default function Home() {
  return (
    <main className="flex flex-col items-center text-center min-h-screen p-6 text-white">
      <section className="mt-16 text-center max-w-xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to Your Web3 dApp Starter Kit!
        </h1>
        <p className="text-lg mb-6">
          Scaffolded with Next.js, TailwindCSS, Wagmi, and Reown AppKit — fully
          wired for fast dApp development.
        </p>
        <p className="mb-8">
          To begin, run <code>npm run dev</code> in the frontend folder, connect
          your wallet, and explore the magic!
        </p>
        <span className="text-center block mx-auto mt-5">
          <w3m-button />
        </span>
      </section>

      <footer className="mt-auto text-center py-6 text-sm text-gray-500">
        <p>
          Scaffold built by{" "}
          <a
            href="Saber-dev.vercel.app"
            className="font-medium text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Saber
          </a>
        </p>
        <div className="flex justify-center mt-2 space-x-4">
          <a
            href="https://github.com/Saber1Y"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://x.com/Sabercodes123"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </div>
        <p className="mt-2">
          &copy; {new Date().getFullYear()} Saber. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
