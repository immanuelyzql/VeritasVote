# 🗳️ VeritasVote: Enterprise-Grade Decentralized Voting Protocol

[![Solidity](https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white)](https://soliditylang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Foundry](https://img.shields.io/badge/Foundry-Built%20With-orange?style=for-the-badge)](https://book.getfoundry.sh/)

---

## 🇺🇸 English Version

**VeritasVote** is a full-stack decentralized governance protocol. It leverages Ethereum Smart Contracts to ensure that every vote is transparent, publicly verifiable, and immutable. The protocol automates reward distribution to the winner via an on-chain escrow mechanism.

### 🛠️ Prerequisites & Installation

Before running the project, ensure you have the following installed:

1.  **Node.js (v18.x or later)**: For running the Next.js frontend.
2.  **Foundry Suite**: For Smart Contract development, testing, and local node simulation.
    ```bash
    curl -L [https://foundry.paradigm.xyz](https://foundry.paradigm.xyz) | bash
    foundryup
    ```
3.  **MetaMask Extension**: Browser wallet to interact with the local blockchain.

### 📥 Project Setup

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/NaufalAufaaAbyan/VeritasVote.git](https://github.com/NaufalAufaaAbyan/VeritasVote.git)
    cd VeritasVote
    ```
2.  **Install Frontend Dependencies**
    ```bash
    cd web-app
    npm install
    ```
3.  **Compile Smart Contracts**
    ```bash
    cd ../blockchain
    forge build
    ```

### 🚀 Execution Workflow

1.  **Start Local Blockchain**: Open a terminal and run `anvil`. Keep this running.
2.  **Deploy Contract**: Open another terminal and run:
    ```bash
    cd blockchain
    forge create --rpc-url [http://127.0.0.1:8545](http://127.0.0.1:8545) --private-key [ANVIL_PRIVATE_KEY_0] src/VeritasVote.sol:VeritasVote --broadcast
    ```
3.  **Link Frontend**: Copy the `Deployed to` address and paste it into `CONTRACT_ADDRESS` in `web-app/src/app/page.tsx`.
4.  **Run Web App**: 
    ```bash
    cd ../web-app
    npm run dev
    ```

### 🦊 MetaMask Integration

1.  **Add Local Network**: 
    - RPC URL: `http://127.0.0.1:8545`
    - Chain ID: `31337`
2.  **Import Accounts**: Import Anvil Private Keys (0) for Admin and (1, 2, etc.) for Voters.
3.  **Nonce Reset**: If transactions fail, go to *Settings > Advanced > Clear Activity Tab Data*.

---

## 🇮🇩 Bahasa Indonesia

**VeritasVote** adalah protokol tata kelola terdesentralisasi full-stack. Protokol ini menggunakan Smart Contract Ethereum untuk memastikan setiap suara bersifat transparan, dapat diverifikasi secara publik, dan absolut (immutable). Sistem ini mengotomatisasi distribusi reward kepada pemenang melalui mekanisme escrow on-chain.

### 🛠️ Prasyarat & Instalasi

Pastikan Anda telah menginstal perangkat lunak berikut:

1.  **Node.js (v18.x atau terbaru)**: Untuk menjalankan frontend Next.js.
2.  **Foundry Suite**: Untuk pengembangan, pengujian, dan simulasi blockchain lokal.
    ```bash
    curl -L [https://foundry.paradigm.xyz](https://foundry.paradigm.xyz) | bash
    foundryup
    ```
3.  **MetaMask Extension**: Wallet browser untuk berinteraksi dengan blockchain.

### 📥 Persiapan Proyek

1.  **Kloning Repositori**
    ```bash
    git clone [https://github.com/NaufalAufaaAbyan/VeritasVote.git](https://github.com/NaufalAufaaAbyan/VeritasVote.git)
    cd VeritasVote
    ```
2.  **Instalasi Dependensi Frontend**
    ```bash
    cd web-app
    npm install
    ```
3.  **Kompilasi Smart Contract**
    ```bash
    cd ../blockchain
    forge build
    ```

### 🚀 Panduan Penggunaan (Alur Kerja)

1.  **Jalankan Blockchain Lokal**: Buka terminal dan ketik `anvil`. Jangan tutup terminal ini.
2.  **Deploy Kontrak**: Buka terminal baru dan jalankan:
    ```bash
    cd blockchain
    forge create --rpc-url [http://127.0.0.1:8545](http://127.0.0.1:8545) --private-key [PRIV_KEY_ANVIL_0] src/VeritasVote.sol:VeritasVote --broadcast
    ```
3.  **Sinkronisasi Frontend**: Salin alamat `Deployed to` dan tempel ke variabel `CONTRACT_ADDRESS` di file `web-app/src/app/page.tsx`.
4.  **Jalankan Web App**: 
    ```bash
    cd ../web-app
    npm run dev
    ```

### 🎮 Cara Penggunaan di Browser

1.  **Setup MetaMask**: Tambahkan jaringan manual (RPC: `http://127.0.0.1:8545`, Chain ID: `31337`). Import Private Key dari Anvil ke MetaMask.
2.  **Registrasi (Admin)**: Gunakan Akun Admin (0) untuk mendaftarkan nama kandidat dan alamat wallet mereka.
3.  **Voting (Pemilih)**: Ganti akun MetaMask ke Akun Pemilih (1/2/3). Pilih kandidat dan konfirmasi transaksi.
4.  **Selesaikan (Admin)**: Kembali ke Akun Admin, klik "Selesaikan Pemilihan" (Konfirmasi 2x). Reward 2 ETH akan terkirim otomatis ke pemenang.
5.  **Reset**: Klik "Reset Sesi" untuk menghapus semua data kandidat dan memulai pemilihan baru tanpa deploy ulang.

---

## 🛡️ Security Features (Fitur Keamanan)
- **Sybil Resistance**: Strict one-vote-per-address validation / Validasi ketat satu-suara-per-alamat.
- **State-Locking**: Voting and registration are locked once the session is finalized / Voting dan registrasi dikunci otomatis saat sesi berakhir.
- **Access Control**: Critical functions are protected by `onlyAdmin` modifier / Fungsi krusial dilindungi oleh modifier `hanyaAdmin`.

---

## 👤 Solo Developer
**Naufal Aufaa Abyan**
- **GitHub**: [@NaufalAufaaAbyan](https://github.com/NaufalAufaaAbyan)
- **Institution**: Universitas Dinamika Bangsa