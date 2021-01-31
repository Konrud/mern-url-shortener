import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    links: [{ type: Types.ObjectId, ref: "Link" }] // we have here Array of links, type is a special type, ref means that we reference another Model named "Link"
});

const User = model("User", userSchema);

export default User;