import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstname: {type :String},
    email: {type :String, index: true },
    isAdmin: {type :Boolean},
});

const User = mongoose.model('User', UserSchema);

export {
    User
}