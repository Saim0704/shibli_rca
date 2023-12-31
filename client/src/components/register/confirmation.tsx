import React, { Fragment, useContext } from 'react';
import { IRegisterPayload } from './stepper';
import {
  Button,
  Descriptions,
  DescriptionsProps,
  Form,
  Image,
  Typography,
} from 'antd';
import useSession from '../../hooks/session';
import { camelCaseToSentenceCase } from '../../utils/strings';
import { uiContext } from '../../hooks/ui';

interface IProps {
  payload: IRegisterPayload;
}

const Confirmation: React.FC<IProps> = ({ payload }) => {
  const [{ isMobile }] = useContext(uiContext);
  const {
    me: { user },
  } = useSession();

  const defaultDescriptionProps: DescriptionsProps = {
    size: 'small',
    column: { xs: 1, sm: 1, md: 1 },
  };

  return (
    <Fragment>
      <Typography.Title level={3}>Basic Information</Typography.Title>
      <Descriptions {...defaultDescriptionProps}>
        <Descriptions.Item label='Name'>{user?.name}</Descriptions.Item>

        {[
          'fatherName',
          'motherName',
          'gender',
          'mobileNumber',
          'phoneNumber',
          'languageOfExam',
        ].map((t) => (
          <Descriptions.Item label={camelCaseToSentenceCase(t)} key={t}>
            {/* @ts-ignore */}
            {payload[t]}
          </Descriptions.Item>
        ))}

        {payload.dateOfBirth ? (
          <Descriptions.Item label='Date of Birth'>
            {payload.dateOfBirth as any}
          </Descriptions.Item>
        ) : null}
      </Descriptions>

      <br />
      <br />

      <Typography.Title level={3}>Addresses</Typography.Title>
      <Typography.Title level={5}>Correspondence Address</Typography.Title>
      <Descriptions {...defaultDescriptionProps}>
        {['cityOrTown', 'district', 'landmark', 'postalCode', 'state'].map(
          (t) => (
            <Descriptions.Item label={camelCaseToSentenceCase(t)} key={t}>
              {/* @ts-ignore */}
              {payload.correspondenceAddress[t]}
            </Descriptions.Item>
          )
        )}
      </Descriptions>

      <br />

      <Typography.Title level={5}>Permanent Address</Typography.Title>
      <Descriptions {...defaultDescriptionProps}>
        {['cityOrTown', 'district', 'landmark', 'postalCode', 'state'].map(
          (t) => (
            <Descriptions.Item label={camelCaseToSentenceCase(t)} key={t}>
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
      <Descriptions {...defaultDescriptionProps}>
        {['boardOrUni', 'percentage', 'passYear'].map((t) => (
          <Descriptions.Item label={camelCaseToSentenceCase(t)} key={t}>
            {/* @ts-ignore */}
            {payload.education.matriculation[t]}
          </Descriptions.Item>
        ))}
      </Descriptions>

      <br />

      <Typography.Title level={5}>Intermediate</Typography.Title>
      <Descriptions {...defaultDescriptionProps}>
        {['boardOrUni', 'percentage', 'passYear'].map((t) => (
          <Descriptions.Item label={camelCaseToSentenceCase(t)} key={t}>
            {/* @ts-ignore */}
            {payload.education.intermediate[t]}
          </Descriptions.Item>
        ))}
      </Descriptions>

      <br />

      <Typography.Title level={5}>Graduation</Typography.Title>
      <Descriptions {...defaultDescriptionProps}>
        {['boardOrUni', 'percentage', 'passYear'].map((t) => (
          <Descriptions.Item label={camelCaseToSentenceCase(t)} key={t}>
            {/* @ts-ignore */}
            {payload.education.graduation[t]}
          </Descriptions.Item>
        ))}
      </Descriptions>

      <br />

      {payload.education.other.percentage !== 0 && (
        <Fragment>
          <Typography.Title level={5}>Other</Typography.Title>
          <Descriptions {...defaultDescriptionProps}>
            {['boardOrUni', 'percentage', 'passYear'].map((t) => (
              <Descriptions.Item label={camelCaseToSentenceCase(t)} key={t}>
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
          <Descriptions {...defaultDescriptionProps}>
            {payload.earlierCompetitiveExams.map((t) => (
              <Descriptions.Item key={t.name} label={t.name}>
                {t.year}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </Fragment>
      ) : null}

      <br />
      <br />

      <Typography.Title level={3}>Terms and Conditions</Typography.Title>
      <Descriptions {...defaultDescriptionProps}>
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
      <Descriptions {...defaultDescriptionProps}>
        <Descriptions.Item label='Aadhar Card Number'>
          {payload.aadharCard}
        </Descriptions.Item>
      </Descriptions>
      {[
        'photograph',
        'signature',
        'lastSemesterCertificate',
        'transaction',
      ].map((t) => {
        // @ts-ignore
        if (!payload[t]) return null;
        // @ts-ignore
        return <Image key={t} preview={false} src={payload[t]} />;
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
