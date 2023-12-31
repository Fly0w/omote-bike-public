'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import moment from "moment/moment";

export default function Home() {
  const [isUsed, setIsUsed] = useState(true)
  const [currentUser, setCurrentUser] = useState("")
  const [passCode, setPassCode] = useState("")
  const [nameInput, setNameInput] = useState("")
  const [isLoading, setIsLoading] = useState(true)


//loads the information when the page loads, to know if the bike is being used or not
  useEffect(() => {
    loadInfo()
  }, [])
  

// Function that will load the info from the database and update the local state for isUsed and also the name
  const loadInfo = async () => {
    try {
      const resp = await fetch("/api/current")
      const data = await resp.json()
      setIsUsed(data.isUsed)
      setCurrentUser(data.user)
      setPassCode(data.passcode)

      if(data){
        setIsLoading(false)
      }

    } catch (error) {
      console.log(error)
    }
  } 

  // Function to initiate current state in the database, do not use
  // const createInfo1 = async () => {
  //   try {
  //     const resp = await fetch("/api/current", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         isUsed: false,
  //         user: "",
  //         passcode:"1 2 3 4"
  //       })
  //     })
  //     const data = await resp.json()

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

// Function that will update the database to know is the bike is being used and by who.
// Also create an entry in the "history" db with the date.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = moment().format('llll');

    try {
      // Updates the db to change the state "isUsed" to true
      const respCur = await fetch("/api/current", {
        method: "PATCH",
        body: JSON.stringify({
          isUsed: true,
          user: nameInput
        })
      })
      // Creates an entry in the history db with the name and starting date
      const respHis = await fetch("/api/history", {
        method: "POST",
        body: JSON.stringify({
          name: nameInput,
          dateStart: date
        })
      })
      
      const dataCur = await respCur.json()

      // Sets the state "isUsed" to true right after pressing the button, because doesnt need the resp from the server
      setIsUsed(dataCur.isUsed)
      setCurrentUser(dataCur.user)

      // console.log(dataHis)
    } catch (error) {
      console.log(error)
    }
  }
// Function that will update the collection "current" to update the interface and 
// being able to start using the bike again. Will also update the "history" database
// to add a new line to the history.
  const stopCount = async () => {
    const date = moment().format('llll');
    try {
      // Updates the db to change the state "isUsed" to false. The response object will be used to change the state of this app. 
      // By doing so, it acts as a confirmation that the run has been succesfully stopped, instead of changing the state automatically like in
      // the handleSubmit function
      const respCur = await fetch("/api/current", {
        method: "PATCH",
        body: JSON.stringify({
          isUsed: false,
          user: ""
        })
      })
      const dataCur = await respCur.json()
      setIsUsed(dataCur.isUsed)
      setCurrentUser(dataCur.user)

      // Updates the entry in the history db with the name and ending date
      const respHis = await fetch("/api/history", {
        method: "PATCH",
        body: JSON.stringify({
          name: currentUser,
          dateEnd: date
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <main className="font-montserrat mt-10">
      <div className="flex flex-col justify-center items-center">
      <h1 className="text-md text-center my-3 text-teal-600">This is a free testing, public version of Omotebike. Feel free to try it, you will not break it !</h1>
        <h1 className="text-5xl mb-5">Omote-Bike</h1>
        <p className="text-3xl mb-7">How to use ?</p>
        <ol className="text-xl ">
          <li className="mb-2"><span className="font-bold">1.</span> Enter your name</li>
          <li className="mb-2"><span className="font-bold">2.</span> Click <span className="font-semibold">"Start"</span></li>
          <li className=""><span className="font-bold">3.</span> Once you are done, click <span className="font-semibold">"Stop"</span></li>
        </ol>
      </div>
      {/* Conditional rendering if the data from the DB has arrived or not */}
      {isLoading
      ? <p className="h-72 flex flex-col items-center justify-center align-middle text-xl">Loading...</p>
      : <div>
        {/* Conditional rendering if the bike is being used or not */}
          {isUsed
        ?
        <div className="h-72 flex flex-col items-center justify-center align-middle">
          <p className="text-lg">The lock passcode is :</p>
          <p className="font-bold text-3xl">{passCode}</p>
          <p className="mb-5 text-lg"><span className="font-semibold">{currentUser}</span> is using the bike now</p>
          <button className="button_stop" onClick={() => stopCount()}>Stop</button>
        </div>
        : 
        <form className="h-72 form flex flex-col justify-center items-center" onSubmit={(e) => handleSubmit(e)}>
          <label>
            <div className="">
              <h3 className="text-center my-2 text-2xl">Your name</h3>
              <input 
                type="text"
                required
                placeholder="Type your name here"
                className="name_insert"
                onChange={(e) => setNameInput(e.target.value)}></input>
            </div>
          </label>

          <button type="submit" className="button_start">Start</button>
        </form>
        }
      </div>
      }
    
      <h1 className="text-xl mb-10 text-center px-10">Before using, please make sure to read the rules about how to use the shared bike
        <Link href="/rules">
          <span className="text-teal-500 font-bold"> here</span>
        </Link>
      </h1>

      <p className="text-center">Contact : Florian Budniewski</p>
    </main>
  )
}
