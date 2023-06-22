import { DatePicker, Form, Input, InputNumber, Typography } from 'antd';
import dayjs from 'dayjs';
import { IRegisterPayload } from './stepper';
import React, { Fragment, useContext } from 'react';
import { uiContext } from '../../hooks/ui';

interface IEducationContainerProps {
  education: IRegisterPayload['education']['matriculation'];
  onChange: (name: string, value: any) => void;
  name: 'Matriculation' | 'Intermediate' | 'Graduation' | 'Other';
  disabled: boolean;
}

const EducationContainer: React.FC<IEducationContainerProps> = ({
  education,
  name,
  onChange,
}) => {
  const [{ isMobile }] = useContext(uiContext);

  return (
    <Fragment>
      <Form.Item
        name={`${name}.passYear`}
        label='Pass Year'
        rules={[{ required: true }]}
      >
        <DatePicker
          placeholder='Enter Passing Year'
          style={{ width: '100%' }}
          picker='year'
          size={isMobile ? 'middle' : 'large'}
          value={dayjs(education.passYear)}
          onChange={(val) => onChange('passYear', dayjs(val).format('YYYY'))}
        />
      </Form.Item>

      <Typography.Text>
        {name === 'Graduation'
          ? 'If your result is awaited, please enter 10 in the percentage section'
          : ''}
      </Typography.Text>
      <Form.Item
        name={`${name}.percentage`}
        label='Percentage - ( Do not include % sign )'
        rules={[
          { required: true },
          {
            validator: (_, value) =>
              value > 100 || value < 0
                ? Promise.reject('Percentage must be between 0 and 100')
                : Promise.resolve(''),
          },
        ]}
      >
        <InputNumber
          className='w-full'
          size={isMobile ? 'middle' : 'large'}
          placeholder='Enter Percentage'
          value={education.percentage}
          onChange={(num) => onChange('percentage', num)}
        />
      </Form.Item>

      <Form.Item
        name={`${name}.boardOrUni`}
        label='Board Or University'
        rules={[{ required: true }]}
      >
        <Input
          size={isMobile ? 'middle' : 'large'}
          placeholder='Enter Education Board Or University'
          value={education.boardOrUni}
          onChange={(e) => onChange('boardOrUni', e.target.value)}
        />
      </Form.Item>
    </Fragment>
  );
};

interface IProps {
  payload: IRegisterPayload;
  setPayload: React.Dispatch<React.SetStateAction<IRegisterPayload>>;
}

const Education: React.FC<IProps> = ({ payload, setPayload }) => {
  const onMatriculationChange = (name: string, value: string) => {
    setPayload((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        matriculation: { ...prev.education.matriculation, [name]: value },
      },
    }));
  };

  const onIntermediateChange = (name: string, value: string) => {
    setPayload((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        intermediate: { ...prev.education.intermediate, [name]: value },
      },
    }));
  };

  const onGraduationChange = (name: string, value: string) => {
    setPayload((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        graduation: { ...prev.education.graduation, [name]: value },
      },
    }));
  };

  const onOthersChange = (name: string, value: string) => {
    setPayload((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        ...(prev.education.other
          ? { other: { ...prev.education.other, [name]: value } }
          : {
              other: {
                boardOrUni: '',
                education: '',
                passYear: 2000,
                percentage: 0,
                [name]: value,
              },
            }),
        // other: { ...prev.education.other, [name]: value },
      },
    }));
  };

  return (
    <Fragment>
      <Typography.Title level={2}>
        Matriculation (Class 10) details
      </Typography.Title>
      <EducationContainer
        disabled={false}
        education={payload.education.matriculation}
        name='Matriculation'
        onChange={onMatriculationChange}
      />

      <br />
      <br />

      <Typography.Title level={2}>
        Intermediate (Class 12) details
      </Typography.Title>
      <EducationContainer
        disabled={false}
        education={payload.education.intermediate}
        name='Intermediate'
        onChange={onIntermediateChange}
      />

      <br />
      <br />

      <Typography.Title level={2}>Graduation details</Typography.Title>
      <EducationContainer
        disabled={false}
        education={payload.education.intermediate}
        name='Graduation'
        onChange={onGraduationChange}
      />

      <br />
      <br />

      <Typography.Title level={2}>Other details</Typography.Title>
      <Typography.Text type='secondary'>
        Other Details are optional
      </Typography.Text>
      <EducationContainer
        disabled={false}
        education={payload.education.other}
        name='Other'
        onChange={onOthersChange}
      />
    </Fragment>
  );
};

export default Education;
