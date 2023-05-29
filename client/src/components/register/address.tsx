import { Checkbox, Form, Input, InputNumber, Select, Typography } from 'antd';
import { IRegisterPayload } from './stepper';
import React, { Fragment, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { uiAtom } from '../../utils/atoms';

const indianStates = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttarakhand',
  'Uttar Pradesh',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli',
  'Daman and Diu',
  'Delhi',
  'Lakshadweep',
  'Puducherry',
];

interface IInnerProps {
  address: IRegisterPayload['correspondenceAddress'];
  onChange: (name: string, value: any) => void;
  name: 'permanentAddress' | 'correspondenceAddress';
  disabled: boolean;
}

const AddressContainer: React.FC<IInnerProps> = ({
  address,
  onChange,
  name,
  disabled,
}) => {
  const { isMobile } = useRecoilValue(uiAtom);

  return (
    <Fragment>
      <Form.Item name={`${name}.landmark`} label='Landmark'>
        <Input
          disabled={disabled}
          size={isMobile ? 'middle' : 'large'}
          placeholder='Enter Locality Landmark'
          value={address.state}
          onChange={(e) => onChange('landmark', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name={`${name}.postalCode`}
        label='Postal Code'
        rules={[{ required: true }]}
      >
        <InputNumber
          disabled={disabled}
          size={isMobile ? 'middle' : 'large'}
          placeholder='Postal Code'
          value={address.postalCode}
          className='w-full'
          onChange={(val) => onChange('postalCode', val)}
        />
      </Form.Item>

      <Form.Item
        name={`${name}.cityOrTown`}
        label='City Or Town'
        rules={[{ required: true }]}
      >
        <Input
          disabled={disabled}
          size={isMobile ? 'middle' : 'large'}
          placeholder='Enter City Or Town'
          value={address.city}
          onChange={(e) => onChange('cityOrTown', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name={`${name}.district`}
        label='district'
        rules={[{ required: true }]}
      >
        <Input
          disabled={disabled}
          size={isMobile ? 'middle' : 'large'}
          placeholder='Enter District'
          value={address.state}
          onChange={(e) => onChange('district', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name={`${name}.state`}
        label='State'
        rules={[{ required: true }]}
      >
        <Select
          size={isMobile ? 'middle' : 'large'}
          placeholder='Enter State'
          value={address.state}
          disabled={disabled}
          onChange={(e) => onChange('state', e)}
          options={indianStates.map((t) => ({ label: t, value: t }))}
        />
      </Form.Item>
    </Fragment>
  );
};

interface IProps {
  payload: IRegisterPayload;
  setPayload: React.Dispatch<React.SetStateAction<IRegisterPayload>>;
}

const Address: React.FC<IProps> = ({ payload, setPayload }) => {
  const [isSameAddress, setIsSameAddress] = useState(false);

  const onPermanentAddressChange = (name: string, value: any) => {
    if (isSameAddress) return;
    setPayload((prev) => ({
      ...prev,
      permanentAddress: { ...prev.permanentAddress, [name]: value },
    }));
  };

  const onCorrespondenceAddressChange = (name: string, value: any) => {
    setPayload((prev) => ({
      ...prev,
      correspondenceAddress: { ...prev.correspondenceAddress, [name]: value },
      ...(isSameAddress
        ? { permanentAddress: { ...prev.correspondenceAddress, [name]: value } }
        : {}),
    }));
  };

  const onSameAddressCheck = (val: boolean) => {
    setIsSameAddress(val);
    if (val) {
      setPayload((prev) => ({
        ...prev,
        permanentAddress: prev.correspondenceAddress,
      }));
    }
  };

  return (
    <Fragment>
      <Typography.Title level={4}>Correspondence Address</Typography.Title>
      <AddressContainer
        disabled={false}
        name='correspondenceAddress'
        address={payload.correspondenceAddress}
        onChange={onCorrespondenceAddressChange}
      />

      <br />
      <br />

      <Typography.Title level={4}>Permanent Address</Typography.Title>
      <Checkbox onChange={(e) => onSameAddressCheck(e.target.checked)} />
      <Typography.Text className='ml-2'>
        Same as Correspondence Address
      </Typography.Text>

      {!isSameAddress && (
        <AddressContainer
          disabled={isSameAddress}
          name='permanentAddress'
          address={payload.permanentAddress}
          onChange={onPermanentAddressChange}
        />
      )}
    </Fragment>
  );
};

export default Address;
