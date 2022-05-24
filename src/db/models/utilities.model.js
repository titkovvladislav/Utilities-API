const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UtilitiesSchema = new Schema({
    electricity: {type: Number, required: true},
    water: {type: Number, required: true},
    month: {type: String, required: true},
    date: {type: Date, required: true},
    id: {type: String, required: true},
    authorId: {type: String, required: true},
    organization: {type: String, required: true},
});

module.exports = Utilities = mongoose.model("Utilities", UtilitiesSchema);
