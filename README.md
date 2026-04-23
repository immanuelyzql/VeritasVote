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