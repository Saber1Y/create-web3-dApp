#!/usr/bin/env node

import prompts from "prompts";
import chalk from "chalk";
import fs from "fs-extra";
import { join } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

async function run() {
  const { projectName } = await prompts({
    type: "text",
    name: "projectName",
    message: "Enter your project name:",
    initial: "my-dapp",
  });

  const targetDir = join(process.cwd(), projectName);
  const frontendTemplate = join(__dirname, "templates/frontend");
  const backendTemplate = join(__dirname, "templates/backend");

  console.log(chalk.cyan("\n📦 Copying templates...\n"));
  await fs.copy(frontendTemplate, join(targetDir, "frontend"));
  await fs.copy(backendTemplate, join(targetDir, "backend"));

  console.log(chalk.cyan("\n📦 Installing frontend dependencies..."));
  execSync(`npm install`, {
    cwd: join(targetDir, "frontend"),
    stdio: "inherit",
  });

  console.log(chalk.cyan("\n🔧 Installing backend dependencies..."));
  execSync(`forge install`, {
    cwd: join(targetDir, "backend"),
    stdio: "inherit",
  });

  console.log(chalk.green("\n✅ Project setup complete!\n"));
  console.log(`📁 ${projectName}/frontend → run with: npm run dev`);
  console.log(`📁 ${projectName}/backend  → test with: forge test`);

  console.log(
    chalk.yellow(`
⚠️  Reminder: Add your Reown Cloud Project ID before running the app!

Create a \`.env.local\` file inside your frontend directory with this content:

  NEXT_PUBLIC_REOWN_PROJECT_ID=your_project_id_here

You can get your project ID here: https://cloud.reown.com

Happy coding! 🚀
`)
  );
}

run();
