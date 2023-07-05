import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import admitCardData from '../data/admitCardData.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface IData {
  centre: string;
  registrations: Array<{
    name: string;
    rollNumber: string;
    photo: string;
    signature: string;
  }>;
}

const testCenterMap = {
  azamgarh: 'Azamgarh, UP',
  srinagar: 'Srinagar',
  delhi: 'Delhi',
  bijnor: 'Bijnor',
  aligarh: 'Aligarh',
  lucknow: 'Lucknow',
  patna: 'Patna',
  mumbai: 'Mumbai',
  hyderabad: 'Hyderabad',
};

export const getAllCenterHtmlData = async () => {
  const centers = Object.keys(testCenterMap);

  for (let i = 0; i < centers.length; i++) {
    const center: keyof typeof testCenterMap = centers[i] as any;
    const data = admitCardData.filter(
      (d) => d.testCentre === testCenterMap[center]
    );

    if (!data || data.length === 0) {
      console.log('No data found for centre: ', testCenterMap[center]);
    }

    const html = await ejs.renderFile(
      path.join(__dirname, '../templates/attendance.ejs'),
      {
        centre: testCenterMap[center],
        registrations: data.map((d) => ({
          name: d.name,
          rollNumber: d.rollNumber,
          photo: d.photo,
          signature: d.signature,
        })),
      } as IData
    );

    fs.writeFileSync(
      path.join(__dirname, `../data/attendance/${center}.html`),
      html
    );
  }
};
