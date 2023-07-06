const fs = require('fs');
const reg = require('./registrations.json');

const activeReg = reg.reduce(
	(acc, curr) => [
		...acc,
		{
			...curr,
			_id: curr._id.$oid,
			gender: curr.gender === 'M' ? 'MALE' : 'FEMALE',
			category: curr.category.split('_').join(' '),
			name: curr.name.toUpperCase(),
			fatherName: curr.fatherName.toUpperCase(),
			language: curr.language.toUpperCase(),
			email: curr.email.split(' ').join('').toLowerCase(),
		},
	],
	[]
);

fs.writeFileSync('./admitCardData.json', JSON.stringify(activeReg, null, 2));
