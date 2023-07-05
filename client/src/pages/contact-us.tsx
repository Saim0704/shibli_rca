import { Typography } from 'antd';
import React from 'react';
import UserHeader from '../components/userHeader';
import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons';

interface IProps {}

const ContactUs: React.FC<IProps> = () => {
  return (
    <>
      <UserHeader>
        <div className='lg:py-12 md:px-8 xl:px-32 md:relative md:z-10 px-4 text-xl'>
          <Typography.Title level={2}>Emails</Typography.Title>
          <p>shiblirca@gmail.com</p>
          <p> admissionsatshiblirca@gmail.com</p>

          <br />

          <Typography.Title level={2}>Contacts</Typography.Title>
          <p>8655835557</p>

          <br />

          <Typography.Title level={2}>Lets connect</Typography.Title>

          <div className='flex items-center gap-3'>
            <div
              className='flex items-center gap-2 border-rose-400 border-solid justify-start py-1 px-2 rounded-md max-w-fit cursor-pointer'
              onClick={() =>
                window.open(
                  'https://instagram.com/shibli.rca?igshid=MzRlODBiNWFlZA=='
                )
              }
            >
              <InstagramOutlined style={{ fontSize: 36, color: '#E1306C' }} />
              <Typography.Text>Instagram</Typography.Text>
            </div>

            <div
              className='flex items-center gap-2 border-blue-400 border-solid justify-start py-1 px-2 rounded-md max-w-fit cursor-pointer'
              onClick={() => window.open('https://www.facebook.com/ShibliRCA/')}
            >
              <FacebookOutlined style={{ fontSize: 36 }} />
              <Typography.Text>Facebook</Typography.Text>
            </div>
          </div>
        </div>
      </UserHeader>
    </>
  );
};

export default ContactUs;
