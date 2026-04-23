// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/VeritasVote.sol";

contract VeritasVoteTest is Test {
    VeritasVote public vote;
    address admin = address(1);
    address pemilih1 = address(2);
    address kandidat1 = address(3);

    function setUp() public {
        vm.prank(admin);
        vote = new VeritasVote();
    }

    function testTambahKandidat() public {
        vm.prank(admin);
        vote.tambahKandidat("Budi", payable(kandidat1));
        
        // GANTI CARA AMBIL DATA:
        VeritasVote.Kandidat memory k = vote.getKandidat(1);
        assertEq(k.nama, "Budi");
        assertEq(k.id, 1);
    }

    function testGagalVoteDuaKali() public {
        vm.prank(admin);
        vote.tambahKandidat("Budi", payable(kandidat1));

        vm.prank(pemilih1);
        vote.berikanSuara(1);

        vm.expectRevert("Anda sudah memberikan suara sebelumnya!");
        vm.prank(pemilih1);
        vote.berikanSuara(1);
    }

    function testRewardKirim() public {
        vm.prank(admin);
        vote.tambahKandidat("Budi", payable(kandidat1));

        vm.prank(pemilih1);
        vote.berikanSuara(1);

        // Simulasi isi saldo kontrak 2 ETH
        vm.deal(address(vote), 2 ether);

        uint256 saldoAwalKandidat = kandidat1.balance;

        vm.prank(admin);
        vote.selesaikanPemilihan();

        assertEq(kandidat1.balance, saldoAwalKandidat + 2 ether);
        assertTrue(vote.votingSelesai());
    }
}