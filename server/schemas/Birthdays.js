const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const birthdaySchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	month: {
		type: Number,
		min: 1,
		max: 12,
		required: true,
	},
	day: {
		type: Number,
		min: 1,
		max: 31,
		required: true,
	},
	message: String,
	bot: { type: Schema.Types.ObjectId, ref: "Bot", required: true },
});

module.exports = mongoose.model("Birthday", birthdaySchema);
