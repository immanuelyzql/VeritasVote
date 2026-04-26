# 🗳️ VeritasVote: Enterprise-Grade Decentralized Voting Protocol

[![Solidity](https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white)](https://soliditylang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Foundry](https://img.shields.io/badge/Foundry-Built%20With-orange?style=for-the-badge)](https://book.getfoundry.sh/)

---

## 🇺🇸 English Version

**VeritasVote** is a full-stack decentralized governance protocol. It leverages Ethereum Smart Contracts to ensure that every vote is transparent, publicly verifiable, and immutable. The protocol automates reward distribution to the winner via an on-chain escrow mechanism.

### 🛠️ Prerequisites
- **Node.js (v18.x or later)**
- **Foundry Suite**: [Installation Guide](https://book.getfoundry.sh/getting-started/installation)
- **MetaMask**: Browser Extension

### 📥 Project Setup
1. **Clone the Repository**
   ```bash
   git clone https://github.com/immanuelyzql/VeritasVote.git
   cd VeritasVote
   ```
2. **Install Frontend Dependencies**
   ```bash
   cd web-app
   npm install
   ```
3. **Compile Smart Contracts**
   ```bash
   cd ../blockchain
   forge build
   ```

### 🚀 Execution Workflow
1. **Start Local Blockchain**: Run `anvil` in a separate terminal.
2. **Deploy Contract**: 
   ```bash
   forge create --rpc-url http://127.0.0.1:8545 --private-key [ANVIL_PRIVATE_KEY_0] src/VeritasVote.sol:VeritasVote --broadcast
   ```
3. **Sync Frontend**: Update `CONTRACT_ADDRESS` in `web-app/src/app/page.tsx` with the deployed address.
4. **Run Web App**:
   ```bash
   cd ../web-app
   npm run dev
   ```

---

## 🇮🇩 Bahasa Indonesia

**VeritasVote** adalah protokol tata kelola terdesentralisasi full-stack. Menggunakan Smart Contract Ethereum untuk memastikan setiap suara transparan, dapat diverifikasi secara publik, dan absolut (*immutable*). Sistem ini mengotomatisasi distribusi reward melalui mekanisme *escrow on-chain*.

### 🛠️ Prasyarat & Instalasi
1. **Node.js (v18.x+)**: Untuk menjalankan frontend Next.js.
2. **Foundry Suite**: Untuk pengembangan & simulasi blockchain lokal.
   ```bash
   curl -L https://foundry.paradigm.xyz | bash
   foundryup
   ```
3. **MetaMask**: Wallet browser untuk interaksi transaksi.

### 🚀 Panduan Penggunaan (Workflow)

| Step | Komponen | Perintah / Tugas |
| :--- | :--- | :--- |
| 1 | **Local Node** | Jalankan `anvil` di terminal (biarkan menyala). |
| 2 | **Deploy** | Gunakan `forge create` dengan Private Key 0 dari Anvil. |
| 3 | **Integrasi** | Salin alamat kontrak ke `CONTRACT_ADDRESS` di `page.tsx`. |
| 4 | **Frontend** | Jalankan `npm run dev` di folder `web-app`. |

### 🎮 Cara Penggunaan di Browser
1. **Setup MetaMask**: Tambahkan jaringan lokal (RPC: `http://127.0.0.1:8545`, Chain ID: `31337`).
2. **Import Akun**: Import Private Key (0) untuk Admin dan (1, 2, dst) untuk Voter.
3. **Registrasi**: Admin mendaftarkan kandidat dan alamat walletnya.
4. **Voting**: Akun pemilih memberikan suara via UI.
5. **Finalisasi**: Admin menutup sesi, reward 2 ETH otomatis terkirim ke pemenang.

---

## 🛡️ Keamanan & Fitur
- **Sybil Resistance**: Validasi satu-suara-per-alamat.
- **State-Locking**: Voting otomatis terkunci setelah sesi difinalisasi.
- **Access Control**: Fungsi kritikal dilindungi oleh modifier `onlyAdmin`.

---
*Built by [immanuelyzql](https://github.com/immanuelyzql)*
