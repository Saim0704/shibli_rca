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
          scroll={{ x: 800 }}
          tableColumns={columns}
          pagination={{
            pageSize: 80,
          }}
        />
      </div>
    </AdminContainer>
  );
};

export default AllUsers;
