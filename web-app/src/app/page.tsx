'use client'
import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useReadContract, useWriteContract } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { 
  ShieldCheck, Trophy, Plus, Wallet, LogOut, 
  UserCircle2, Loader2, CheckCircle2, Vote, 
  RefreshCw, LayoutDashboard, Fingerprint, Activity 
} from 'lucide-react'

// PASTIIN ALAMAT INI SAMA DENGAN HASIL DEPLOY DI TERMINAL!
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

const ABI = [
  {"type":"function","name":"admin","inputs":[],"outputs":[{"type":"address"}],"stateMutability":"view"},
  {"type":"function","name":"hasVoted","inputs":[{"type":"address","name":""}],"outputs":[{"type":"bool"}],"stateMutability":"view"},
  {"type":"function","name":"getAllKandidat","inputs":[],"outputs":[{"type":"tuple[]","components":[{"type":"uint256","name":"id"},{"type":"string","name":"nama"},{"type":"address","name":"dompetKandidat"},{"type":"uint256","name":"jumlahSuara"}]}],"stateMutability":"view"},
  {"type":"function","name":"tambahKandidat","inputs":[{"type":"string","_nama":"string"},{"type":"address","_dompet":"address"}],"outputs":[],"stateMutability":"nonpayable"},
  {"type":"function","name":"berikanSuara","inputs":[{"type":"uint256","_idKandidat":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},
  {"type":"function","name":"selesaikanPemilihan","inputs":[],"outputs":[],"stateMutability":"nonpayable"},
  {"type":"function","name":"resetVoting","inputs":[],"outputs":[],"stateMutability":"nonpayable"},
  {"type":"function","name":"votingSelesai","inputs":[],"outputs":[{"type":"bool"}],"stateMutability":"view"}
] as const

export default function VeritasVote() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { writeContract, isPending } = useWriteContract()
  
  const [form, setForm] = useState({ nama: '', wallet: '' })
  const [confirmFinish, setConfirmFinish] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Mencegah hydration error
  useEffect(() => { setMounted(true) }, [])

  const { data: adminAddr, refetch: refetchAdmin } = useReadContract({ abi: ABI, address: CONTRACT_ADDRESS, functionName: 'admin' })
  const { data: kandidatList, refetch: refetchKandidat } = useReadContract({ abi: ABI, address: CONTRACT_ADDRESS, functionName: 'getAllKandidat' })
  const { data: isEnded, refetch: refetchStatus } = useReadContract({ abi: ABI, address: CONTRACT_ADDRESS, functionName: 'votingSelesai' })
  const { data: userHasVoted, refetch: refetchUserVote } = useReadContract({ 
    abi: ABI, address: CONTRACT_ADDRESS, functionName: 'hasVoted', args: [address as `0x${string}`],
    query: { enabled: !!address } 
  })

  // LOGIKA ADMIN: Paksa True jika menggunakan Wallet Anvil (0) atau jika terdeteksi di kontrak
  const ADMIN_ANVIL_0 = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  const isAdmin = address?.toLowerCase() === ADMIN_ANVIL_0.toLowerCase() || 
                  (address && adminAddr && address.toLowerCase() === (adminAddr as string).toLowerCase())

  useEffect(() => {
    if (mounted) {
      const interval = setInterval(() => {
        refetchKandidat(); refetchStatus(); refetchAdmin(); refetchUserVote();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [mounted, refetchKandidat, refetchStatus, refetchAdmin, refetchUserVote]);

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-blue-500/30">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-blue-600/20 blur-[120px] -z-10 opacity-50"></div>

      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <span className="font-black text-xl tracking-tight text-white italic uppercase">Veritas<span className="text-blue-500">Vote</span></span>
          </div>

          <div className="flex items-center gap-4">
            {isConnected ? (
              <div className="flex items-center gap-3 bg-slate-800/50 p-1.5 pr-4 rounded-2xl border border-slate-700/50">
                <div className="h-8 w-8 bg-linear-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center font-bold text-xs text-white">
                  {address?.slice(2,4).toUpperCase()}
                </div>
                <div className="hidden sm:block">
                  <p className="text-[10px] text-slate-500 font-bold leading-none">CONNECTED</p>
                  <p className="text-xs font-mono text-blue-400">{address?.slice(0,6)}...{address?.slice(-4)}</p>
                </div>
                <button onClick={() => disconnect()} title="Logout" className="ml-2 p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button onClick={() => connect({ connector: injected({ target: 'metaMask' }) })} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2">
                <Wallet size={18} /> Connect MetaMask
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6">
              <Activity size={14} className="animate-pulse" /> UNIVERSITAS DINAMIKA BANGSA
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6">
              Masa Depan <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">Demokrasi Kampus</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
              Platform voting on-chain pertama yang menjamin keamanan suara melalui Smart Contract Ethereum. Transparan, Akuntabel, dan Terdesentralisasi.
            </p>
          </div>
          <div className="w-full lg:w-96 grid grid-cols-2 gap-4">
            <div className="bg-slate-800/40 p-6 rounded-4xl border border-slate-700/50">
              <p className="text-3xl font-black text-white">{kandidatList?.length || 0}</p>
              <p className="text-slate-500 text-xs font-bold uppercase mt-1">Kandidat</p>
            </div>
            <div className="bg-slate-800/40 p-6 rounded-4xl border border-slate-700/50 text-blue-400">
              <Fingerprint size={32} />
              <p className="text-slate-500 text-xs font-bold uppercase mt-4">Verified On-Chain</p>
            </div>
          </div>
        </div>

        {/* ADMIN PANEL: Muncul Jika Konek Sebagai Akun (0) */}
        {isAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 p-8 text-blue-600/10 pointer-events-none"><LayoutDashboard size={120} /></div>
              <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div> REGISTRASI KANDIDAT
              </h3>
              {!isEnded ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 relative z-10">
                  <input placeholder="Nama Lengkap" className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} />
                  <input placeholder="Wallet Address (0x...)" className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono text-sm text-white" value={form.wallet} onChange={e => setForm({...form, wallet: e.target.value})} />
                  <button disabled={isPending} onClick={() => writeContract({ abi: ABI, address: CONTRACT_ADDRESS, functionName: 'tambahKandidat', args: [form.nama, form.wallet as `0x${string}`] })} className="sm:col-span-2 bg-white text-slate-900 font-black py-4 rounded-2xl hover:bg-blue-400 transition-all flex items-center justify-center gap-2">
                    {isPending ? <Loader2 className="animate-spin" /> : <><Plus size={20}/> Daftarkan Kandidat Sekarang</>}
                  </button>
                </div>
              ) : (
                <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl text-center">
                  <p className="text-blue-400 font-bold">Sesi voting telah berakhir.</p>
                </div>
              )}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black text-white mb-2 uppercase">Finalisasi</h3>
                <p className="text-slate-500 text-sm italic">Distribusi reward 2 ETH ke pemenang suara terbanyak.</p>
              </div>
              {!isEnded ? (
                <button onClick={() => { if (!confirmFinish) { setConfirmFinish(true); setTimeout(() => setConfirmFinish(false), 3000); } else { writeContract({ abi: ABI, address: CONTRACT_ADDRESS, functionName: 'selesaikanPemilihan' }); setConfirmFinish(false); } }} className={`w-full py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all duration-300 ${confirmFinish ? 'bg-orange-600 scale-105' : 'bg-slate-800 hover:bg-slate-700'} text-white shadow-xl`}>
                  {confirmFinish ? 'KONFIRMASI AKHIR' : <><Trophy size={20} className="text-yellow-500" /> Tutup Sesi</>}
                </button>
              ) : (
                <button onClick={() => writeContract({ abi: ABI, address: CONTRACT_ADDRESS, functionName: 'resetVoting' })} className="w-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all border border-red-500/20">
                  <RefreshCw size={20} className={isPending ? 'animate-spin' : ''} /> Reset Sesi
                </button>
              )}
            </div>
          </div>
        )}

        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Daftar Kandidat Terpilih</h3>
          <div className="h-px flex-1 bg-slate-800 mx-8"></div>
          {isEnded && <span className="text-amber-500 font-black text-xs px-4 py-2 bg-amber-500/10 rounded-full border border-amber-500/20 italic tracking-widest">FINAL RESULT</span>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {kandidatList?.map((k) => (
            <div key={k.id.toString()} className="bg-slate-900 border border-slate-800 rounded-4xl p-8 hover:border-blue-500/50 transition-all duration-500 group relative">
              <div className="h-20 w-20 bg-slate-800 rounded-4xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-500 shadow-xl shadow-black/20">
                <UserCircle2 size={40} className="text-slate-500 group-hover:text-white" />
              </div>
              <h4 className="text-center font-black text-2xl text-white mb-2 tracking-tight uppercase italic">{k.nama}</h4>
              <p className="text-center text-[10px] text-slate-500 font-mono mb-8 opacity-50">{k.dompetKandidat}</p>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-3xl p-6 flex flex-col items-center mb-8">
                <span className="text-5xl font-black text-white tracking-tighter group-hover:text-blue-400 transition-colors">{k.jumlahSuara.toString()}</span>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2">Verified Votes</p>
              </div>
              {!isEnded && isConnected && (
                <button disabled={isPending || userHasVoted as boolean} onClick={() => writeContract({ abi: ABI, address: CONTRACT_ADDRESS, functionName: 'berikanSuara', args: [k.id] })} className={`w-full py-5 rounded-4xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 ${userHasVoted ? 'bg-slate-800 text-slate-600 border border-slate-700 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-900/40 active:scale-95'}`}>
                  {isPending ? <Loader2 className="animate-spin" /> : userHasVoted ? <><CheckCircle2 size={18}/> Voted</> : <><Vote size={18}/> Cast Vote</>}
                </button>
              )}
            </div>
          ))}
          {(!kandidatList || kandidatList.length === 0) && (
            <div className="col-span-full py-32 bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-4xl text-center">
              <Activity size={48} className="mx-auto text-slate-700 mb-6 animate-pulse" />
              <p className="text-slate-500 font-black text-xl uppercase tracking-tighter italic opacity-50">Belum Ada Kandidat Terdaftar</p>
            </div>
          )}
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-800 text-center">
        <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.5em] italic">Developed by Naufal Aufaa Abyan - UNAMA 2026</p>
      </footer>
    </div>
  )
}