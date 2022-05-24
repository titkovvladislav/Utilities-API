const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    login: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'USER' },
    organization: { type: String, required: true },
    fullName: {
      firstName: { type: String },
      secondName: { type: String },
      patronymic: { type: String },
    },
    email: { type: String },
    id: { type: String, required: true }
});

module.exports = User = mongoose.model("User", userSchema);
