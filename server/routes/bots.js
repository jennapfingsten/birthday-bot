const express = require("express");
const router = express.Router();
const BotEntry = require("../schemas/Bots");

router.get("/", async (req, res) => {
	try {
		const botEntries = await BotEntry.find();
		res.json(botEntries);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

router.get("/:botId", async (req, res) => {
	const botId = req.params.botId;
	const botEntry = await BotEntry.findById(botId);

	res.send(botEntry);
});

router.post("/", async (req, res) => {
	try {
		console.log(req.body);
		const botEntry = new BotEntry({
			owner: req.body.owner,
			apiKey: req.body.apiKey,
		});

		await botEntry.save();

		res.json({ botId: botEntry.id });
	} catch (e) {
		res.status(500).send(e.message);
	}
});

module.exports = router;
