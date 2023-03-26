const express = require("express");
const router = express.Router();
const BirthdayEntry = require("../schemas/Birthdays");
const BotEntry = require("../schemas/Bots");

// middleware that is specific to this router
router.use((req, res, next) => {
	console.log("Do any middleware for birthdays");
	next();
});

router.get("/", async (req, res) => {
	try {
		const birthdayEntries = await BirthdayEntry.find();
		res.json(birthdayEntries);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

router.get("/:bday", async (req, res) => {
	const bday = req.params.bday;
	if (bday.length !== 4) {
		res.status(401).send("Format is incorrect");
	}
	const month = bday.substring(0, 2);
	const day = bday.substring(2);
	const foundBday = await searchForBirthday(month, day);

	res.send(foundBday);
});

router.post("/", async (req, res) => {
	try {
		const birthdayEntry = new BirthdayEntry({
			name: req.body.name,
			month: req.body.month,
			day: req.body.day,
			message: req.body.message,
			bot: req.body.bot,
		});

		await birthdayEntry.save();

		res.send("Saved entry: " + birthdayEntry);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

/* Helper methods */

const isValidDayForMonth = (day, month) => {
	//Do some logic for whether that month has that many days
	return true;
};

const searchForBirthday = async (month, day) => {
	return BirthdayEntry.find({ month: month, day: day });
};

module.exports = router;
