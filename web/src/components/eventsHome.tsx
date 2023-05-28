import { Card, Descriptions, Space } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { IEvent } from '../@types/models';

interface IProps {
  event: IEvent;
}

const EventsHome: React.FC<IProps> = ({ event }) => {
  return (
    <Space
      direction='vertical'
      size={16}
      className='bg-white rounded-md shadow-md flex-grow w-full md:w-[500px]'
    >
      <Card title={event.name} className='w-full'>
        <Descriptions colon={false} column={{ xs: 1, sm: 1, md: 1 }}>
          <Descriptions.Item label='Details'>
            {event.description}
          </Descriptions.Item>
          <Descriptions.Item label='Location'>
            {event.location}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions
          colon={false}
          layout='vertical'
          column={{ xs: 2, sm: 2, md: 2 }}
        >
          <Descriptions.Item label='Start Time'>
            {dayjs(event.startDate).format('DD-MM-YYYY HH:mm A')}
          </Descriptions.Item>
          <Descriptions.Item label='End Time'>
            {dayjs(event.endDate).format('DD-MM-YYYY HH:mm A')}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Space>
  );
};

export default EventsHome;
