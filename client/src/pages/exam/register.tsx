// import { Button, Form, message, Steps, Typography } from 'antd';
// import { Fragment, useContext, useEffect, useState } from 'react';

import { Typography } from 'antd';
import { Fragment } from 'react';

// import {
//   defaultPayload,
//   IRegisterPayload,
// } from '../../components/register/stepper';
// import Address from '../../components/register/address';
// import Uploads from '../../components/register/uploads';
// import Payment from '../../components/register/payment';
// import Education from '../../components/register/education';
// import BasicInfo from '../../components/register/basicInfo';
// import Agreements from '../../components/register/agreements';
// import Confirmation from '../../components/register/confirmation';
// import { validateRegister } from '../../components/register/validate';
// import EarlierCompetitiveExamsContainer from '../../components/register/earlierCompetitiveExams';
// import useSession from '../../hooks/session';
// import { useNavigate } from 'react-router-dom';
// import instance from '../../hooks/api';
// import { uiContext } from '../../hooks/ui';
// import Loading from '../../components/loading';
// import {
//   BookOutlined,
//   CheckCircleOutlined,
//   DollarCircleOutlined,
//   FileImageOutlined,
//   HomeOutlined,
//   InfoCircleOutlined,
//   ReconciliationOutlined,
//   SolutionOutlined,
// } from '@ant-design/icons';

const Register = () => {
  // const [form] = Form.useForm();
  // const [payload, setPayload] = useState<IRegisterPayload>(defaultPayload);
  // const [{ isMobile }] = useContext(uiContext);
  // const navigate = useNavigate();
  // const [pageLoading, setPageLoading] = useState(true);

  // const {
  //   me: { authenticated, loading, user },
  //   getToken,
  // } = useSession();

  // const checkRegister = async () => {
  //   if (loading) return;
  //   if (!authenticated) {
  //     navigate('/user/auth?redirect=exam-register', { replace: true });
  //     return;
  //   }

  //   if (user?.type === 'ADMIN') {
  //     navigate('/', { replace: true });
  //     return;
  //   }

  //   try {
  //     setPageLoading(true);
  //     const { data } = await instance.get('/initial');
  //     if (data.registration && data.testCenter) {
  //       if (data.registration.registerComplete) {
  //         navigate('/user/profile', { replace: true });
  //       } else {
  //         setPayload((prev) => ({ ...prev, ...data.registration }));
  //       }
  //     }
  //   } catch (err: any) {
  //     console.log(err);
  //   } finally {
  //     setPageLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   checkRegister().then().catch(console.log);
  // }, [authenticated, user, loading]);

  // const setStep = (step: number) => () => {
  //   setPayload((prev) => ({ ...prev, currentStep: step }));
  // };

  // const goToPreviousStep = () => {
  //   if (payload.currentStep === 0) return;
  //   setPayload((prev) => ({ ...prev, currentStep: prev.currentStep - 1 }));
  // };

  // const goToNextStep = () => {
  //   if (payload.currentStep === steps.length - 1) return;
  //   setPayload((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
  // };

  // const steps = [
  //   <BasicInfo payload={payload} setPayload={setPayload} />,
  //   <Address payload={payload} setPayload={setPayload} />,
  //   <Education payload={payload} setPayload={setPayload} />,
  //   <EarlierCompetitiveExamsContainer
  //     payload={payload}
  //     setPayload={setPayload}
  //   />,
  //   <Uploads payload={payload} setPayload={setPayload} />,
  //   <Payment payload={payload} setPayload={setPayload} />,
  //   <Agreements payload={payload} setPayload={setPayload} />,
  //   <Confirmation payload={payload} />,
  // ];

  // const handleRegister = async () => {
  //   const errors = validateRegister(payload);
  //   if (!user?._id) errors.push("User doesn't exist");

  //   if (errors.length > 0) {
  //     message.error(
  //       <div className='w-full max-w-[350px] flex gap-2 flex-col items-center'>
  //         {errors.map((t) => (
  //           <Fragment key={t}>
  //             <div className='w-full bg-red-200 rounded-md px-2 py-1'>{t}</div>
  //           </Fragment>
  //         ))}
  //       </div>,
  //       5 // 5 seconds
  //     );
  //     return;
  //   }

  //   try {
  //     await instance.post(
  //       '/register',
  //       { ...payload, user: user?._id },
  //       { headers: { Authorization: `Bearer ${getToken()}` } }
  //     );
  //     setPayload(defaultPayload);
  //     form.resetFields();
  //     message.success('Successfully registered');
  //   } catch (err: any) {
  //     console.log(err);
  //     message.error('Something went wrong');
  //   }
  // };

  // const commonStepStyles: React.CSSProperties = {
  //   cursor: 'pointer',
  // };

  // if (pageLoading) return <Loading loading={pageLoading} />;

  return (
    <Fragment>
      <div className='flex flex-col h-[calc(100vh-128px)] items-center justify-center'>
        <Typography.Title level={2}>Registrations closed</Typography.Title>
        <Typography.Text>
          The registration form is not accepting further responses
        </Typography.Text>
      </div>
      {/* <div className='flex gap-4 flex-col m-2 sm:m-4 sm:flex-row justify-center sm:mt-10'>
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
      </div> */}
    </Fragment>
  );
};

export default Register;
