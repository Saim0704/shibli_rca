import dayjs from 'dayjs';
import { TableProps } from 'antd';
import { useState } from 'react';
import { IEvent } from '../../types/models';
import AdminContainer from '../../components/adminContainer';
import CustomTable from '../../components/table';
import EventForm from '../../components/EventForm';

const Events = () => {
  const [quillValue, setQuillValue] = useState('');

  const columns: TableProps<IEvent>['columns'] = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Location', dataIndex: 'location' },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      width: 170,
      render: (value) => dayjs(value).format('DD-MM-YYYY HH:mm A'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      width: 170,
      render: (value) => dayjs(value).format('DD-MM-YYYY HH:mm A'),
    },
    { title: 'Contact', dataIndex: 'contact', width: 120 },
  ];

  return (
    <AdminContainer>
      <div className='m-4 bg-white rounded-md shadow-md'>
        <CustomTable<IEvent>
          tableTitle='Events'
          endpoint={{
            get: '/events',
            post: '/events',
            put: '/events',
            delete: '/events',
          }}
          tableColumns={columns}
          addButtonLabel='Add Event'
          AddFormInner={
            <EventForm quillValue={quillValue} setValue={setQuillValue} />
          }
        />
      </div>
    </AdminContainer>
  );
};

export default Events;
