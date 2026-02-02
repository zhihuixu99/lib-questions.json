"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts"
import { Trophy, TrendingUp, Download, Lightbulb } from "lucide-react"

export function ProfessionalReport({ scores, topDim, config }: any) {
  const chartData = [
    { name: '策略', value: scores.A || 10 },
    { name: '人际', value: scores.B || 10 },
    { name: '执行', value: scores.C || 10 },
    { name: '创意', value: scores.D || 10 },
    { name: '商业', value: scores.E || 10 },
  ]

  const info = config[topDim] || { title: "多维潜力者", trait: "具备综合发展潜力", strategy: ["探索跨界整合机会"] }

  return (
    <div className="min-h-screen bg-[#050505] text-white py-12 px-6 animate-in fade-in duration-1000">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-block px-3 py-1 rounded-full border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-bold tracking-[0.3em] bg-[#d4af37]/5">
            GENIUS DNA REPORT
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter">{info.title}</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center bg-zinc-900/20 p-8 rounded-[3rem] border border-zinc-800/50">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="name" tick={{ fill: '#666', fontSize: 14 }} />
                <Radar dataKey="value" stroke="#d4af37" fill="#d4af37" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-[#d4af37] font-bold uppercase text-sm tracking-widest">
                <Trophy className="w-4 h-4"/> 天赋特质
              </h3>
              <p className="text-zinc-300 font-light leading-relaxed">{info.trait}</p>
            </div>
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-white font-bold uppercase text-sm tracking-widest">
                <TrendingUp className="w-4 h-4"/> 变现路径
              </h3>
              <div className="space-y-3">
                {info.strategy.map((s: string, i: number) => (
                  <div key={i} className="flex gap-3 text-sm text-zinc-400 border-l border-zinc-800 pl-4 py-1">
                    <span className="text-[#d4af37]">0{i+1}</span>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button className="w-full py-6 rounded-2xl bg-white text-black font-black text-lg hover:bg-[#d4af37] transition-all flex items-center justify-center gap-3">
          <Download className="w-5 h-5" /> 保存我的商业 DNA 报告
        </button>
      </div>
    </div>
  )
}
