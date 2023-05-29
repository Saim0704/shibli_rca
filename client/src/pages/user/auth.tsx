import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import useSession from '../../hooks/session';
import { uiAtom } from '../../utils/atoms';
import Loading from '../../components/loading';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const {
    me: { authenticated },
    login,
  } = useSession();
  const [loading, setLoading] = React.useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  const { isMobile } = useRecoilValue(uiAtom);

  React.useEffect(() => {
    if (authenticated) {
      navigate('/', { replace: true });
    }
    // if (router.query.redirect && router.query.redirect === 'exam-register') {
    //   message.warning('Please Sign in First');
    // }
  }, []);

  const createAccount = async (
    name: string,
    email: string,
    password: string
  ) => {
    if (!name || !email || !password)
      message.error('Please enter all the fields');

    await axios.post('/api/user/create-account', {
      email,
      password,
      name,
    });
  };

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      if (authType === 'register')
        await createAccount(values.name, values.email, values.password);

      const res = await login({
        username: values.username,
        password: values.password,
      });

      if (!res) throw new Error('Login failed!');
      message.success('Login successful!');
      // if (router.query.redirect && router.query.redirect === 'exam-register') {
      //   navigate('/exam/register', { replace: true });
      // }
    } catch (err: any) {
      message.error(err.message || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => form.resetFields();

  const onFinishFailed = (errorInfo: any) => {
    console.log({ errorInfo });
  };

  const forgotPassword = () => {
    navigate('/user/forgot-password');
  };

  if (loading) return <Loading loading={loading} />;

  return (
    <div
      className='center-all'
      style={{ height: 'calc(100vh - 158px)', flexDirection: 'column' }}
    >
      <div className='bg-white w-full max-w-xl p-2 sm:p-4 mx-2 sm:mx-4 rounded-md shadow-md'>
        <Typography.Title className='text-center' level={2}>
          {authType === 'register' ? 'Create Account' : 'Login'}
        </Typography.Title>

        <br />

        <Form
          form={form}
          name='login-form'
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 600, width: '100%' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {authType === 'register' && (
            <Form.Item
              label='Name'
              name='name'
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input
                placeholder='Enter your Name'
                size={isMobile ? 'middle' : 'large'}
              />
            </Form.Item>
          )}

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

          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder='Enter Password'
              size={isMobile ? 'middle' : 'large'}
            />
          </Form.Item>
          <div className='flex items-center justify-center -mt-4 mb-4 md:ml-20'>
            <Typography.Text type='secondary'>
              Please remember your password, you MAY NOT be able to update later
            </Typography.Text>
          </div>

          <Form.Item>
            <div className='flex items-center justify-center gap-2'>
              <Button
                type='primary'
                size={isMobile ? 'middle' : 'large'}
                htmlType='submit'
              >
                {authType === 'register' ? 'Create Account' : 'Login'}
              </Button>

              <Button onClick={reset}>Reset</Button>

              {authType === 'login' && (
                <Button
                  size={isMobile ? 'middle' : 'large'}
                  type='link'
                  onClick={forgotPassword}
                >
                  Forgot password
                </Button>
              )}
            </div>
          </Form.Item>
        </Form>

        <div className='flex items-center justify-center gap-2'>
          {authType === 'register' ? (
            <Button
              size={isMobile ? 'middle' : 'large'}
              type='link'
              onClick={() => setAuthType('login')}
            >
              Already Have an Account ? Login Here
            </Button>
          ) : (
            <Button
              size={isMobile ? 'middle' : 'large'}
              type='link'
              onClick={() => setAuthType('register')}
            >
              Don&apos;t Have an Account yet ? Create Account
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
