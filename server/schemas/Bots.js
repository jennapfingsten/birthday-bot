const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const botSchema = new Schema({
	owner: { type: String, required: true },
	apiKey: { type: String, required: true },
});

module.exports = mongoose.model("Bot", botSchema);
