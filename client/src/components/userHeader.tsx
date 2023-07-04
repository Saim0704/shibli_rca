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
    { to: '/achievements', label: 'Achievements' },
    { to: '/testimonials', label: 'Testimonials' },
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
      {children}
    </Fragment>
  );
};

export default UserHeader;
