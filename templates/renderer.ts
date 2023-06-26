import ejs from 'ejs';

interface IData {
  photo: string;
  signature: string;
  rollNumber: string;
  name: string;
  fatherName: string;
  gender: string;
  category: string;
  centre: string;
}

export const getRenderHtml = async (data: IData) => {
  const html = await ejs.renderFile('admit_card.ejs', data);
  return html;
};
