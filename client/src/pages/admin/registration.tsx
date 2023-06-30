import { Button, Form, Image, Modal, Select, TableProps, message } from 'antd';
import React, { useContext, useState } from 'react';
import { IRegistration } from '../../types/models';
import AdminContainer from '../../components/adminContainer';
import CustomTable from '../../components/table';
import RegistrationInfo from '../../components/registrationInfo';
import instance from '../../hooks/api';
import { useQuery } from '@tanstack/react-query';
import useSession from '../../hooks/session';
import { uiContext } from '../../hooks/ui';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

interface IProps {}

const Registration: React.FC<IProps> = () => {
  const modalDefault = { open: false, data: null };
  const [modal, setModal] = useState<{ open: boolean; data: any }>(
    modalDefault
  );
  const { getToken } = useSession();
  const [{ isMobile }] = useContext(uiContext);
  const [form] = Form.useForm();

  const { data: testCenters } = useQuery({
    queryKey: ['Test Centres'],
    queryFn: () => {
      return instance.get('/test-centers', {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    },
  });

  const columns: TableProps<IRegistration>['columns'] = [
    {
      title: 'Photo',
      dataIndex: 'photograph',
      key: 'photograph',
      width: 80,
      render: (t) => <Image src={t} alt='photograph' width={50} />,
    },
    {
      title: 'Sig.',
      dataIndex: 'signature',
      key: 'signature',
      width: 80,
      render: (t) => <Image src={t} alt='photograph' width={50} />,
    },
    {
      title: 'Name',
      dataIndex: 'user',
      key: 'name',
      width: 150,
      render: (user) => user?.name,
    },
    {
      title: 'Roll No.',
      dataIndex: 'rollNumber',
      key: 'rollNumber',
      width: 80,
    },
    {
      title: 'Email',
      dataIndex: 'user',
      key: 'email',
      width: 220,
      render: (user) => user?.email,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (t) => (
        <>{t === 'M' ? 'Male' : t === 'F' ? 'Female' : 'Others'}</>
      ),
      width: 70,
    },
    {
      title: 'Txn SS',
      dataIndex: 'transaction',
      key: 'transaction',
      width: 80,
      render: (t) => <Image src={t} alt='transaction' width={50} />,
    },
    {
      title: 'Txn ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
      width: 130,
    },
    { title: 'Category', dataIndex: 'category', key: 'category', width: 120 },
    {
      title: 'Mobile No.',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
      width: 100,
    },
    {
      title: 'Test Center',
      dataIndex: 'testCenter',
      key: 'testCenter',
      width: 100,
      render: (t) => t?.address,
    },
    {
      title: 'Language',
      dataIndex: 'languageOfExam',
      key: 'languageOfExam',
      width: 120,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 100,
      render: (date) => (
        <>
          {dayjs(date).format('DD-MM-YYYY')}
          <br />
          {dayjs(date).format('HH:mm A')}
        </>
      ),
    },
  ];

  const handleChangeTestCenter = (record: IRegistration) => {
    setModal({ open: true, data: record });
    console.log(record);
  };

  const handleDeleteRegistration = (record: IRegistration) => {
    try {
      Modal.confirm({
        title: 'Are you sure you want to delete this registration?',
        onCancel: () => {},
        onOk: async () => {
          await instance.delete(`/registrations`, {
            data: { _id: record._id },
            headers: { Authorization: `Bearer ${getToken()}` },
          });
          message.success('Registration Deleted');
        },
        okText: 'Delete',
        cancelText: 'Cancel',
        okButtonProps: { danger: true },
      });
    } catch (err: any) {
      console.log(err);
      message.error("Couldn't delete registration");
    }
  };

  const handleSubmitTestCenter = (values: any) => {
    if (!modal.data) {
      console.log('No data');
      return;
    }

    if (!values.testCenter) {
      message.error('Please select a test center');
      return;
    }

    try {
      instance.patch(`/registrations/test-center`, {
        _id: modal.data._id,
        testCenter: values.testCenter,
      });
      message.success('Test Center Changed');
      form.resetFields();
    } catch (err) {
    } finally {
      setModal(modalDefault);
    }
  };

  const infoTransformer = (data: IRegistration) => {
    return <RegistrationInfo data={data} />;
  };

  return (
    <AdminContainer>
      <Modal
        open={modal.open}
        bodyStyle={{ paddingTop: 30 }}
        onCancel={() => setModal(modalDefault)}
        onOk={form.submit}
      >
        <Form form={form} layout='vertical' onFinish={handleSubmitTestCenter}>
          <Form.Item
            name='testCenter'
            label='Choose New Test Center'
            rules={[{ required: true, message: 'Test Center is required' }]}
          >
            <Select
              size={isMobile ? 'middle' : 'large'}
              placeholder='Select Test Center'
              options={testCenters?.data.map((t: any) => ({
                label: t.address,
                value: t._id,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>

      <div className='m-4 bg-white rounded-md shadow-md'>
        <CustomTable<IRegistration>
          tableTitle='Registrations'
          moreInfoTransformer={infoTransformer}
          endpoint={{
            get: '/registrations',
            post: '/registrations',
          }}
          tableColumns={columns}
          scroll={{ x: 1500 }}
          AddFormInner={<></>}
          moreActions={(record) => (
            <div className='flex gap-2'>
              <Button
                onClick={() => handleChangeTestCenter(record)}
                icon={<EditOutlined />}
              />

              <Button
                type='primary'
                danger
                onClick={() => handleDeleteRegistration(record)}
                icon={<DeleteOutlined />}
              />
            </div>
          )}
        />
      </div>
    </AdminContainer>
  );
};

export default Registration;
