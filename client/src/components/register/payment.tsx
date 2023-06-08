import { Form, Image, Input, Typography } from 'antd';
import React, { Fragment, useContext } from 'react';
import { IRegisterPayload } from './stepper';
import { uiContext } from '../../hooks/ui';
import ImageUploader from '../uploadImage';

interface IProps {
  payload: IRegisterPayload;
  setPayload: React.Dispatch<React.SetStateAction<IRegisterPayload>>;
}

const Payment: React.FC<IProps> = ({ payload, setPayload }) => {
  const [{ isMobile }] = useContext(uiContext);

  const handleImageFile = async (name: string, imgUrl: string) => {
    if (!imgUrl) return;
    setPayload((prev) => ({ ...prev, [name]: imgUrl }));
  };

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

      <Typography.Title level={5}>
        The registration amount is 300 INR
      </Typography.Title>

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

      <Typography.Title level={5}>
        Upload the screenshot of the transaction as a proof of the transaction
      </Typography.Title>

      <ImageUploader
        upload={true}
        label='Transaction Proof'
        name='transaction'
        required
        handleImageUrl={(imgUrl) => handleImageFile('transaction', imgUrl)}
      />
    </Fragment>
  );
};

export default Payment;
