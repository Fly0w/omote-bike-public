// Card for the history page
const HistoryCard = ({name, dateStart, dateEnd}) => {

  return (
    <div className="font-montserrat border border-black bg-slate-200 rounded-xl my-1 p-2 w-full">
        <p><span className="font-bold">Name:</span> {name}</p>
        <p><span className="font-bold">Start:</span> {dateStart}</p>
        <p><span className="font-bold">End:</span> {dateEnd}</p>
    </div>
  )
}

export default HistoryCard