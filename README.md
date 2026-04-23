# 🗳️ VeritasVote: Enterprise-Grade Decentralized Voting Protocol

[![Solidity](https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white)](https://soliditylang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Foundry](https://img.shields.io/badge/Foundry-Built%20With-orange?style=for-the-badge)](https://book.getfoundry.sh/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**VeritasVote** adalah protokol tata kelola terdesentralisasi (Decentralized Governance) yang dirancang untuk memastikan transparansi total dalam pemilihan skala organisasi. Protokol ini menggunakan Smart Contract Ethereum untuk menghilangkan kebutuhan akan otoritas pusat, memastikan setiap suara dapat diverifikasi secara publik, dan mengotomatisasi distribusi insentif kepada pemenang.

---

## 🏗️ Technical Architecture

Protokol ini mengintegrasikan siklus hidup Web3 secara penuh:
- **Core Logic**: Smart Contract Solidity yang mengelola *state* kandidat, validasi pemilih, dan *escrow* reward.
- **Development Suite**: Menggunakan **Foundry** untuk pengujian unit dan manajemen *deployment*.
- **Client Interface**: Next.js 14 dengan *Responsive Design* dan integrasi **Wagmi/Viem** untuk sinkronisasi state blockchain secara atomik.
- **Security Engine**: Mekanisme penguncian status (State-Locking) untuk mencegah eksploitasi reward ganda.

---

## 🛠️ Prerequisites

Pastikan *environment* pengembangan Anda memenuhi standar berikut:
- **Node.js**: v18.17.0+ (LTS recommended)
- **Foundry Toolchain**: Install via `curl -L https://foundry.paradigm.xyz | bash`
- **Browser Wallet**: MetaMask dengan jaringan lokal Anvil terkonfigurasi.

---

## 📥 Installation & Setup

### 1. Clone Repository
```bash
git clone [https://github.com/NaufalAufaaAbyan/VeritasVote.git](https://github.com/NaufalAufaaAbyan/VeritasVote.git)
cd VeritasVote

2. Backend Infrastructure (Blockchain)

Lakukan kompilasi kontrak untuk menghasilkan artefak ABI:
Bash

cd blockchain
forge build

3. Frontend Application

Instalasi dependensi menggunakan NPM:
Bash

cd ../web-app
npm install

🚀 Execution Workflow
Step 1: Start Local Node

Jalankan simulator blockchain Ethereum di terminal terpisah:
Bash

anvil

Tip: Salin Private Key dari Account (0) untuk digunakan sebagai Administrator.
Step 2: Contract Deployment

Deploy kontrak ke jaringan Anvil:
Bash

cd blockchain
forge create --rpc-url [http://127.0.0.1:8545](http://127.0.0.1:8545) \
--private-key [YOUR_ADMIN_PRIVATE_KEY] \
src/VeritasVote.sol:VeritasVote --broadcast

Salin Contract Address yang dihasilkan.
Step 3: Frontend Synchronization

Buka file web-app/src/app/page.tsx dan perbarui konstanta berikut:
TypeScript

const CONTRACT_ADDRESS = "0x[YOUR_NEWLY_DEPLOYED_ADDRESS]";

Step 4: Launch Web Interface
Bash

cd web-app
npm run dev

Akses di http://localhost:3000
🦊 MetaMask Configuration (Anvil Sync)

Untuk berinteraksi dengan protokol di jaringan lokal:

    Network Setup:

        RPC URL: http://127.0.0.1:8545

        Chain ID: 31337

        Currency: ETH

    Account Sync: Import Private Key dari Anvil ke MetaMask.

    Nonce Synchronization: Jika terjadi galat transaksi, lakukan Settings > Advanced > Clear Activity Tab Data pada MetaMask.

🛡️ Core Protocol Security

    Sybil Attack Resistance: Validasi satu-suara-per-alamat melalui mapping(address => bool).

    Atomic Reward Transfer: Pengiriman reward 2 ETH dilakukan dalam satu atomik transaksi setelah verifikasi pemenang secara on-chain.

    Admin Privilege Separation: Fungsi krusial (tambahKandidat, resetVoting) dilindungi oleh modifier hanyaAdmin.

    Immutable State: Setelah sesi ditutup, perolehan suara tidak dapat diubah oleh siapapun, termasuk Admin.

👤 Solo Developer

Naufal

    GitHub: @NaufalAufaaAbyan

    Ecosystem: Universitas Dinamika Bangsa | Superteam Indonesia



# INGGRIS

# 🗳️ VeritasVote: Enterprise-Grade Decentralized Voting Protocol

[![Solidity](https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white)](https://soliditylang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Foundry](https://img.shields.io/badge/Foundry-Built%20With-orange?style=for-the-badge)](https://book.getfoundry.sh/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**VeritasVote** is a decentralized governance protocol designed to ensure total transparency in organizational elections. By leveraging Ethereum Smart Contracts, this protocol eliminates the need for central authorities, ensuring every vote is publicly verifiable, immutable, and incentivized through automated reward distribution.

---

## 🏗️ Technical Architecture

This protocol integrates a full Web3 lifecycle:
- **Core Logic**: Solidity Smart Contracts managing candidate states, voter validation, and reward escrow.
- **Development Suite**: Powered by **Foundry** for high-performance unit testing and deployment management.
- **Client Interface**: Next.js 14 featuring responsive design and **Wagmi/Viem** integration for atomic blockchain state synchronization.
- **Security Engine**: State-locking mechanisms to prevent double-voting and reward exploitation.

---

## 🛠️ Prerequisites

Ensure your development environment meets the following standards:
- **Node.js**: v18.17.0+ (LTS recommended)
- **Foundry Toolchain**: Install via `curl -L https://foundry.paradigm.xyz | bash`
- **Browser Wallet**: MetaMask with Anvil local network configured.

---

## 📥 Installation & Setup

### 1. Clone Repository
```bash
git clone [https://github.com/NaufalAufaaAbyan/VeritasVote.git](https://github.com/NaufalAufaaAbyan/VeritasVote.git)
cd VeritasVote

2. Backend Infrastructure (Blockchain)

Compile the contracts to generate ABI artifacts:
Bash

cd blockchain
forge build

3. Frontend Application

Install dependencies via NPM:
Bash

cd ../web-app
npm install

🚀 Execution Workflow
Step 1: Start Local Node

Run the Ethereum blockchain simulator in a separate terminal:
Bash

anvil

Tip: Copy the Private Key from Account (0) to use as the Administrator.
Step 2: Contract Deployment

Deploy the contract to the Anvil network:
Bash

cd blockchain
forge create --rpc-url [http://127.0.0.1:8545](http://127.0.0.1:8545) \
--private-key [YOUR_ADMIN_PRIVATE_KEY] \
src/VeritasVote.sol:VeritasVote --broadcast

Copy the generated Contract Address.
Step 3: Frontend Synchronization

Open web-app/src/app/page.tsx and update the following constant:
TypeScript

const CONTRACT_ADDRESS = "0x[YOUR_NEWLY_DEPLOYED_ADDRESS]";

Step 4: Launch Web Interface
Bash

cd web-app
npm run dev

Access the dashboard at http://localhost:3000
🦊 MetaMask Configuration (Anvil Sync)

To interact with the protocol on your local network:

    Network Setup:

        RPC URL: http://127.0.0.1:8545

        Chain ID: 31337

        Currency: ETH

    Account Sync: Import an Anvil Private Key into MetaMask.

    Nonce Synchronization: If transactions stay "pending," navigate to Settings > Advanced > Clear Activity Tab Data in MetaMask.

🛡️ Core Protocol Security

    Sybil Attack Resistance: Strict one-vote-per-address validation via mapping(address => bool).

    Atomic Reward Transfer: 2 ETH reward is distributed in a single atomic transaction upon on-chain winner verification.

    Admin Privilege Separation: Crucial functions (addCandidate, resetVoting) are protected by the onlyAdmin modifier.

    Immutable Results: Once a session is finalized, the vote count cannot be altered by any party, including the Administrator.

👤 Solo Developer

Naufal Aufaa Abyan

    GitHub: @NaufalAufaaAbyan

    University: Universitas Dinamika Bangsa
>>>>>>> 83a3ba4 (Menambahkan README.md Bahasa Inggris)
