const fs = require("fs")
const path = require("path")
const users = require("./admitCardData.json")

const limitPerFile = 90
const newUsers = []

while (users.length > 0) {
	let currentNewUsers = []
	for (let i = 0; i < limitPerFile; i++) {
		if (!users[i]) break;
		currentNewUsers.push(users[i].email.toLowerCase())
	}

	newUsers.push(currentNewUsers)
	users.splice(0, limitPerFile)
	currentNewUsers = []
}

for (let i = 0; i < newUsers.length; i++) {
	fs.writeFileSync(path.join(__dirname, `./emails/new-users-${i}.txt`), newUsers[i].join("\n"))
}
