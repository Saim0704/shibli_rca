import { Form, Image, Input, Typography } from 'antd';
import React, { Fragment, useContext } from 'react';
import { IRegisterPayload } from './stepper';
import { uiContext } from '../../hooks/ui';

interface IProps {
  payload: IRegisterPayload;
  setPayload: React.Dispatch<React.SetStateAction<IRegisterPayload>>;
}

const Payment: React.FC<IProps> = ({ payload, setPayload }) => {
  const [{ isMobile }] = useContext(uiContext);

  return (
    <Fragment>
      <Image
        src='/qrCode.jpeg'
        preview={false}
        className='p-2 border-gray-300 rounded-md'
      />

      <br />
      <br />

      <Typography.Text>
        Complete payment and enter the transaction ID below
      </Typography.Text>

      <Form.Item
        name='transactionId'
        label='Transaction ID'
        rules={[{ required: true }]}
      >
        <Input
          size={isMobile ? 'middle' : 'large'}
          placeholder='Enter Transaction Id of your payment'
          value={payload.transactionId}
          onChange={(e) =>
            setPayload({ ...payload, transactionId: e.target.value })
          }
        />
      </Form.Item>
    </Fragment>
  );
};

export default Payment;
