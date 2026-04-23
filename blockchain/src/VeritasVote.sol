// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

contract VeritasVote {
    struct Kandidat {
        uint256 id;
        string nama;
        address payable dompetKandidat;
        uint256 jumlahSuara;
    }

    address public admin;
    bool public votingSelesai;
    uint256 public totalKandidat;
    uint256 public constant REWARD_AMOUNT = 2 ether;

    mapping(uint256 => Kandidat) public daftarKandidat;
    mapping(address => bool) public hasVoted;
    address[] private pemilih; // List untuk tracking siapa aja yang udah vote buat di-reset

    constructor() {
        admin = msg.sender;
    }

    modifier hanyaAdmin() {
        require(msg.sender == admin, "Hanya Admin!");
        _;
    }

    function tambahKandidat(string memory _nama, address payable _dompet) public hanyaAdmin {
        require(!votingSelesai, "Sesi sedang ditutup");
        totalKandidat++;
        daftarKandidat[totalKandidat] = Kandidat(totalKandidat, _nama, _dompet, 0);
    }

    function berikanSuara(uint256 _idKandidat) public {
        require(!votingSelesai, "Voting Selesai");
        require(!hasVoted[msg.sender], "Sudah Vote");
        require(_idKandidat > 0 && _idKandidat <= totalKandidat, "ID Salah");

        hasVoted[msg.sender] = true;
        pemilih.push(msg.sender);
        daftarKandidat[_idKandidat].jumlahSuara++;
    }

    function selesaikanPemilihan() public hanyaAdmin {
        require(!votingSelesai, "Reward sudah dikirim!"); // GEMBOK KEAMANAN
        require(address(this).balance >= REWARD_AMOUNT, "Saldo Kurang");
        require(totalKandidat > 0, "Tidak ada kandidat");

        uint256 idPemenang = 1;
        for (uint256 i = 2; i <= totalKandidat; i++) {
            if (daftarKandidat[i].jumlahSuara > daftarKandidat[idPemenang].jumlahSuara) {
                idPemenang = i;
            }
        }

        votingSelesai = true;
        (bool success, ) = daftarKandidat[idPemenang].dompetKandidat.call{value: REWARD_AMOUNT}("");
        require(success, "Gagal kirim reward");
    }

    // FUNGSI RESET: Menghapus semua data untuk sesi baru
    function resetVoting() public hanyaAdmin {
        for (uint256 i = 1; i <= totalKandidat; i++) {
            delete daftarKandidat[i];
        }
        for (uint256 i = 0; i < pemilih.length; i++) {
            delete hasVoted[pemilih[i]];
        }
        delete pemilih;
        totalKandidat = 0;
        votingSelesai = false;
    }

    function getAllKandidat() public view returns (Kandidat[] memory) {
        Kandidat[] memory result = new Kandidat[](totalKandidat);
        for (uint256 i = 0; i < totalKandidat; i++) {
            result[i] = daftarKandidat[i + 1];
        }
        return result;
    }

    receive() external payable {}
}