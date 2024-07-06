import { connect } from "mongoose";
import { disconnect } from "process";

export default async function connectToDb() {
    try {
        await connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error)

        throw new Error("Cannot connect to mongoDB")
    }
}

export async function disconnectDb() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error)

        throw new Error("Cannot connect to mongoDB")
    }
}

