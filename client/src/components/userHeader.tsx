import constants from '../utils/constants';
import { Layout } from 'antd';
import React, { Fragment, PropsWithChildren, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useSession from '../hooks/session';
import { uiContext } from '../hooks/ui';

interface IProps extends PropsWithChildren {}

const UserHeader: React.FC<IProps> = ({ children }) => {
  const [{ isMobile }] = useContext(uiContext);
  const navigate = useNavigate();
  const {
    me: { authenticated, user },
  } = useSession();

  const headerItems = [
    { to: '/', label: 'Home' },
    { to: '/contact-us', label: 'Contacts' },
    { to: '/about-us', label: 'About' },
    // { to: '/achievements', label: 'Achievements' },
    // { to: '/testimonials', label: 'Testimonials' },
  ];

  return (
    <Fragment>
      {(!authenticated || (authenticated && user?.type !== 'ADMIN')) && (
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
                <div
                  key={index}
                  style={{
                    fontSize: isMobile ? 15 : 20,
                    fontWeight: 'bold',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate(item.to)}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        </Layout.Header>
      )}

      <div className='marquee pt-3 font-md'>
        <span className='text-white' style={{ fontSize: isMobile ? 14 : 16 }}>
          {/* Applications are closed for Civil Services Coaching Programme 2023-24 */}
          {/* <b
            className='text-red-500 hover:text-red-800 cursor-pointer mx-4'
            onClick={() => navigate('/exam/register')}
          >
            Register Here
          </b> */}
          <a
            href='https://drive.google.com/file/d/1gqgTEwDjXUCm5YCx3L4iRBJONP8VK89Z/view'
            target='_blank'
            className='text-red-500 hover:text-red-800 cursor-pointer mx-4'
          >
            <b>Download Notification</b>
          </a>
          &nbsp; -
          <a
            href='https://drive.google.com/file/d/1EnZIqTirZi8zrits-tYAX-prCk3g4-eJ/view'
            target='_blank'
            className='text-red-500 hover:text-red-800 cursor-pointer mx-4'
          >
            <b>Shibli RCA Entrance Exam 2023 Answer Key</b>
          </a>
        </span>
      </div>
      {children}
    </Fragment>
  );
};

export default UserHeader;
