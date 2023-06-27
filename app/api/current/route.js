import { connectToDB } from "@/utils/database";
import Current from "@/models/current";


// Endpoint to get the current state of the bike
export const GET = async (req) => {
    try {
        await connectToDB();
        console.log("Getting current state")

        const current = await Current.findOne()

        // Check if the entry exists
        if(!current){
            return new Response("Could not find entry", {status: 500})
        }
        
        // Sends a response with the current state
        return new Response(JSON.stringify(current), {status: 200})

    } catch (error) {
        return new Response("Error while finding entry", {status: 500})
    }
}


// Endpoint to update the current state of the bike
export const PATCH = async (req) => {
    const { isUsed, user } = await req.json()
    try {
        await connectToDB();
        console.log("Updating current state")

        const current = await Current.findOne()

        // Check if the entry exists
        if(!current){
            return new Response("Could not find entry", {status: 500})
        }

        // Updates the state
        current.isUsed = isUsed;
        current.user = user;

        await current.save()
        
        return new Response(JSON.stringify(current), {status: 200})
    } catch (error) {
        return new Response("Error while Updating entry", {status: 500})
    }
}

// Endpoint to initialize the current state of the bike
// export const POST = async (req) => {
//     const { isUsed, user } = await req.json()
//     try {
//         await connectToDB();

//         const current = new Current ({
//             isUsed : isUsed,
//             user : user
//         })

//         await current.save()
        
//         return new Response(JSON.stringify(current), {status: 200})
//     } catch (error) {
//         return new Response("Error while Updating entry", {status: 500})
//     }
// }