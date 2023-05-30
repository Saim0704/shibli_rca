import { TableProps } from 'antd';
import React, { useState } from 'react';
import { INotice } from '../../types/models';
import AdminContainer from '../../components/adminContainer';
import CustomTable from '../../components/table';
import { noticeAtom } from '../../utils/atoms';
import NoticeForm from '../../components/NoticeForm';

interface IProps {}

const Notices: React.FC<IProps> = () => {
  const [quillValue, setQuillValue] = useState('');

  const columns: TableProps<INotice>['columns'] = [
    { title: 'Title', dataIndex: 'title' },
    { title: 'Issued By', dataIndex: 'issuedBy' },
  ];

  return (
    <AdminContainer>
      <div className='m-4 bg-white rounded-md shadow-md'>
        <CustomTable<INotice>
          tableTitle='Notices'
          endpoint={{
            get: '/notices',
            post: '/notices',
            put: '/notices',
            delete: '/notices',
          }}
          scroll={{ x: 800 }}
          tableColumns={columns}
          addButtonLabel='Add Notice'
          recoilAtom={noticeAtom}
          AddFormInner={
            <NoticeForm quillValue={quillValue} setValue={setQuillValue} />
          }
        />
      </div>
    </AdminContainer>
  );
};

export default Notices;
