import { Col, Row } from 'antd';
// import {
// useEffect,
// useState,
// } from 'react';
// import instance from '../hooks/api';

const colors = {
  mission: '#737495',
  vision: '#68a8ad',
  values: '#6c8672',
  philosophy: '#f17d80',
};

const namesArr = Object.keys(colors);

interface IPrinciple {
  name: string;
  value: string;
  color: string;
}

const config = [
  {
    _id: '6469a456d47171004bafcdaa',
    name: 'shortSiteName',
    value: 'RCA',
  },
  {
    _id: '6469a456d47171004bafcdb0',
    name: 'timeOfExam',
    value: '10:00 AM - 13:00 AM',
  },
  {
    _id: '6469a456d47171004bafcdae',
    name: 'philosophy',
    value:
      'Education is the best gift that parents can give.We believe in educating a child during his/her various stages of development while being aware of its motivations and changing interests.',
  },
  {
    _id: '6469a456d47171004bafcdad',
    name: 'values',
    value:
      'In order to fulfill the purpose of our organization we promote and practice the following values: Respect, Integrity, Diligence and Motivation.',
  },
  {
    _id: '6469a456d47171004bafcdaf',
    name: 'dateOfExam',
    value: '25-06-2023',
  },
  {
    _id: '6469a456d47171004bafcda9',
    name: 'siteName',
    value: 'Shibli Residential Coaching Academy',
  },
  {
    _id: '6469a456d47171004bafcdab',
    name: 'mission',
    value:
      'To identify and guide students who can contribute towards nation building through civil services and help them inculcate Indian values and ethos.',
  },
  {
    _id: '6469a456d47171004bafcdac',
    name: 'vision',
    value:
      'To make sure that innovative and imaginative persons including those from disadvantaged segments of Indian society should join the civil services.',
  },
].reduce((acc: Array<IPrinciple>, curr: any) => {
  if (namesArr.includes(curr.name)) {
    return [
      ...acc,
      {
        name: curr.name,
        value: curr.value,
        // @ts-ignore
        color: colors[curr.name],
      },
    ];
  }
  return acc;
}, []);

const Principles = () => {
  // const [principles, setPrinciples] = useState<Array<IPrinciple>>(config);

  // useEffect(() => {
  //   const getConfig = async () => {
  //     const { data } = await instance.get('/config');
  //     const newConfigs = data?.data.reduce(
  //       (acc: Array<IPrinciple>, curr: any) => {
  //         if (namesArr.includes(curr.name)) {
  //           return [
  //             ...acc,
  //             {
  //               name: curr.name,
  //               value: curr.value,
  //               // @ts-ignore
  //               color: colors[curr.name],
  //             },
  //           ];
  //         }
  //         return acc;
  //       },
  //       []
  //     );
  //     setPrinciples(newConfigs);
  //   };
  //   getConfig().then().catch(console.log);
  // }, []);

  return (
    <Row
      justify='center'
      className='lg:py-12 md:px-8 xl:px-32 md:relative md:-top-[180px] -mb-40 md:z-10 px-4'
    >
      {config.map((item) => {
        return (
          <Col
            key={item.name}
            sm={12}
            lg={6}
            style={{
              backgroundColor: item.color,
              display: 'flex',
              flexDirection: 'column',
            }}
            className='p-12 py-16 text-center text-white items-center justify-center'
          >
            <h1 className='font-bold'>{item.name}</h1>
            <p className='text-base'>{item.value}</p>
          </Col>
        );
      })}
    </Row>
  );
};

export default Principles;
