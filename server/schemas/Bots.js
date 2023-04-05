const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const botSchema = new Schema({
	apiKey: String,
});

module.exports = mongoose.model("Bot", botSchema);
