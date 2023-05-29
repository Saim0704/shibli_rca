import { camelCaseToSentenceCase } from '../../utils/strings';

export const validateRegister = (payload: any) => {
  const errors: string[] = [];
  [
    'currentStep',
    'gender',
    'fatherName',
    'motherName',
    'dateOfBirth',
    'mobileNumber',
    'testCenter',
    'transactionId',
    'category',
    'photograph',
    'signature',
    'languageOfExam',
    'testCenter',
  ].forEach((t) => {
    // @ts-ignore
    if (!payload[t] || payload[t] === '')
      errors.push(`${camelCaseToSentenceCase(t)} is required`);
  });

  ['permanentAddress', 'correspondenceAddress'].forEach((t) => {
    ['postalCode', 'cityOrTown', 'district', 'state'].forEach((i) => {
      // @ts-ignore
      if (!payload[t][i] || payload[t][i] === '')
        errors.push(
          `${camelCaseToSentenceCase(i)} in ${camelCaseToSentenceCase(
            t
          )} is required`
        );
    });
  });

  Object.entries(payload.education).forEach(([key, value]: any) => {
    if (key === 'other') return;
    if (!value.passYear || !value.percentage || !value.boardOrUni) {
      errors.push(
        `All fields in ${camelCaseToSentenceCase('education')} is required`
      );
      return;
    }
  });

  if (payload.earlierCompetitiveExams.length > 0) {
    payload.earlierCompetitiveExams.forEach((t: any) => {
      ['name', 'year'].forEach((k) => {
        // @ts-ignore
        if (!t[k] || t[k] === '') errors.push(`${k} in ${t} is required`);
      });
    });
  }

  return errors;
};
