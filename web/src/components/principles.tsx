import { Col, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

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

const Principles = () => {
  const [principles, setPrinciples] = useState<Array<IPrinciple>>([]);

  useEffect(() => {
    const getConfig = async () => {
      const { data } = await axios.get('/api/admin/config');
      const newConfigs = data?.data.reduce(
        (acc: Array<IPrinciple>, curr: any) => {
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
        },
        []
      );
      setPrinciples(newConfigs);
    };
    getConfig().then().catch(console.log);
  }, []);

  return (
    <Row
      justify='center'
      className='lg:py-12 md:px-8 xl:px-32 md:relative md:-top-[100px] -mb-20 md:z-10 px-4'
    >
      {principles.map((item, index) => {
        return (
          <Col
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
