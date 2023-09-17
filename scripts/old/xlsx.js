const fs = require('fs');
const reg = require('./registationsXlsx.json/registrations.json');

const newRegistrations = reg.reduce(
	(acc, cur) => [...acc, { ...cur, _id: cur._id.$oid }],
	[]
);

fs.writeFileSync(
	'./dump/inactiveRegistrations.json',
	JSON.stringify(newRegistrations, null, 2)
);
