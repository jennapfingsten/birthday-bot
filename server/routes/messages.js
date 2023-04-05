const express = require("express");
const axios = require("axios");
const router = express.Router();
const BotEntry = require("../schemas/Bots");
const BirthdayEntry = require("../schemas/Birthdays");
const UserEntry = require("../schemas/Users");

const groupmeEndpoint = "https://api.groupme.com/v3/bots/post";

router.post("/", async (req, res) => {
	try {
		//Will do the private key validation later

		const today = new Date();
		const month = today.getMonth() + 1; //it's stored in DB as readable month
		const day = today.getDate();
		const birthdaysToday = await searchForBirthday(month, day);

		birthdaysToday.map(async (birthday) => {
			//Do some validations

			const user = await searchForUser(birthday);
			if (user.apiKey) {
				sendMessage(
					user.apiKey,
					createMessage(birthday.name, birthday.message)
				);
			}
		});

		res.json({
			message: "Sent messages for " + birthdaysToday.length + " birthdays",
		});
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

const searchForBirthday = async (month, day) => {
	return BirthdayEntry.find({ month: month, day: day });
};

const searchForUser = async (birthday) => {
	return UserEntry.findOne(birthday.user);
};

const createMessage = (name, message) => {
	if (message) return message;
	let templateMessage = "Happy birthday {name}! Hope you have a great day!";
	return templateMessage.replace("{name}", name);
};

const sendMessage = (apiKey, message) => {
	axios
		.post(groupmeEndpoint, {
			bot_id: apiKey,
			text: message,
		})
		.then((response) => console.log(response))
		.catch((err) => console.log(err));
};

module.exports = router;
