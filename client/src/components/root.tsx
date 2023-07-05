import React, { PropsWithChildren, useContext, useLayoutEffect } from 'react';
import {
  Button,
  ConfigProvider,
  Dropdown,
  Image,
  Layout,
  MenuProps,
  theme,
  Typography,
} from 'antd';
import enUs from 'antd/locale/en_US';
import constants from '../utils/constants';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useSession from '../hooks/session';
import Loading from './loading';
import { uiContext } from '../hooks/ui';
import { baseURL } from '../hooks/api';

interface IContainerProps extends PropsWithChildren {}
const AppContainer: React.FC<IContainerProps> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [ui, setUi] = useContext(uiContext);
  const navigate = useNavigate();
  const {
    me: { authenticated, user },
    logout,
  } = useSession();

  useLayoutEffect(() => {
    const setWindowWidth = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth > 576) setUi((prev) => ({ ...prev, isMobile: false }));
      else setUi((prev) => ({ ...prev, isMobile: true }));
    };
    setWindowWidth();
    window.addEventListener('resize', setWindowWidth);
    return () => window.removeEventListener('resize', setWindowWidth);
  }, []);

  const commonHeaderItems: MenuProps['items'] = [];

  const adminHeaderItems: MenuProps['items'] =
    authenticated && user?.type === 'ADMIN'
      ? [
          {
            key: 'registration',
            label: 'Admin - Registrations',
            onClick: () => navigate('/admin/registration'),
          },
          {
            key: 'users',
            label: 'Admin - Users',
            onClick: () => navigate('/admin/users'),
          },
          {
            key: 'gallery',
            label: 'Admin - Gallery',
            onClick: () => navigate('/admin/gallery'),
          },
          {
            key: 'events',
            label: 'Admin - Events',
            onClick: () => navigate('/admin/events'),
          },
          {
            key: 'notices',
            label: 'Admin - Notices',
            onClick: () => navigate('/admin/notices'),
          },
          {
            key: 'test-centres',
            label: 'Admin - Test Centers',
            onClick: () => navigate('/admin/test-centers'),
          },
          {
            key: 'current-affairs',
            label: 'Admin - Current Affairs',
            onClick: () => navigate('/admin/current-affairs'),
          },
          {
            key: 'site-settings',
            label: 'Admin - Site Settings',
            onClick: () => navigate('/admin/site-settings'),
          },
        ]
      : [];

  const userHeaderItems: MenuProps['items'] =
    authenticated && user?.type === 'USER'
      ? [
          // {
          //   key: 'register',
          //   label: 'Register for Exam',
          //   onClick: () => navigate('/exam/register'),
          // },
          {
            key: 'admitCard',
            label: 'Get Admit Card',
            onClick: () => window.open(baseURL + '/admit-card/' + user.email),
          },
          {
            key: 'profile',
            label: 'Profile',
            onClick: () => navigate('/user/profile'),
          },
        ]
      : [];

  const rightHeaderItems: MenuProps['items'] = authenticated
    ? [
        ...commonHeaderItems,
        {
          key: 'changePassword',
          label: 'Change Password',
          onClick: () => navigate('/user/change-password'),
        },
        ...adminHeaderItems,
        ...userHeaderItems,
        {
          key: 'logout',
          label: 'Logout',
          onClick: logout,
        },
      ]
    : [
        ...commonHeaderItems,
        {
          key: 'login',
          label: 'Login',
          onClick: () => navigate('/user/auth'),
        },
      ];

  return (
    <ConfigProvider
      locale={enUs}
      theme={{
        token: {
          fontFamily: 'Poppins, sans-serif',
          colorPrimary: constants.appThemeColor,
          colorBgTextHover: constants.appThemeColor,
          colorFill: constants.appThemeColor,
        },
      }}
    >
      <Layout>
        <Layout.Header
          style={{ backgroundColor: colorBgContainer }}
          className='px-4'
        >
          <div className='flex gap-3 items-center justify-between'>
            <div
              className='flex items-center justify-between gap-4 cursor-pointer'
              onClick={() => navigate('/')}
            >
              <div>
                <Image
                  preview={false}
                  src='/logo.png'
                  height={48}
                  width={48}
                  style={{ padding: 0, margin: 0 }}
                />
              </div>
              <Typography.Title level={2} style={{ padding: 0, margin: 0 }}>
                {ui.isMobile
                  ? 'Shibli RCA'
                  : 'Shibli Residential Coaching Academy'}
              </Typography.Title>
            </div>

            <Dropdown
              arrow
              menu={{ items: rightHeaderItems, className: 'w-[200px]' }}
            >
              <Button icon={<UserOutlined />}>
                {ui.isMobile ? '' : 'Options'}
              </Button>
            </Dropdown>
          </div>
        </Layout.Header>

        <Layout.Content style={{ minHeight: 'calc(100vh - 150px)' }}>
          {ui.loading ? <Loading loading={ui.loading} /> : children}
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>
          RCA - {new Date().getFullYear()} &copy; All rights reserved
        </Layout.Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default AppContainer;
