'use client'

import HistoryCard from "@/components/HistoryCard"
import { useEffect, useState } from "react"

export default function History() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    getHistory()
  }, [])
  

  const getHistory = async () => {
    try {
      const resp = await fetch("/api/history")
      const data = await resp.json()

      setHistory(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center mt-4">
      <h1 className="text-4xl font-montserrat mb-5">History</h1>
      {history
      ?
      <div className="flex flex-col justify-center items-center mx-3 w-full px-3">
        {history.map((hist) => <HistoryCard name={hist.name} dateStart={hist.dateStart} dateEnd={hist.dateEnd} />)}
      </div>
      : 
      <p>Loading</p>
      }

    </main>
  )
}
