import { Menu, MenuProps } from 'antd';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {}

const AdminContainer: React.FC<IProps> = ({ children }) => {
  const session = useSession();
  const router = useRouter();

  if (
    session.status !== 'authenticated' ||
    // @ts-ignore
    session.data.user?.type !== 'ADMIN'
  ) {
    return null;
  }

  const subHeaderItems: MenuProps['items'] = [
    {
      key: 'registration',
      label: 'Registrations',
      onClick: () => router.push('/admin/registration'),
    },
    {
      key: 'gallery',
      label: 'Gallery',
      onClick: () => router.push('/admin/gallery'),
    },
    {
      key: 'events',
      label: 'Events',
      onClick: () => router.push('/admin/events'),
    },
    {
      key: 'notices',
      label: 'Notices',
      onClick: () => router.push('/admin/notices'),
    },
    {
      key: 'test-centers',
      label: 'Test Centers',
      onClick: () => router.push('/admin/test-centers'),
    },
    {
      key: 'current-affairs',
      label: 'Current Affairs',
      onClick: () => router.push('/admin/current-affairs'),
    },
    {
      key: 'site-settings',
      label: 'Site Settings',
      onClick: () => router.push('/admin/site-settings'),
    },
  ];

  return (
    <>
      <Menu
        theme='light'
        mode='horizontal'
        items={subHeaderItems}
        activeKey={router.pathname.split('/')[2]}
        style={{ justifyContent: 'center' }}
      />

      {children}
    </>
  );
};

export default AdminContainer;
