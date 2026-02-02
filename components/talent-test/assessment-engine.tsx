"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Loader2 } from "lucide-react"
import { ProfessionalReport } from "./professional-report"

export function AssessmentEngine() {
  const [questions, setQuestions] = useState<any[]>([])
  const [resultsConfig, setResultsConfig] = useState<any>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<any[]>([])
  const [status, setStatus] = useState("loading") // loading, quiz, analyzing, finished
  const [finalData, setFinalData] = useState<any>(null)

  useEffect(() => {
    Promise.all([
      fetch('/lib/questions.json').then(res => res.json()),
      fetch('/lib/results-map.json').then(res => res.json())
    ]).then(([qData, rData]) => {
      setQuestions(qData)
      setResultsConfig(rData)
      setStatus("quiz")
    }).catch(err => console.error("加载数据失败", err))
  }, [])

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentIndex] = { questionId: questions[currentIndex].id, optionIndex }
    setAnswers(newAnswers)
    
    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 400)
    } else {
      setStatus("analyzing")
      // 计算得分逻辑
      const scores: any = { A: 0, B: 0, C: 0, D: 0, E: 0 }
      newAnswers.forEach((ans) => {
        const q = questions.find(item => item.id === ans.questionId)
        Object.keys(weight).forEach(dim => (scores as any)[dim] += (weight as any)[dim])
        Object.keys(weight).forEach(dim => scores[dim] += weight[dim])
      })
      const topDim = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b)
      
      // 模拟 AI 分析仪式感
      setTimeout(() => {
        setFinalData({ scores, topDim })
        setStatus("finished")
      }, 3000)
    }
  }

  if (status === "loading") return <div className="h-screen flex items-center justify-center bg-black text-[#d4af37]"><Loader2 className="animate-spin" /></div>
  if (status === "finished") return <ProfessionalReport scores={finalData.scores} topDim={finalData.topDim} config={resultsConfig} />

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl mt-12">
        {status === "quiz" && (
          <div className="space-y-12">
            <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
              <motion.div 
                className="bg-[#d4af37] h-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <h2 className="text-3xl font-light text-center leading-relaxed">
                  {questions[currentIndex]?.question}
                </h2>
                <div className="grid gap-4">
                  {questions[currentIndex]?.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className="w-full py-6 px-8 text-left rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:border-[#d4af37]/50 hover:bg-zinc-800/50 transition-all"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {status === "analyzing" && (
          <div className="py-40 text-center space-y-6">
            <Sparkles className="w-12 h-12 text-[#d4af37] animate-pulse mx-auto" />
            <p className="text-[#d4af37] tracking-[0.3em] font-bold">AI 正在构建你的商业 DNA 报告...</p>
          </div>
        )}
      </div>
    </div>
  )
}
