import React, { Fragment } from 'react';
import { IRegistration } from '../types/models';
import { Descriptions, DescriptionsProps, Image, Typography } from 'antd';
import { camelCaseToSentenceCase } from '../utils/strings';
import dayjs from 'dayjs';

interface IProps {
  data: IRegistration;
}

const RegistrationInfo: React.FC<IProps> = ({ data: payload }) => {
  const defaultDescriptionProps: DescriptionsProps = {
    size: 'small',
    column: { xs: 1, sm: 1, md: 1 },
  };

  return (
    <Fragment>
      <Descriptions {...defaultDescriptionProps}>
        <Descriptions.Item label='Name'>{payload.user?.name}</Descriptions.Item>
        {[
          'fatherName',
          'motherName',
          'gender',
          'mobileNumber',
          'phoneNumber',
          'languageOfExam',
          'rollNumber',
          'aadharCard',
        ].map((t) => (
          <Descriptions.Item
            contentStyle={{ margin: 0, padding: 0 }}
            label={camelCaseToSentenceCase(t)}
            key={t}
          >
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

      <hr />
      <br />

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

      <hr />
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

      <hr />
      <br />

      <Typography.Title level={5}>Matriculation</Typography.Title>
      <Descriptions {...defaultDescriptionProps}>
        {['boardOrUni', 'percentage', 'passYear'].map((t) => (
          <Descriptions.Item label={camelCaseToSentenceCase(t)} key={t}>
            {/* @ts-ignore */}
            {payload.education.matriculation[t]}
          </Descriptions.Item>
        ))}
      </Descriptions>

      <hr />

      <Typography.Title level={5}>Intermediate</Typography.Title>
      <Descriptions {...defaultDescriptionProps}>
        {['boardOrUni', 'percentage', 'passYear'].map((t) => (
          <Descriptions.Item label={camelCaseToSentenceCase(t)} key={t}>
            {/* @ts-ignore */}
            {payload.education.intermediate[t]}
          </Descriptions.Item>
        ))}
      </Descriptions>

      <hr />

      <Typography.Title level={5}>Graduation</Typography.Title>
      <Descriptions {...defaultDescriptionProps}>
        {['boardOrUni', 'percentage', 'passYear'].map((t) => (
          <Descriptions.Item label={camelCaseToSentenceCase(t)} key={t}>
            {/* @ts-ignore */}
            {payload.education.graduation[t]}
          </Descriptions.Item>
        ))}
      </Descriptions>

      {payload.education.other.percentage !== 0 && (
        <Fragment>
          <hr />
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

      <hr />

      {payload.earlierCompetitiveExams.length > 0 ? (
        <Fragment>
          <br />
          <Typography.Title level={5}>
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

      <hr />
      <br />

      <div className='flex items-center gap-8 flex-wrap'>
        <div>
          <Typography.Title level={5}>Photograph</Typography.Title>
          <Image src={payload.photograph} height={100} />
        </div>

        <div>
          <Typography.Title level={5}>Signature</Typography.Title>
          <Image src={payload.signature} height={100} />
        </div>

        {payload.lastSemesterCertificate && (
          <div>
            <Typography.Title level={5}>
              Last Semester Certificate
            </Typography.Title>
            <Image src={payload.lastSemesterCertificate} height={100} />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default RegistrationInfo;
