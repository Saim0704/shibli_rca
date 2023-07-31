import React, { useContext } from 'react';
import UserHeader from '../components/userHeader';
import { Card, Typography } from 'antd';
import { uiContext } from '../hooks/ui';

interface IProps {}

const DescriptionItem: React.FC<{ title: string; content: string }> = ({
  title,
  content,
}) => (
  <div className='flex gap-4'>
    <Typography.Text className='text-lg'>{title}</Typography.Text>
    <Typography.Text className='font-bold text-lg'>
      : &nbsp; {content}
    </Typography.Text>
  </div>
);

const Donations: React.FC<IProps> = () => {
  const [{ isMobile }] = useContext(uiContext);

  return (
    <>
      <UserHeader>
        <div className='lg:py-12 md:px-8 xl:px-32 md:relative md:z-10 px-4 text-xl'>
          <Typography.Title className='text-center' level={2}>
            APPEAL
          </Typography.Title>

          <p>
            Shibli Residential coaching academy is a unique initiative supported
            by community leaders, social thinkers, and well wishers. Through
            this, we intend to engage the people across India and worldwide
          </p>

          <br />

          <p>
            The academy has received a huge response from hte people across the
            country. It is an initiative to nurture and groom our youth to
            prepare them for bigger platform
          </p>

          <br />

          <p>
            The academy is being established in a professional and time-bound
            manner. Therefore we exhort all our well wishers to come forward and
            contribute generously to this noble venture. We are confident that
            this academy shall be a harbinger of change for the entire region.
            Your contributions will be acknowledged and we will be highly
            obliged to you
          </p>

          <br />
          <br />
          <br />

          <div className='flex flex-col gap-10 md:flex-row-reverse md:justify-between'>
            <div className='flex-grow flex items-center justify-center flex-col'>
              <Typography.Title className='text-center mb-0 mt-0' level={3}>
                DR. MOHAMMED DANISH
              </Typography.Title>
              <Typography.Text className='text-center text-lg'>
                M.B.B.S., M.S., M.Ch.
              </Typography.Text>
              <Typography.Text className='text-center text-lg'>
                Spine and Neuro Surgeon
              </Typography.Text>
            </div>

            <div>
              <Typography.Title className='text-center mb-0 mt-0' level={3}>
                BANK DETAILS
              </Typography.Title>

              <Card bodyStyle={{ padding: isMobile ? 12 : 16 }}>
                <DescriptionItem title='Name' content='AZAMGARH FOUNDATION' />
                <DescriptionItem title='A/C No.' content='051605005013' />
                <DescriptionItem title='IFSC Code' content='ICIC0000516' />
                <DescriptionItem
                  title='Branch'
                  content='Civil Lines, Azamgarh'
                />
                <DescriptionItem title='Bank' content='ICICI Bank' />
              </Card>
              <br />

              <Card bodyStyle={{ padding: isMobile ? 12 : 16 }}>
                <DescriptionItem title='Co-Ordinator' content='Javed Saghir' />
                <DescriptionItem title='Contact No.' content='+91-7222009996' />
                <DescriptionItem
                  title='Email Add.'
                  content='shiblirca@gmail.com'
                />
              </Card>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center bg-white p-2'>
          <Typography.Text className='text-lg text-center' type='danger'>
            Donations are entitled to claim rebate from Income Tax as per
            Sections 800 & 12A of IT Act 1961
          </Typography.Text>
        </div>
      </UserHeader>
    </>
  );
};

export default Donations;
