const fs = require("fs")
const reg = require("./admitCardData.json")

const activeReg = reg.reduce((acc, curr) => [
	...acc, { ...curr, _id: curr._id.$oid }
], [])


fs.writeFileSync("./newAdmitCardData.json", JSON.stringify(activeReg, null, 2))
