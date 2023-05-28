import Link from 'next/link';
import { constants } from '../utils/constants';
import { Layout} from 'antd';
import { useSession } from 'next-auth/react';
import React, { Fragment, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
// import { uiAtom } from 'rca/utils/atoms';

interface IProps extends PropsWithChildren {}

const UserHeader: React.FC<IProps> = ({ children }) => {
  const session = useSession();
  const router = useRouter();
  const { isMobile } = useRecoilValue(uiAtom);

  const headerItems = [
    { to: '/', label: 'Home' },
    { to: '/contact-us', label: 'Contacts' },
    { to: '/about-us', label: 'About' },
    { to: '/achievements', label: 'Achievements' },
    { to: '/testimonials', label: 'Testimonials' },
  ];

  return (
    <Fragment>
      {/* @ts-ignore */}
      {(!session || (session && session.user?.type !== 'ADMIN')) && (
        <Layout.Header
          style={{ backgroundColor: constants.appThemeColor, height: 40 }}
        >
          <div
            className={`flex items-center justify-center h-full ${
              isMobile ? 'gap-2' : 'gap-4'
            }`}
          >
            {headerItems.map((item, index) => {
              return (
                <Link
                  href={item.to}
                  key={index}
                  style={{
                    fontSize: isMobile ? 15 : 20,
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </Layout.Header>
      )}

      <div className='marquee pt-3 font-md'>
        <span className='text-white' style={{ fontSize: isMobile ? 14 : 16 }}>
          Applications are invited for Civil Services Coaching Programme 2023-24
          <b
            className='text-red-500 hover:text-red-800 cursor-pointer mx-4'
            onClick={() => router.push('/exam/register')}
          >
            Register Here
          </b>
          -
          <a
            href='https://drive.google.com/file/d/1_dxv_UHzRWzkncLLswwPStIjMAnWdSLv/view'
            target='_blank'
            className='text-red-500 hover:text-red-800 cursor-pointer mx-4'
          >
            <b>Download Notification</b>
          </a>
        </span>
      </div>
      {children}
    </Fragment>
  );
};

export default UserHeader;
