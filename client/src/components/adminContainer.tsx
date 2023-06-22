import { Menu, MenuProps } from 'antd';
import React, { Fragment, PropsWithChildren } from 'react';
import useSession from '../hooks/session';
import { useLocation, useNavigate } from 'react-router-dom';

interface IProps extends PropsWithChildren {}

const AdminContainer: React.FC<IProps> = ({ children }) => {
  const {
    me: { authenticated, user },
  } = useSession();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (!authenticated || user?.type !== 'ADMIN') return null;

  const subHeaderItems: MenuProps['items'] = [
    {
      key: 'registration',
      label: 'Registrations',
      onClick: () => navigate('/admin/registration'),
    },
    {
      key: 'users',
      label: 'Users',
      onClick: () => navigate('/admin/users'),
    },
    {
      key: 'gallery',
      label: 'Gallery',
      onClick: () => navigate('/admin/gallery'),
    },
    {
      key: 'events',
      label: 'Events',
      onClick: () => navigate('/admin/events'),
    },
    {
      key: 'notices',
      label: 'Notices',
      onClick: () => navigate('/admin/notices'),
    },
    {
      key: 'test-centers',
      label: 'Test Centers',
      onClick: () => navigate('/admin/test-centers'),
    },
    {
      key: 'current-affairs',
      label: 'Current Affairs',
      onClick: () => navigate('/admin/current-affairs'),
    },
    {
      key: 'site-settings',
      label: 'Site Settings',
      onClick: () => navigate('/admin/site-settings'),
    },
  ];

  return (
    <Fragment>
      <Menu
        theme='light'
        mode='horizontal'
        items={subHeaderItems}
        activeKey={pathname.split('/')[2]}
        style={{ justifyContent: 'center' }}
      />

      {children}
    </Fragment>
  );
};

export default AdminContainer;
