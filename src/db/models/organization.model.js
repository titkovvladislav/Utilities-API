const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
    name: { type: String, required: true },
    id: { type: String, required: true }
});

module.exports = Organization = mongoose.model("Organization", OrganizationSchema);
