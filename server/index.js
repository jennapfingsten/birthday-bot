require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const birthdays = require("./routes/birthdays");
const bots = require("./routes/bots");

const PORT = process.env.PORT || 3001;

const app = express();

main().catch((err) => console.log(err));
async function main() {
	await mongoose.connect(process.env.MONGO_DB);
}

app.use(cors());
app.use(express.json());

app.use("/birthdays", birthdays);
app.use("/bots", bots);

// All other GET requests not handled before will return a basic page
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../server", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
