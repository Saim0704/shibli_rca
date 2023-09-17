const fs = require("fs")
const path = require("path")
const registrations = require('./admitCardData.json');

const emails = registrations.map((registration) => registration.email);

const limitPerFile = 90
const newUsers = []

while (emails.length > 0) {
	let currentNewUsers = []
	for (let i = 0; i < limitPerFile; i++) {
		if (!emails[i]) break;
		currentNewUsers.push(emails[i].toLowerCase())
	}

	newUsers.push(currentNewUsers)
	emails.splice(0, limitPerFile)
	currentNewUsers = []
}

for (let i = 0; i < newUsers.length; i++) {
	fs.writeFileSync(path.join(__dirname, `./dump/emails-${i}.txt`), newUsers[i].join("\n"))
}
