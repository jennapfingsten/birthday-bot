require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const birthdays = require("./routes/birthdays");
const bots = require("./routes/bots");
const messages = require("./routes/messages");

const PORT = process.env.PORT || 3001;

const app = express();

main().catch((err) => console.log(err));
async function main() {
	await mongoose.connect(process.env.MONGO_DB).catch((e) => {
		console.log(e);
	});
}

app.use(cors());
app.use(express.json());

app.use("/birthdays", birthdays);
app.use("/bots", bots);
app.use("/messages", messages);

// All other GET requests not handled before will return a basic page
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../server", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
