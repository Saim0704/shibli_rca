import { Typography } from 'antd';
import React from 'react';
import UserHeader from '../components/userHeader';

interface IProps {}

const AboutUs: React.FC<IProps> = () => {
  return (
    <>
      <UserHeader>
        <div className='lg:py-12 md:px-8 xl:px-32 md:relative md:z-10 px-4 text-xl'>
          <Typography.Title level={2}>Overview</Typography.Title>
          <p>
            The Shibli Residential Coaching Academy is a community led
            initiative under the overall supervision of Azamgarh foundation. We
            at Shibli RCA, aims provide free residential coaching academy for
            the civil services aspirants belonging to the economically weaker
            sections among Muslim minority community.
          </p>

          <br />

          <Typography.Title level={2}>Objectives</Typography.Title>
          <p>
            The academy aims to bring awareness and promote a culture of civil
            services operations in the youth in Azamgarh and the adjoining
            areas. This will uplift the community and bridge the gap between the
            community and the mainstream population of the country. This will
            promote the idea of inclusiveness and will help in the overall
            development of the country.
          </p>

          <br />

          <Typography.Title level={2}>Facilities</Typography.Title>
          <p>
            We provide coaching, guidance and mentoring for all aspects in
            preparation of Civil Services examinations be it Preliminary, Mains
            as well as Interview for UPSC and State PCS.
          </p>

          <p>
            We aim to conduct test series on the pattern of UPSC on daily,
            weekly and monthly basis.
          </p>

          <p>
            We also have fully furnished 24 x 7 Air-Conditioned Library led by
            the generous efforts from the community.
          </p>
        </div>
      </UserHeader>
    </>
  );
};

export default AboutUs;
