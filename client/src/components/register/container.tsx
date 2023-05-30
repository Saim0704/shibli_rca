import { Button, Form } from 'antd';
import React from 'react';
import Address from './address';
import Uploads from './uploads';
import Payment from './payment';
import Education from './education';
import BasicInfo from './basicInfo';
import Agreements from './agreements';
import EarlierCompetitiveExamsContainer from './earlierCompetitiveExams';
import { IRegisterPayload } from './stepper';
import { useRecoilValue } from 'recoil';
import { uiAtom } from '../../utils/atoms';

interface IProps {
  payload: IRegisterPayload;
  setPayload: React.Dispatch<React.SetStateAction<IRegisterPayload>>;
}

const RegisterContainer: React.FC<IProps> = ({ payload, setPayload }) => {
  const { isMobile } = useRecoilValue(uiAtom);

  const handleRegister = async () => {};

  const goToPreviousStep = () => {
    if (payload.currentStep === 0) return;
    setPayload((prev) => ({ ...prev, currentStep: prev.currentStep - 1 }));
  };

  const goToNextStep = () => {
    if (payload.currentStep === steps.length - 1) return;
    setPayload((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
  };

  const [form] = Form.useForm();

  const steps = [
    <BasicInfo payload={payload} setPayload={setPayload} />,
    <Address payload={payload} setPayload={setPayload} />,
    <Education payload={payload} setPayload={setPayload} />,
    <EarlierCompetitiveExamsContainer
      payload={payload}
      setPayload={setPayload}
    />,
    <Uploads payload={payload} setPayload={setPayload} />,
    <Payment payload={payload} setPayload={setPayload} />,
    <Agreements payload={payload} setPayload={setPayload} />,
  ];

  return (
    <>
      <div className='p-2 sm:p-4 bg-white rounded-md shadow-md w-full max-w-lg h-full'>
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          form={form}
          onFinish={handleRegister}
        >
          {steps[payload.currentStep]}
        </Form>
        <div className='flex justify-between gap-2 mt-10'>
          <Button
            size={isMobile ? 'middle' : 'large'}
            disabled={payload.currentStep === 0}
            onClick={goToPreviousStep}
          >
            Previous
          </Button>
          <Button
            size={isMobile ? 'middle' : 'large'}
            disabled={payload.currentStep === steps.length - 1}
            onClick={goToNextStep}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default RegisterContainer;
