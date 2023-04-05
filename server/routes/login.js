const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
	try {
		//This should do a lookup in the DB
		//But for now, it's using the values from the user table
		//I'll figure out secure user authentication later
		if (
			req.body.username == "jenna" &&
			req.body.password == process.env.DEFAULT_PASSWORD
		) {
			res.json({ userId: "642cdcf63d9dfdf4f3c6c1c6", name: "Jenna" });
		} else if (
			req.body.username == "test" &&
			req.body.password == process.env.DEFAULT_PASSWORD
		) {
			res.json({ userId: "642cdcb83d9dfdf4f3c6c1c5", name: "Test account" });
		} else {
			res.json({ userId: null });
		}
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

module.exports = router;
