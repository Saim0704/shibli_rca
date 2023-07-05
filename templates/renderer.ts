import ejs from 'ejs';

interface IData {
  name: string;
  fatherName: string;
  rollNumber: string;
  category: string;
  centre: string;
  gender: string;
  photo: string;
  signature: string;
  language: string;
}

export const getRenderHtml = async (data: IData) => {
  const html = await ejs.renderFile('admit_card.ejs', data);
  return html;
};
