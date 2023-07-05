import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import pdf from 'html-pdf';
import { fileURLToPath } from 'url';
// import { v2 as cloudinary } from 'cloudinary';
import admitCardData from '../data/admitCardData.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface IData {
  name: string;
  email: string;
  fatherName: string;
  rollNumber: string;
  category: string;
  centre: string;
  gender: string;
  photo: string;
  signature: string;
  language: string;
}

export const getHtmlData = async (email: string) => {
  const data = admitCardData.find((d) => d.email === email);
  if (!data) throw new Error('Data not found');

  const html = await ejs.renderFile(
    path.join(__dirname, '../templates/admit_card.ejs'),
    data
  );
  return html;
};

export const savePdfFile = async (data: IData) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(
      path.join(__dirname, '../templates/admit_card.ejs'),
      data,
      (err, html) => {
        if (err) {
          console.log('Error in rendering html: ', err.message || err);
          reject(err);
          return;
        }

        pdf
          .create(html, {
            childProcessOptions: {
              // @ts-ignore
              env: {
                OPENSSL_CONF: '/dev/null',
              },
            },
          })
          .toBuffer((err, buffer) => {
            if (err) {
              console.log('Error in creating pdf: ', err.message || err);
              reject(err);
              return;
            }
            fs.writeFile(
              path.join(
                __dirname,
                '../admitCards',
                `${data.email.split(' ').join('')}.pdf`
              ),
              buffer,
              (err) => {
                if (err) reject(err);
                resolve(data.email.split(' ').join(''));
              }
            );
          });
      }
    );
  });
};

const wait10ms = () => new Promise((resolve) => setTimeout(resolve, 10));

export const generateAllAdmitCards = async () => {
  // for (let i = 0; i < admitCardData.length; i++) {
  // await savePdfFile(admitCardData[0]);
  await wait10ms();
  console.log('Generated admit card for', admitCardData[0].email);
  // }
};
