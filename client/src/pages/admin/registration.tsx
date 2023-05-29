import axios from 'axios';
import { TableProps } from 'antd';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { IRegistration } from '../../types/models';
import { registrationAtom } from '../../utils/atoms';
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

  const [registrations, setRegistrations] = useRecoilState(registrationAtom);

  useEffect(() => {
    const getData = async () => {
      if (registrations.length > 0) return;
      const { data } = await axios.get('/api/admin/registration');
      setRegistrations(data);
    };
    getData().then().catch(console.log);
  }, []);

  return (
    <AdminContainer>
      <div className='m-4 bg-white rounded-md shadow-md'>
        <CustomTable<IRegistration>
          tableTitle='Registrations'
          endpoint={{
            get: '/api/admin/registration',
            post: '/api/admin/registration',
            put: '/api/admin/registration',
            delete: '/api/admin/registration',
          }}
          tableColumns={columns}
          recoilAtom={registrationAtom}
          AddFormInner={<></>}
        />
      </div>
    </AdminContainer>
  );
};

export default Registration;