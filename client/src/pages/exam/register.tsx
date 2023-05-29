import {
  BookOutlined,
  CheckCircleOutlined,
  DollarCircleOutlined,
  FileImageOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  ReconciliationOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { Button, Form, message, Steps } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';

import {
  defaultPayload,
  IRegisterPayload,
} from '../../components/register/stepper';
import Address from '../../components/register/address';
import Uploads from '../../components/register/uploads';
import Payment from '../../components/register/payment';
import Education from '../../components/register/education';
import BasicInfo from '../../components/register/basicInfo';
import Agreements from '../../components/register/agreements';
import Confirmation from '../../components/register/confirmation';
import { validateRegister } from '../../components/register/validate';
import EarlierCompetitiveExamsContainer from '../../components/register/earlierCompetitiveExams';
import { IRegistration, ITestCenter } from '../../types/models';
import { uiAtom } from '../../utils/atoms';
import useSession from '../../hooks/session';
import { useNavigate } from 'react-router-dom';

type IProps = {
  registration: IRegistration | null;
  testCenter: ITestCenter | null;
};

const Register: React.FC<IProps> = (props) => {
  const [form] = Form.useForm();
  const [payload, setPayload] = useState<IRegisterPayload>(defaultPayload);
  const { isMobile } = useRecoilValue(uiAtom);
  const navigate = useNavigate();

  const {
    me: { authenticated, loading, user },
  } = useSession();

  useEffect(() => {
    if (loading) return;
    else if (!authenticated) {
      navigate('/user/auth?redirect=exam-register', { replace: true });
    } else if (user?.type === 'ADMIN') {
      navigate('/user/auth', { replace: true });
    } else {
      const getInitialData = async () => {
        const { data } = await axios.get('/api/user/initial');
        if (data.registration && data.testCenter) {
          if (data.registration.registerComplete) {
            navigate('/user/profile', { replace: true });
          } else {
            setPayload((prev) => ({ ...prev, ...data.registration }));
          }
        }
      };
      getInitialData().then().catch(console.log);
    }
  }, [props]);

  const setStep = (step: number) => () => {
    setPayload((prev) => ({ ...prev, currentStep: step }));
  };

  const goToPreviousStep = () => {
    if (payload.currentStep === 0) return;
    setPayload((prev) => ({ ...prev, currentStep: prev.currentStep - 1 }));
  };

  const goToNextStep = () => {
    if (payload.currentStep === steps.length - 1) return;
    setPayload((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
  };

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
    <Confirmation payload={payload} />,
  ];

  const handleRegister = async () => {
    try {
      const errors = validateRegister(payload);
      // @ts-ignore
      if (!session.data?.user?._id) errors.push("User doesn't exist");

      if (errors.length > 0) {
        message.error(
          <div className='w-full max-w-[350px] flex gap-2 flex-col items-center'>
            {errors.map((t) => (
              <Fragment key={t}>
                <div className='w-full bg-red-200 rounded-md px-2 py-1'>
                  {t}
                </div>
              </Fragment>
            ))}
          </div>
        );
        return;
      }

      await axios.post('/api/user/register', {
        ...payload,
        // @ts-ignore
        user: session.data?.user?._id,
      });
      setPayload(defaultPayload);
      message.success('Successfully registered');
    } catch (err: any) {
      console.log(err);
      message.error('Something went wrong');
    }
  };

  const commonStepStyles: React.CSSProperties = {
    cursor: 'pointer',
  };

  return (
    <Fragment>
      <div className='flex gap-4 flex-col m-2 sm:m-4 sm:flex-row justify-center sm:mt-10'>
        <div className='p-2 sm:p-4 bg-white rounded-md shadow-md h-full'>
          <Steps
            direction='vertical'
            className='overflow-x-auto style-scroll-bar py-2'
            current={payload.currentStep}
            items={[
              {
                title: 'Basic Information',
                icon: <InfoCircleOutlined />,
                subTitle: '',
                style: commonStepStyles,
                onClick: setStep(0),
              },
              {
                title: 'Addresses',
                icon: <HomeOutlined />,
                subTitle: '',
                style: commonStepStyles,
                onClick: setStep(1),
              },
              {
                title: 'Education Details',
                icon: <BookOutlined />,
                subTitle: '',
                style: commonStepStyles,
                onClick: setStep(2),
              },
              {
                title: 'Previous Exams',
                icon: <ReconciliationOutlined />,
                subTitle: '',
                style: commonStepStyles,
                onClick: setStep(3),
              },
              {
                title: 'Uploads',
                icon: <FileImageOutlined />,
                subTitle: '',
                style: commonStepStyles,
                onClick: setStep(4),
              },
              {
                title: 'Payment',
                icon: <DollarCircleOutlined />,
                subTitle: '',
                style: commonStepStyles,
                onClick: setStep(5),
              },
              {
                title: 'Terms and Conditions',
                icon: <SolutionOutlined />,
                subTitle: '',
                style: commonStepStyles,
                onClick: setStep(6),
              },
              {
                title: 'Confirmation',
                icon: <CheckCircleOutlined />,
                subTitle: '',
                style: commonStepStyles,
                onClick: setStep(7),
              },
            ]}
          />
        </div>

        <div className='p-2 sm:p-4 bg-white rounded-md shadow-md w-full max-w-lg h-full'>
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            form={form}
            onFinish={handleRegister}
          >
            {steps[payload.currentStep]}

            {payload.currentStep !== steps.length - 1 ? (
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
            ) : null}
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
