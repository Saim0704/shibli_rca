import React, { useContext, useState } from 'react';
import { Form, Input, Button, Typography, message, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import useSession from '../../hooks/session';
import Loading from '../../components/loading';
import instance from '../../hooks/api';
import { uiContext } from '../../hooks/ui';

const Auth = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const [form] = Form.useForm();
  const {
    me: { authenticated, loading },
    login,
  } = useSession();
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  const [{ isMobile }] = useContext(uiContext);

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
    password: string,
    mobile: number
  ) => {
    if (!name || !email || !password || !mobile)
      message.error('Please enter all the fields');
    try {
      await instance.post('/create-account', {
        email,
        password,
        name,
        mobile: mobile.toString(),
      });
      message.success('Account created successfully!');
    } catch (err: any) {
      message.error('User Already exists!');
      throw new Error('User Already exists!');
    }
  };

  const onFinish = async (values: any) => {
    try {
      if (authType === 'register') {
        await createAccount(
          values.name,
          values.email,
          values.password,
          values.mobile
        );
      }
      const res = await login({
        email: values.email,
        password: values.password,
      });

      if (!res) throw new Error('Login failed!');
      message.success('Login successful!');
      navigate('/', { replace: true });
    } catch (err: any) {
      message.error(err.message || 'Login failed!');
    } finally {
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
          {authType === 'register' ? (
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
          ) : null}

          {authType === 'register' ? (
            <Form.Item
              label='Mobile'
              name='mobile'
              rules={[
                {
                  required: true,
                  message: 'Please enter your mobile number',
                },
                {
                  validator: (_, value, callback) => {
                    if (value.toString().length !== 10) {
                      callback('Mobile number must be of 10 digits');
                    }
                  },
                },
              ]}
            >
              <InputNumber
                className='w-full'
                placeholder='Enter your Mobile Number'
                size={isMobile ? 'middle' : 'large'}
              />
            </Form.Item>
          ) : null}

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
                onClick={() => onFinish(form.getFieldsValue())}
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
