const express = require("express");
const router = express.Router();
const BotEntry = require("../schemas/Bots");

router.post("/", async (req, res) => {
	try {
		const botEntry = new BotEntry({
			owner: req.body.owner,
			apiKey: req.body.apiKey,
		});

		await botEntry.save();

		res.json({ botId: botEntry.id });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

module.exports = router;
