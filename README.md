# 🚀 Create-web3-dapp NPM Package

A streamlined CLI that bootstraps a full-stack Web3 dApp in seconds — powered by Next.js, TailwindCSS, Wagmi, Reown AppKit, Solidity, and Foundry.

> 📘 **Contribute:** Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting issues or PRs.


---

## 🧩 Features

- 🏗️ **Single-command setup** — `npx create-web3-dapp@latest my-dapp`
- ⚛️ Frontend: Next.js (app-router), TypeScript, TailwindCSS, WAGMI & Reown AppKit wallet integration
- 🔗 Includes Anvil, Sepolia, Arbitrum, Mainnet support out of the box
- 🔧 Backend: Foundry scaffold for Solidity contracts (`forge test` included)
- 🔒 Auto-generated `.env.local.example` and post-install reminder to add your `NEXT_PUBLIC_REOWN_PROJECT_ID`
- 🔧 ESLint + Prettier integration for code quality

---

## Table of Contents
- [Features](#features)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [CLI Options](#cli-options)
- [Contributing](#contributing)
- [License](#license)

### 🚨 Note on Dependency Warnings

Some warnings or `npm audit` messages may appear during install — these are from dev tooling and do not affect the security or performance of your dApp. You can safely ignore them for development.


## 🏁 Quick Start

``` bash
npx create-web3-dapp@latest my-dapp
cd my-dapp/frontend
npm install
npm run dev

```

## Don't forget to set your Reown Cloud Project ID:

Create a .env.local in frontend/:

```bash
NEXT_PUBLIC_REOWN_PROJECT_ID=your_project_id_here
```

## 📂 Folder Structure
```bash
my-dapp/
├── frontend/        # Next.js + Wallet UI + Styling
│   ├── config/
│   ├── context/
│   ├── app/         # Routes, layout, globals.css
│   ├── .env.local*  # Add this after cloning!
│   └── package.json
└── backend/         # Foundry + Solidity scaffold
    ├── contracts/
    ├── test/
    └── forge.toml

```

## ⚙️ Usage

## Frontend
```bash
cd frontend
npm run dev
```
## Backend

```bash
cd backend
forge install
```

## 🛠️ Development & Contribution

```bash
git clone <this-repo>
cd create-web3-dapp
npm install
npm run lint
npm run format
```

```bash
# For testing locally:
npm link
create-web3-dapp test-app
```

## ⚙️ Technical Choices
- CLI tooling: prompts, chalk, fs-extra

- Linting: ESLint configured to support modern JS

- Formatting: Prettier (.prettierrc)

- Node engines: Supports Node >=18

- Adheres to CLI best practices—POSIX args, error handling, colorized output, clean UX.

## 📜 License
- MIT © Saber


## Contact
Saber • [@X Username](https://twitter.com/Sabercodes123) •  [GitHub/Saber1Y](https://github.com/Saber1Y) •  [Portfolio](https://Saber-dev.vercel.app)


