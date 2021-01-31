import mongoose from "mongoose";

async function connect(dbURL, options) {
    try {
        await mongoose.connect(dbURL, options);
    } catch (error) {
        console.log(`Server Error: ${error.message}`);
        // exit process in NODE
        process.exit(1);
    }
}


export default { connect };