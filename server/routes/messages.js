const express = require("express");
const router = express.Router();
const BotEntry = require("../schemas/Bots");
const BirthdayEntry = require("../schemas/Birthdays");

const groupmeEndpoint = "https://api.groupme.com/v3/bots/post";
const apiKey = process.env.GROUPME_API_KEY;

router.post("/", async (req, res) => {
	try {
		//Will do the private key validation later

		const today = new Date();
		const month = today.getMonth() + 1; //it's stored in DB as readable month
		const day = today.getDate();
		const birthdaysToday = await searchForBirthday(month, day);

		birthdaysToday.map((birthday) => {
			//Do some validations
			//Get the botId
			sendMessage(apiKey, createMessage(birthday.name, birthday.message));
		});

		res.json({
			message: "Sent messages for " + birthdaysToday.length + " birthdays",
		});
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

const searchForBirthday = async (month, day) => {
	console.log("Searching for a birthday on " + month + " " + day);
	return BirthdayEntry.find({ month: month, day: day });
};

const createMessage = (name, message) => {
	if (message) return message;
	let templateMessage = "Happy birthday {name}! You're great!";
	return templateMessage.replace("{name}", name);
};

const sendMessage = (apiKey, message) => {
	const body = {
		bot_id: apiKey,
		text: message,
	};

	fetch(groupmeEndpoint, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	})
		.then((response) => {
			if (!response.ok) {
				return response.json();
			}
		})
		.then((resp) => {
			if (resp) {
				console.log(resp.meta.errors);
			} else {
				console.log("Message sent!");
			}
		});
};

module.exports = router;
