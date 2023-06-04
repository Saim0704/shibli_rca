import { Button, Form, Input, Typography, message } from 'antd';
import React, { Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../hooks/api';
import { uiContext } from '../../hooks/ui';

interface IProps {}

const ForgotPassword: React.FC<IProps> = () => {
  const [isStep2, setIsStep2] = useState(false);
  const [{ isMobile }] = useContext(uiContext);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const reset = () => form.resetFields();

  const handleSubmit = async (values: any) => {
    if (!isStep2) {
      if (!values.email) {
        message.error('Email is required');
        return;
      }
      try {
        await instance.post('/forgot-password', {
          email: values.email,
          step: 1,
        });
        message.success('OTP sent to your email');
      } catch (err) {
        console.log(err);
        message.error(
          'Could not send mail to your email, check your email again'
        );
      }
      setIsStep2(true);
      return;
    }
    if (!values.email || !values.otp || !values.password) {
      message.error('All fields are required');
      return;
    }
    try {
      await instance.post('/reset-password', {
        email: values.email,
        otp: values.otp,
        password: values.password,
        step: 2,
      });
      message.success('Password updated successfully');
      form.resetFields();
      navigate('/user/auth');
    } catch (err) {
      console.log(err);
      message.error(
        'Could not update your password, try again after a few minutes'
      );
    }
  };

  return (
    <div
      className='center-all'
      style={{ height: 'calc(100vh - 158px)', flexDirection: 'column' }}
    >
      <div className='bg-white w-full max-w-xl p-2 sm:p-4 mx-2 sm:mx-4 rounded-md shadow-md'>
        <Typography.Title className='text-center' level={2}>
          Forgot Password
        </Typography.Title>

        <br />

        <Form
          form={form}
          name='login-form'
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 600, width: '100%' }}
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input
              placeholder='Enter your Email'
              size={isMobile ? 'middle' : 'large'}
            />
          </Form.Item>

          {isStep2 ? (
            <Fragment>
              <Form.Item
                label='OTP'
                name='otp'
                rules={[
                  {
                    required: true,
                    message: 'Please enter OTP received on your email',
                  },
                ]}
              >
                <Input
                  placeholder='Enter the OTP received'
                  size={isMobile ? 'middle' : 'large'}
                />
              </Form.Item>
              <div className='flex items-center justify-center -mt-4 mb-4'>
                <Typography.Text type='secondary'>
                  Also check the spam folder
                </Typography.Text>
              </div>

              <Form.Item
                label='Password'
                name='password'
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password
                  placeholder='Enter Password'
                  size={isMobile ? 'middle' : 'large'}
                />
              </Form.Item>
            </Fragment>
          ) : null}

          <Form.Item>
            <div className='flex items-center justify-center gap-2'>
              <Button
                type='primary'
                size={isMobile ? 'middle' : 'large'}
                htmlType='submit'
              >
                {isStep2 ? 'Update Password' : 'Send OTP'}
              </Button>

              <Button size={isMobile ? 'middle' : 'large'} onClick={reset}>
                Reset
              </Button>
            </div>
          </Form.Item>

          {!isStep2 ? (
            <div className='flex items-center justify-center'>
              <Button type='link' onClick={() => setIsStep2(true)}>
                I already have an OTP
              </Button>
            </div>
          ) : null}
        </Form>

        <div className='flex items-center justify-center gap-2'>
          <Button
            size={isMobile ? 'middle' : 'large'}
            type='link'
            onClick={() => navigate('/user/auth')}
          >
            Remember Password or Create new Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
