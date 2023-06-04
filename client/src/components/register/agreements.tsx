import React, { Fragment, useContext, useEffect, useState } from 'react';
import { IRegisterPayload } from './stepper';
import { Checkbox, Form, Select, Typography } from 'antd';
import { ITestCenter } from '../../types/models';
import instance from '../../hooks/api';
import { uiContext } from '../../hooks/ui';

interface IProps {
  payload: IRegisterPayload;
  setPayload: React.Dispatch<React.SetStateAction<IRegisterPayload>>;
}

const Agreements: React.FC<IProps> = ({ payload, setPayload }) => {
  const [testCentres, setTestCenters] = useState<ITestCenter[]>([]);
  const [{ isMobile }] = useContext(uiContext);

  const onChange = (name: string, value: boolean) => {
    setPayload((prev) => ({
      ...prev,
      agreeToTerms: {
        ...prev.agreeToTerms,
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    const getTestCenters = async () => {
      const { data } = await instance.get('/test-centers');
      setTestCenters(data.data);
    };
    getTestCenters().then().catch(console.log);
  }, []);

  return (
    <Fragment>
      <Checkbox
        onChange={(e) => onChange('informationIsCorrect', e.target.checked)}
        checked={payload.agreeToTerms.informationIsCorrect}
      />
      <Typography.Text className='ml-2'>
        Information given by me is correct
      </Typography.Text>

      <br />
      <br />

      <Checkbox
        onChange={(e) => onChange('rightToChange', e.target.checked)}
        checked={payload.agreeToTerms.rightToChange}
      />
      <Typography.Text className='ml-2'>
        Details in the exam can be changed by the Shibli RCA at any time
      </Typography.Text>

      <br />
      <br />

      <Form.Item
        name='testCenter'
        label='Choose your Test Center'
        rules={[{ required: true, message: 'Test Center is required' }]}
      >
        <Select
          size={isMobile ? 'middle' : 'large'}
          placeholder='Select Your Test Center'
          options={(testCentres || []).map((t: ITestCenter) => ({
            label: t.address,
            value: t._id,
          }))}
          {...(payload.testCenter ? { value: payload.testCenter } : {})}
          onChange={(value) =>
            setPayload((prev) => ({ ...prev, testCenter: value as any }))
          }
        />
        <Typography.Text type='danger'>
          Test Centres are provisional and are subject to change until you
          receive the final admit card
        </Typography.Text>
      </Form.Item>
    </Fragment>
  );
};

export default Agreements;
