const fs = require("fs")
const path = require("path")
const users = require("./users.json")
const registrations = require("./registrations.json")

const registrationUserIds = registrations.reduce((acc, registration) => {
	return [
		...acc,
		registration.user.$oid
	]
}, [])

const limitPerFile = 100

const newUsers = []

while (users.length > 0) {
	let currentNewUsers = []
	for (let i = 0; i < limitPerFile; i++) {
		if (!users[i]) break;
		if (registrationUserIds.includes(users[i]._id.$oid)) continue;
		currentNewUsers.push(users[i].email.toLowerCase())
	}

	newUsers.push(currentNewUsers)
	users.splice(0, limitPerFile)
	currentNewUsers = []
}

for (let i = 0; i < newUsers.length; i++) {
	fs.writeFileSync(path.join(__dirname, `./dump/new-users-${i}.txt`), newUsers[i].join("\n"))
}
