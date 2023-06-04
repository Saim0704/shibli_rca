import { TableProps } from 'antd';
import React from 'react';
import { IRegistration } from '../../types/models';
import AdminContainer from '../../components/adminContainer';
import CustomTable from '../../components/table';
interface IProps {}

const Registration: React.FC<IProps> = () => {
  const columns: TableProps<IRegistration>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'user',
      key: 'name',
      render: (user) => user.name,
    },
    {
      title: 'Email',
      dataIndex: 'user',
      key: 'email',
      render: (user) => user.email,
    },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    { title: 'Roll Number', dataIndex: 'rollNumber', key: 'rollNumber' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Mobile Number', dataIndex: 'mobileNumber', key: 'mobileNumber' },
  ];

  return (
    <AdminContainer>
      <div className='m-4 bg-white rounded-md shadow-md'>
        <CustomTable<IRegistration>
          tableTitle='Registrations'
          endpoint={{
            get: '/registrations',
            post: '/registrations',
            put: '/registrations',
            delete: '/registrations',
          }}
          tableColumns={columns}
          AddFormInner={<></>}
        />
      </div>
    </AdminContainer>
  );
};

export default Registration;
