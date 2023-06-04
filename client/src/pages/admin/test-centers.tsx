import React from 'react';
import { Form, Input, TableProps } from 'antd';
import { ITestCenter } from '../../types/models';
import AdminContainer from '../../components/adminContainer';
import CustomTable from '../../components/table';
interface IProps {}

const TestCentres: React.FC<IProps> = () => {
  const columns: TableProps<ITestCenter>['columns'] = [
    { title: 'Code Name', dataIndex: 'codeName', width: 120 },
    { title: 'Address', dataIndex: 'address' },
    { title: 'Mobile Number', dataIndex: 'mobileNumber' },
    { title: 'Email', dataIndex: 'email' },
  ];

  return (
    <AdminContainer>
      <div className='m-4 bg-white rounded-md shadow-md'>
        <CustomTable<ITestCenter>
          tableTitle='Test Centres'
          endpoint={{
            get: '/test-centers',
            post: '/test-centers',
            put: '/test-centers',
          }}
          scroll={{ x: 800 }}
          tableColumns={columns}
          addButtonLabel='Add Test Center'
          AddFormInner={
            <>
              <Form.Item
                label='Code Name'
                name='codeName'
                rules={[{ required: true, message: 'Please enter code name' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Address'
                name='address'
                rules={[{ required: true, message: 'Please enter address' }]}
              >
                <Input.TextArea />
              </Form.Item>

              <Form.Item label='Mobile Number' name='mobileNumber'>
                <Input />
              </Form.Item>

              <Form.Item label='Email' name='email'>
                <Input />
              </Form.Item>
            </>
          }
        />
      </div>
    </AdminContainer>
  );
};

export default TestCentres;
