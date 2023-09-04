import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required'],
    },
    username : {
        type: String,
        required: [true, 'Username is required'],
        match: [/^(?=.{8,20}$)(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username is invalid. It should comtain 8-20 alphanumeric letters and be unique"],
    }
});

const User = models.User || model("User", userSchema);

export default User;