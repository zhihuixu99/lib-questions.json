"use client"

import { useState } from "react"
import { AssessmentEngine } from "@/components/talent-test/assessment-engine"
import { Sparkles, ShieldCheck, Zap, Lock } from "lucide-react"

export default function TalentLabPage() {
  const [isVerified, setIsVerified] = useState(false)
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  const handleVerify = async () => {
    if (!code) return
    setLoading(true)
    // 模拟验证逻辑，稍后你可以接入你的 Cloudflare Worker
    setTimeout(() => {
      if (code.length >= 4) {
        setIsVerified(true)
      } else {
        alert("请输入有效的兑换码")
      }
      setLoading(false)
    }, 1000)
  }

  if (isVerified) return <AssessmentEngine />

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md space-y-10 text-center">
        {/* Logo 区域 */}
        <div className="space-y-4">
          <div className="inline-flex p-5 rounded-[2.5rem] bg-gradient-to-b from-zinc-800 to-transparent border border-zinc-700/50 shadow-2xl">
            <Sparkles className="w-12 h-12 text-[#d4af37]" />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold tracking-tighter italic">GENIUS DNA™</h1>
            <p className="text-zinc-500 text-[10px] tracking-[0.4em] uppercase font-bold">天赋商业价值实验室</p>
          </div>
        </div>

        {/* 输入区域 */}
        <div className="p-10 rounded-[2rem] bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-2xl shadow-2xl space-y-8">
          <div className="space-y-2">
            <p className="text-zinc-400 text-sm font-light">请输入您的专属授权码以解锁报告</p>
            <input 
              type="text"
              placeholder="ENTER ACCESS CODE" 
              className="w-full bg-black border border-zinc-800 h-16 rounded-2xl text-center text-2xl tracking-[0.2em] text-[#d4af37] focus:border-[#d4af37] focus:outline-none transition-all"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
            />
          </div>
          <button 
            onClick={handleVerify}
            disabled={loading}
            className="w-full h-16 bg-[#d4af37] text-black hover:bg-white transition-all duration-500 font-black text-lg rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            {loading ? "VERIFYING..." : "开启深度测评"}
          </button>
        </div>

        {/* 底部信任标示 */}
        <div className="flex justify-center gap-8 text-zinc-600 text-[10px] uppercase tracking-[0.2em] font-bold">
          <span className="flex items-center gap-2"><Lock className="w-3 h-3"/> 隐私加密</span>
          <span className="flex items-center gap-2"><Zap className="w-3 h-3"/> 算法建模</span>
        </div>
      </div>
    </div>
  )
}
