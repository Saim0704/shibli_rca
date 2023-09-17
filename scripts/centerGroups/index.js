const fs = require('fs');
const path = require('path');

const azamgarh = require('./azamgarh.json');
const srinagar = require('./srinagar.json');
const delhi = require('./delhi.json');
const bijnor = require('./bijnor.json');
const aligarh = require('./aligarh.json');
const lucknow = require('./lucknow.json');
const patna = require('./patna.json');
const mumbai = require('./mumbai.json');
const hyderabad = require('./hyderabad.json');

const mappings = {
	azamgarh: '01',
	srinagar: '02',
	delhi: '03',
	bijnor: '04',
	aligarh: '05',
	lucknow: '06',
	patna: '07',
	mumbai: '08',
	hyderabad: '09',
};

const allQueries = [];

const createQueries = (data, name) => {
	const queries = data.map((item, index) => ({
		_id: item._id.$oid,
		rollNumber: `23${mappings[name]}${String(index + 1).padStart(3, '0')}`,
	}));
	allQueries.push(...queries);
};


createQueries(azamgarh, 'azamgarh')
createQueries(srinagar, 'srinagar')
createQueries(delhi, 'delhi')
createQueries(bijnor, 'bijnor')
createQueries(aligarh, 'aligarh')
createQueries(lucknow, 'lucknow')
createQueries(patna, 'patna')
createQueries(mumbai, 'mumbai')
createQueries(hyderabad, 'hyderabad')


fs.writeFileSync(path.join(__dirname, 'queries.json'), JSON.stringify(allQueries));
