import { DatePicker, Form, Input, Select } from 'antd';
import dayjs from 'dayjs';
import { IRegisterPayload } from './stepper';
import React, { Fragment, useContext } from 'react';
import { toSentenceCase } from '../../utils/strings';
import { uiContext } from '../../hooks/ui';

interface IProps {
  payload: IRegisterPayload;
  setPayload: React.Dispatch<React.SetStateAction<IRegisterPayload>>;
}

const BasicInfo: React.FC<IProps> = ({ payload, setPayload }) => {
  const [{ isMobile }] = useContext(uiContext);

  const onChange = (name: string, value: any) => {
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Fragment>
      <Form.Item
        label='Father Name'
        name='fatherName'
        rules={[{ required: true }]}
      >
        <Input
          size={isMobile ? 'middle' : 'large'}
          placeholder="Enter Father's name"
          value={payload.fatherName}
          onChange={(e) => onChange('fatherName', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label='Mother Name'
        name='motherName'
        rules={[{ required: true }]}
      >
        <Input
          size={isMobile ? 'middle' : 'large'}
          placeholder="Enter Mother's name"
          value={payload.motherName}
          onChange={(e) => onChange('motherName', e.target.value)}
        />
      </Form.Item>

      <Form.Item name='gender' label='Gender' rules={[{ required: true }]}>
        <Select
          value={payload.gender}
          onChange={(val) => onChange('gender', val)}
          placeholder='Select Gender'
          size={isMobile ? 'middle' : 'large'}
          options={[
            { label: 'Male', value: 'M' },
            { label: 'Female', value: 'F' },
            { label: 'Other', value: 'O' },
          ]}
        />
      </Form.Item>

      <Form.Item name='category' label='Category' rules={[{ required: true }]}>
        <Select
          value={payload.category}
          onChange={(val) => onChange('category', val)}
          placeholder='Select Category'
          size={isMobile ? 'middle' : 'large'}
          options={[
            'MUSLIM_GENERAL',
            'MUSLIM_ST',
            'MUSLIM_OBC',
            'MUSLIM_EWS',
            'PWD',
          ].map((t) => ({ label: toSentenceCase(t), value: t }))}
        />
      </Form.Item>

      <Form.Item
        label='Date of Birth'
        name='dateOfBirth'
        rules={[{ required: true }]}
      >
        <DatePicker
          format='DD-MM-YYYY'
          style={{ width: '100%' }}
          size={isMobile ? 'middle' : 'large'}
          placeholder='Enter Date of Birth'
          value={dayjs(payload.dateOfBirth)}
          onChange={(val) =>
            onChange('dateOfBirth', dayjs(val).format('DD-MM-YYYY'))
          }
        />
      </Form.Item>

      <Form.Item
        label='Mobile Number'
        name='mobileNumber'
        rules={[
          { required: true },
          { len: 10, message: 'Mobile Number should be of 10 digits' },
        ]}
      >
        <Input
          type='tel'
          size={isMobile ? 'middle' : 'large'}
          placeholder='Enter Mobile Number'
          value={payload.mobileNumber}
          onChange={(e) => onChange('mobileNumber', e.target.value)}
        />
      </Form.Item>

      <Form.Item label='Phone Number' name='phoneNumber'>
        <Input
          type='tel'
          size={isMobile ? 'middle' : 'large'}
          placeholder='Enter Phone Number'
          value={payload.phoneNumber}
          onChange={(e) => onChange('phoneNumber', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label='Language Of Exam'
        name='languageOfExam'
        rules={[{ required: true, message: 'Please select language of exam' }]}
      >
        <Select
          options={['English', 'Hindi', 'Urdu'].map((t) => ({
            label: t,
            value: t,
          }))}
          value={payload.languageOfExam}
          onChange={(val) => onChange('languageOfExam', val)}
          placeholder='Select Language Of Exam'
          size={isMobile ? 'middle' : 'large'}
        />
      </Form.Item>
    </Fragment>
  );
};

export default BasicInfo;
