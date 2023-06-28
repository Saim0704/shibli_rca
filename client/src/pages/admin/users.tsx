import dayjs from 'dayjs';
import React from 'react';
import { IUser } from '../../types/models';
import { TableProps } from 'antd';
import AdminContainer from '../../components/adminContainer';
import CustomTable from '../../components/table';

interface IProps {}

const AllUsers: React.FC<IProps> = () => {
  const columns: TableProps<IUser>['columns'] = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Mobile', dataIndex: 'mobile' },
    { title: 'User Type', dataIndex: 'type' },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (date) => dayjs(date).format('DD-MM-YYYY HH:mm A'),
    },
  ];

  return (
    <AdminContainer>
      <div className='m-4 bg-white rounded-md shadow-md'>
        <CustomTable<IUser>
          tableTitle='All Users'
          endpoint={{
            get: '/users',
          }}
          AddFormInner={null}
          scroll={{ x: 700 }}
          tableColumns={columns}
          pagination={{
            pageSize: 100,
          }}
        />
      </div>
    </AdminContainer>
  );
};

export default AllUsers;
