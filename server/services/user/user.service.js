import User from "../../models/user/user.model";
import bcrypt from "bcryptjs";

async function getUserByEmail(email) {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        console.error(`From user.service.js -> getUserByEmail -> error info: ${error}`);
    }
}

async function createNewUser({ email, password }) {
    try {
        debugger;
        const hashedPassword = await _getHashedPassword(password);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        return newUser;
    } catch (error) {
        console.error(`From user.service.js -> createNewUser -> error.info ${error}`);
    }
}

async function checkPasswordsEquality(receivedPassword, userHashedPassword) {
    return await bcrypt.compare(receivedPassword, userHashedPassword);
}

/* UTILITY PRIVATE FUNCTIONS */
async function _getHashedPassword(password, salt = 12) {
    return await bcrypt.hash(password, salt);
}

export default { getUserByEmail, createNewUser, checkPasswordsEquality };