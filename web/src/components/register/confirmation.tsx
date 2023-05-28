import dayjs from 'dayjs';
import React, { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
// import { uiAtom } from 'rca/utils/atoms';
import { useSession } from 'next-auth/react';
import { camelCaseToSentenceCase } from '../../utils/strings';
import { IRegisterPayload } from './stepper';
import { Button, Descriptions, Form, Image, Typography } from 'antd';

interface IProps {
  payload: IRegisterPayload;
}

const Confirmation: React.FC<IProps> = ({ payload }) => {
  const { isMobile } = useRecoilValue(uiAtom);
  const session = useSession();

  return (
    <Fragment>
      <Typography.Title level={3}>Basic Information</Typography.Title>
      <Descriptions column={{ xs: 1, sm: 1, md: 1 }}>
        <Descriptions.Item label='Name'>
          {session.data?.user?.name}
        </Descriptions.Item>

        {[
          'fatherName',
          'motherName',
          'gender',
          'mobileNumber',
          'phoneNumber',
          'languageOfExam',
        ].map((t) => (
          <Descriptions.Item label={camelCaseToSentenceCase(t)}>
            {/* @ts-ignore */}
            {payload[t]}
          </Descriptions.Item>
        ))}

        {payload.dateOfBirth ? (
          <Descriptions.Item label='Date of Birth'>
            {dayjs(payload.dateOfBirth).format('DD-MM-YYYY')}
          </Descriptions.Item>
        ) : null}
      </Descriptions>

      <br />
      <br />

      <Typography.Title level={3}>Addresses</Typography.Title>
      <Typography.Title level={5}>Correspondence Address</Typography.Title>
      <Descriptions column={{ xs: 1, sm: 1, md: 1 }}>
        {['cityOrTown', 'district', 'landmark', 'postalCode', 'state'].map(
          (t) => (
            <Descriptions.Item label={camelCaseToSentenceCase(t)}>
              {/* @ts-ignore */}
              {payload.correspondenceAddress[t]}
            </Descriptions.Item>
          )
        )}
      </Descriptions>

      <br />

      <Typography.Title level={5}>Permanent Address</Typography.Title>
      <Descriptions column={{ xs: 1, sm: 1, md: 1 }}>
        {['cityOrTown', 'district', 'landmark', 'postalCode', 'state'].map(
          (t) => (
            <Descriptions.Item label={camelCaseToSentenceCase(t)}>
              {/* @ts-ignore */}
              {payload.permanentAddress[t]}
            </Descriptions.Item>
          )
        )}
      </Descriptions>

      <br />
      <br />

      <Typography.Title level={3}>Education</Typography.Title>
      <Typography.Title level={5}>Matriculation</Typography.Title>
      <Descriptions column={{ xs: 1, sm: 1, md: 1 }}>
        {['boardOrUni', 'percentage', 'passYear'].map((t) => (
          <Descriptions.Item label={camelCaseToSentenceCase(t)}>
            {/* @ts-ignore */}
            {payload.education.matriculation[t]}
          </Descriptions.Item>
        ))}
      </Descriptions>

      <br />

      <Typography.Title level={5}>Intermediate</Typography.Title>
      <Descriptions column={{ xs: 1, sm: 1, md: 1 }}>
        {['boardOrUni', 'percentage', 'passYear'].map((t) => (
          <Descriptions.Item label={camelCaseToSentenceCase(t)}>
            {/* @ts-ignore */}
            {payload.education.intermediate[t]}
          </Descriptions.Item>
        ))}
      </Descriptions>

      <br />

      <Typography.Title level={5}>Graduation</Typography.Title>
      <Descriptions column={{ xs: 1, sm: 1, md: 1 }}>
        {['boardOrUni', 'percentage', 'passYear'].map((t) => (
          <Descriptions.Item label={camelCaseToSentenceCase(t)}>
            {/* @ts-ignore */}
            {payload.education.graduation[t]}
          </Descriptions.Item>
        ))}
      </Descriptions>

      <br />

      {payload.education.other.percentage !== 0 && (
        <Fragment>
          <Typography.Title level={5}>Other</Typography.Title>
          <Descriptions column={{ xs: 1, sm: 1, md: 1 }}>
            {['boardOrUni', 'percentage', 'passYear'].map((t) => (
              <Descriptions.Item label={camelCaseToSentenceCase(t)}>
                {/* @ts-ignore */}
                {payload.education.other[t]}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </Fragment>
      )}

      {payload.earlierCompetitiveExams.length > 0 ? (
        <Fragment>
          <br />
          <br />
          <Typography.Title level={3}>
            Earlier Competitive Examinations
          </Typography.Title>
          <Descriptions column={{ xs: 1, sm: 1, md: 1 }}>
            {payload.earlierCompetitiveExams.map((t) => (
              <Fragment>
                <Descriptions.Item label={t.name}>{t.year}</Descriptions.Item>
              </Fragment>
            ))}
          </Descriptions>
        </Fragment>
      ) : null}

      <br />
      <br />

      <Typography.Title level={3}>Terms and Conditions</Typography.Title>
      <Descriptions column={{ xs: 1, sm: 1, md: 1 }}>
        <Descriptions.Item label='Information given by me is correct'>
          {payload.agreeToTerms.informationIsCorrect ? 'Yes' : 'No'}
        </Descriptions.Item>

        <Descriptions.Item label='Details in the exam can be changed by the Shibli RCA at any time'>
          {payload.agreeToTerms.rightToChange ? 'Yes' : 'No'}
        </Descriptions.Item>
      </Descriptions>

      <br />
      <br />

      <Typography.Title level={3}>Uploads</Typography.Title>
      <Descriptions column={{ xs: 1, sm: 1, md: 1 }}>
        <Descriptions.Item label='Aadhar Card Number'>
          {payload.aadharCard}
        </Descriptions.Item>
      </Descriptions>
      {['photograph', 'signature', 'lastSemesterCertificate'].map((t) => {
        // @ts-ignore
        if (!payload[t]) return null;
        // @ts-ignore
        return <Image preview={false} src={payload[t]} />;
      })}

      <br />
      <br />

      <Form.Item className='w-full flex justify-end'>
        <Button
          size={isMobile ? 'middle' : 'large'}
          className='mr-2'
          onClick={() => {}}
        >
          Cancel
        </Button>

        <Button
          type='primary'
          htmlType='submit'
          size={isMobile ? 'middle' : 'large'}
        >
          Register
        </Button>
      </Form.Item>
    </Fragment>
  );
};

export default Confirmation;
