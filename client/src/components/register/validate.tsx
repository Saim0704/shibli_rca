import { camelCaseToSentenceCase } from '../../utils/strings';

export const validateRegister = (payload: any) => {
  const errors: string[] = [];
  [
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

  if (payload.mobileNumber && String(payload.mobileNumber).length !== 10) {
    errors.push('Mobile number should be of 10 digits');
  }

  ['permanentAddress', 'correspondenceAddress'].forEach((t) => {
    ['postalCode', 'cityOrTown', 'district', 'state'].forEach((i) => {
      // @ts-ignore
      if (!payload[t][i] || payload[t][i] === '') {
        errors.push(
          `${camelCaseToSentenceCase(i)} in ${camelCaseToSentenceCase(
            t
          )} is required`
        );
      }
    });

    if (String(payload[t].postalCode).length !== 6) {
      errors.push('Postal code should be of 6 digits');
    }
  });

  Object.entries(payload.education).forEach(([key, value]: any) => {
    if (key === 'other') return;
    if (!value.passYear || !value.percentage || !value.boardOrUni) {
      errors.push(
        `All fields in ${camelCaseToSentenceCase('education')} is required`
      );
      return;
    }
    if (value.percentage < 0 || value.percentage > 100) {
      errors.push(
        `Percentage in ${camelCaseToSentenceCase(
          'education'
        )} should be between 0 and 100`
      );
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

  if (
    !payload.agreeToTerms.informationIsCorrect ||
    !payload.agreeToTerms.rightToChange
  ) {
    errors.push('Please agree to all the terms and conditions');
  }

  return errors;
};
