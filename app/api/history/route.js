import { connectToDB } from "@/utils/database";
import History from "@/models/history";

// Endpoint to get the history from the db
export const GET = async (req) => {
    try {
        await connectToDB();

        console.log("Get History")

        const history = await History.find()

        // Check if the history list exists
        if(!history){
            return new Response("Could not find history", {status: 500})
        }


        // Return a response with the list of all the entries from the history list
        return new Response(JSON.stringify(history), {status: 200})

    } catch (error) {
        return new Response("Error while getting history", {status: 500})
    }
}

//Endpoint to Create an entry history in the db
export const POST = async (req) => {
    const { name, dateStart } = await req.json()
    try {
        await connectToDB();

        console.log("Creating entry History")

        const history = new History({
            name: name,
            dateStart: dateStart,
            dateEnd: ""
        })

        console.log(history)

        await history.save()
        
        return new Response("Created history successfully", {status: 200})

    } catch (error) {
        return new Response("Error while creating history", {status: 500})
    }
}


//Endpoint to Update an entry history in the db
export const PATCH = async (req) => {
    const { name, dateEnd, dateStart } = await req.json()
    try {
        await connectToDB();

        console.log("Updating entry History")

        // Find the latest history entry with the name in req  
        const history = await History.findOne({name: name, dateEnd : ""})

        // console.log(history)

        // Check if the history entry exists
        if(!history){
            return new Response("Could not find history", {status: 500})
        }

        // Updates the dateEnd with the req
        history.dateEnd = dateEnd
        await history.save()
        
        return new Response("Updated history successfully", {status: 200})

    } catch (error) {
        return new Response("Error while updating history", {status: 500})
    }
}