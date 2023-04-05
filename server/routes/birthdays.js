const express = require("express");
const router = express.Router();
const BirthdayEntry = require("../schemas/Birthdays");
const BotEntry = require("../schemas/Users");

router.use((req, res, next) => {
	//Do any middleware for /birthdays
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

router.get("/:userId", async (req, res) => {
	const userId = req.params.userId;
	try {
		const birthdayEntries = await BirthdayEntry.find({ user: userId });
		res.json(birthdayEntries);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

router.post("/", async (req, res) => {
	try {
		const birthdayEntry = new BirthdayEntry({
			name: req.body.name,
			month: req.body.month,
			day: req.body.day,
			message: req.body.message,
			user: req.body.user,
		});

		await birthdayEntry.save();

		res.json({ message: "Saved entry: " + JSON.stringify(birthdayEntry) });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const birthdayId = req.params.id;
		await BirthdayEntry.deleteOne({ _id: birthdayId });
		res.json({ message: "Successfully deleted" });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

/* Helper methods */

const isValidDayForMonth = (day, month) => {
	//Do some logic for whether that month has that many days
	return true;
};

module.exports = router;
