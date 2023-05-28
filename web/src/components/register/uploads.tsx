import React, { Fragment } from 'react';
import { Form, InputNumber } from 'antd';
import ImageUploader from '../uploadImage';
import { IRegisterPayload } from './stepper';
import { useRecoilValue } from 'recoil';
// import { uiAtom } from 'rca/utils/atoms';

interface IProps {
  payload: IRegisterPayload;
  setPayload: React.Dispatch<React.SetStateAction<IRegisterPayload>>;
}

const Uploads: React.FC<IProps> = ({ payload, setPayload }) => {
  const { isMobile } = useRecoilValue(uiAtom);

  const handleImageFile = async (name: string, imgUrl: string) => {
    if (!imgUrl) return;
    setPayload((prev) => ({ ...prev, [name]: imgUrl }));
  };

  return (
    <Fragment>
      <Form.Item label='Aadhar Card Number' name='aadharCard'>
        <InputNumber
          size={isMobile ? 'middle' : 'large'}
          className='w-full'
          placeholder='Enter Aadhar Card Number'
          value={payload.aadharCard}
          onChange={(val) =>
            setPayload((p) => ({ ...p, aadharCard: p.aadharCard || val || '' }))
          }
        />
      </Form.Item>

      <ImageUploader
        upload={true}
        label='Photograph'
        name='photograph'
        required
        handleImageUrl={(imgUrl) => handleImageFile('photograph', imgUrl)}
      />
      <ImageUploader
        upload={true}
        label='Signature'
        name='signature'
        required
        handleImageUrl={(imgUrl) => handleImageFile('signature', imgUrl)}
      />
      <ImageUploader
        upload={true}
        label='Last Semester Certificate'
        name='lastSemesterCertificate'
        handleImageUrl={(imgUrl) =>
          handleImageFile('lastSemesterCertificate', imgUrl)
        }
      />
    </Fragment>
  );
};

export default Uploads;
